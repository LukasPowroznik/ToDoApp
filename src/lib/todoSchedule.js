export function getWeekday(dateString) {
	return new Date(`${dateString}T12:00:00.000Z`).getUTCDay();
}

export function getDayOfMonth(dateString) {
	return Number(dateString.slice(8, 10));
}

export function isTodoDueOnDate(todo, date) {
	if (!todo.deadline || date < todo.deadline) {
		return false;
	}

	if (!todo.recurring || !todo.recurrence?.type) {
		return todo.deadline === date;
	}

	if (todo.recurrence.type === 'daily') {
		return true;
	}

	if (todo.recurrence.type === 'weekly') {
		return getWeekday(date) === getWeekday(todo.deadline);
	}

	if (todo.recurrence.type === 'monthly') {
		return getDayOfMonth(date) === getDayOfMonth(todo.deadline);
	}

	return todo.deadline === date;
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
		isRecurringOccurrence: Boolean(todo.recurring && todo.recurrence && date !== todo.deadline),
		isOccurrenceCompleted: isTodoOccurrenceCompleted(todo, date)
	};
}
