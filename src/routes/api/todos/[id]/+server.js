import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { completeTodo, deleteTodo, updateTodo } from '$lib/server/todos.js';

export async function PATCH({ params, request }) {
	const updates = await request.json();

	if (!ObjectId.isValid(params.id)) {
		return json({ message: 'invalid todo id' }, { status: 400 });
	}

	if (!updates.title && updates.status !== 'Completed') {
		return json({ message: 'title is required' }, { status: 400 });
	}

	const todo =
		updates.status === 'Completed' && !updates.title
			? await completeTodo(params.id)
			: await updateTodo(params.id, updates);

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
