import { json } from '@sveltejs/kit';
import { createTodo, listTodos } from '$lib/server/todos.js';

export async function GET() {
	const todos = await listTodos();

	return json({ todos });
}

export async function POST({ request }) {
	const todo = await request.json();

	if (!todo.title || typeof todo.title !== 'string') {
		return json({ message: 'title is required' }, { status: 400 });
	}

	const createdTodo = await createTodo(todo);

	return json({ todo: createdTodo }, { status: 201 });
}
