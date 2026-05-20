import { getWeekday, isTodoDueOnDate, isTodoOccurrenceCompleted } from '$lib/todoSchedule.js';

export const DAILY_HOUR_LIMIT = 16;
export const WORK_DAILY_HOUR_LIMIT = 8;
export const WORK_CATEGORY = 'Arbeit';

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

export function validateScheduleCapacity(todos, candidates) {
	const scheduledCandidates = candidates.filter(
		(todo) => todo.status !== 'Completed' && todo.scheduledDate
	);

	for (const candidate of scheduledCandidates) {
		if (candidate.category === WORK_CATEGORY && isWeekend(candidate.scheduledDate)) {
			return {
				message: 'Aufgaben der Kategorie Arbeit duerfen nicht auf Samstag oder Sonntag terminiert werden.'
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
		const workHours = todosForDate
			.filter((todo) => todo.category === WORK_CATEGORY)
			.reduce((sum, todo) => sum + getEstimatedHours(todo.estimatedDuration), 0);

		if (totalHours > DAILY_HOUR_LIMIT) {
			return {
				message: `Am ${date} sind maximal ${DAILY_HOUR_LIMIT} Stunden geplante Aufgaben erlaubt.`
			};
		}

		if (workHours > WORK_DAILY_HOUR_LIMIT) {
			return {
				message: `Am ${date} sind maximal ${WORK_DAILY_HOUR_LIMIT} Stunden Arbeit erlaubt.`
			};
		}
	}

	return null;
}
