import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { validateScheduleCapacity } from '$lib/scheduleCapacity.js';
import { getCapacitySettings } from '$lib/server/settings.js';
import {
	completeTodo,
	completeTodoOccurrence,
	deleteTodo,
	listTodos,
	updateTodo
} from '$lib/server/todos.js';

export async function PATCH({ params, request }) {
	const updates = await request.json();

	if (!ObjectId.isValid(params.id)) {
		return json({ message: 'invalid todo id' }, { status: 400 });
	}

	if (!updates.title && updates.status !== 'Completed') {
		return json({ message: 'title is required' }, { status: 400 });
	}

	let todo;

	if (updates.status === 'Completed' && updates.occurrenceDate) {
		todo = await completeTodoOccurrence(params.id, updates.occurrenceDate);
	} else if (updates.status === 'Completed' && !updates.title) {
		todo = await completeTodo(params.id);
	} else {
		const todos = await listTodos();
		const currentTodo = todos.find((item) => item.id === params.id);

		if (!currentTodo) {
			return json({ message: 'todo not found' }, { status: 404 });
		}

		const settings = await getCapacitySettings();
		const scheduleError = validateScheduleCapacity(todos, [
			{
				...currentTodo,
				...updates,
				id: params.id
			}
		], settings);

		if (scheduleError) {
			return json({ message: scheduleError.message }, { status: 400 });
		}

		todo = await updateTodo(params.id, updates);
	}

	if (!todo) {
		return json({ message: 'todo not found' }, { status: 404 });
	}

	return json({ todo });
}

export async function DELETE({ params }) {
	if (!ObjectId.isValid(params.id)) {
		return json({ message: 'invalid todo id' }, { status: 400 });
	}

	const wasDeleted = await deleteTodo(params.id);

	if (!wasDeleted) {
		return json({ message: 'todo not found' }, { status: 404 });
	}

	return json({ success: true });
}
