import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { completeTodo } from '$lib/server/todos.js';

export async function PATCH({ params, request }) {
	const updates = await request.json();

	if (!ObjectId.isValid(params.id)) {
		return json({ message: 'invalid todo id' }, { status: 400 });
	}

	if (updates.status !== 'Completed') {
		return json({ message: 'only status Completed is supported' }, { status: 400 });
	}

	const todo = await completeTodo(params.id);

	if (!todo) {
		return json({ message: 'todo not found' }, { status: 404 });
	}

	return json({ todo });
}
