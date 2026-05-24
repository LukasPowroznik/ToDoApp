import { getWeekday, isTodoDueOnDate, isTodoOccurrenceCompleted } from '$lib/todoSchedule.js';

export const DAILY_HOUR_LIMIT = 16;
export const WORK_DAILY_HOUR_LIMIT = 8;
export const WORK_CATEGORY = 'Arbeit';
export const DEFAULT_CATEGORY_HOUR_LIMITS = {
	Privat: DAILY_HOUR_LIMIT,
	Arbeit: WORK_DAILY_HOUR_LIMIT,
	Sport: DAILY_HOUR_LIMIT,
	Sonstiges: DAILY_HOUR_LIMIT
};

export function getEstimatedHours(duration) {
	if (duration === '30 min') return 0.5;
	if (duration === '1 h') return 1;
	if (duration === '2 h') return 2;
	if (duration === '4 h') return 4;
	if (
		duration === 'Ganzt\u00e4gig' ||
		duration === 'Ganzt\u00c3\u00a4gig' ||
		duration === 'Ganzt\u00c3\u0192\u00c2\u00a4gig'
	) {
		return 8;
	}

	return 0;
}

export function isWeekend(date) {
	const weekday = getWeekday(date);

	return weekday === 0 || weekday === 6;
}

function formatDate(date) {
	const [year, month, day] = date.split('-');

	return `${day}.${month}.${year}`;
}

function getCapacitySettings(settings = {}) {
	return {
		dailyHourLimit: Number(settings.dailyHourLimit) || DAILY_HOUR_LIMIT,
		categoryHourLimits: {
			...DEFAULT_CATEGORY_HOUR_LIMITS,
			...(settings.categoryHourLimits ?? {})
		}
	};
}

export function validateScheduleCapacity(todos, candidates, settings) {
	const capacitySettings = getCapacitySettings(settings);
	const scheduledCandidates = candidates.filter(
		(todo) => todo.status !== 'Completed' && todo.scheduledDate
	);

	for (const candidate of scheduledCandidates) {
		if (candidate.category === WORK_CATEGORY && isWeekend(candidate.scheduledDate)) {
			return {
				message: 'To-Dos der Kategorie Arbeit dürfen nicht auf Samstag oder Sonntag terminiert werden.'
			};
		}
	}

	const dates = [...new Set(scheduledCandidates.map((todo) => todo.scheduledDate))];
	const candidateIds = new Set(scheduledCandidates.map((todo) => todo.id).filter(Boolean));

	for (const date of dates) {
		const existingTodos = todos.filter(
			(todo) =>
				!candidateIds.has(todo.id) &&
				todo.status !== 'Completed' &&
				isTodoDueOnDate(todo, date) &&
				!isTodoOccurrenceCompleted(todo, date)
		);
		const todosForDate = [
			...existingTodos,
			...scheduledCandidates.filter((todo) => todo.scheduledDate === date)
		];
		const totalHours = todosForDate.reduce(
			(sum, todo) => sum + getEstimatedHours(todo.estimatedDuration),
			0
		);

		if (totalHours > capacitySettings.dailyHourLimit) {
			return {
				message: `Am ${formatDate(date)} sind maximal ${capacitySettings.dailyHourLimit} Stunden geplante To-Dos erlaubt.`
			};
		}

		for (const [category, limit] of Object.entries(capacitySettings.categoryHourLimits)) {
			const categoryHours = todosForDate
				.filter((todo) => todo.category === category)
				.reduce((sum, todo) => sum + getEstimatedHours(todo.estimatedDuration), 0);

			if (categoryHours > limit) {
				return {
					message: `Am ${formatDate(date)} sind maximal ${limit} Stunden ${category} erlaubt.`
				};
			}
		}
	}

	return null;
}
