export function getWeekday(dateString) {
	return new Date(`${dateString}T12:00:00.000Z`).getUTCDay();
}

export function getDayOfMonth(dateString) {
	return Number(dateString.slice(8, 10));
}

export function isTodoDueOnDate(todo, date) {
	const startDate = todo.scheduledDate;

	if (!startDate || date < startDate) {
		return false;
	}

	if (!todo.recurring || !todo.recurrence?.type) {
		return startDate === date;
	}

	if (todo.recurrence.type === 'daily') {
		return true;
	}

	if (todo.recurrence.type === 'weekly') {
		return getWeekday(date) === getWeekday(startDate);
	}

	if (todo.recurrence.type === 'monthly') {
		return getDayOfMonth(date) === getDayOfMonth(startDate);
	}

	return startDate === date;
}

export function isTodoOccurrenceCompleted(todo, date) {
	if (todo.recurring) {
		return (todo.completedOccurrences ?? []).includes(date);
	}

	return todo.status === 'Completed';
}

export function buildTodoOccurrence(todo, date) {
	return {
		...todo,
		calendarDate: date,
		isRecurringOccurrence: Boolean(
			todo.recurring && todo.recurrence && date !== todo.scheduledDate
		),
		isOccurrenceCompleted: isTodoOccurrenceCompleted(todo, date)
	};
}
