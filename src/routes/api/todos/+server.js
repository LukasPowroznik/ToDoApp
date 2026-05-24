import { json } from '@sveltejs/kit';
import { createTodo, listTodos } from '$lib/server/todos.js';
import { getCapacitySettings } from '$lib/server/settings.js';
import { validateScheduleCapacity } from '$lib/scheduleCapacity.js';

export async function GET() {
	const todos = await listTodos();

	return json({ todos });
}

export async function POST({ request }) {
	const todo = await request.json();

	if (!todo.title || typeof todo.title !== 'string') {
		return json({ message: 'title is required' }, { status: 400 });
	}

	const todos = await listTodos();
	const settings = await getCapacitySettings();
	const scheduleError = validateScheduleCapacity(todos, [todo], settings);

	if (scheduleError) {
		return json({ message: scheduleError.message }, { status: 400 });
	}

	const createdTodo = await createTodo(todo);

	return json({ todo: createdTodo }, { status: 201 });
}
