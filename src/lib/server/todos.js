import { getTodosCollection } from '$lib/server/db.js';

function serializeTodo(todo) {
	const { _id, ...serializedTodo } = todo;

	return {
		...serializedTodo,
		id: _id.toString()
	};
}

export async function listTodos() {
	const collection = await getTodosCollection();
	const todos = await collection.find({}).sort({ createdAt: -1 }).toArray();

	return todos.map(serializeTodo);
}

export async function createTodo(todo) {
	const collection = await getTodosCollection();
	const now = new Date().toISOString();
	const document = {
		title: todo.title,
		description: todo.description ?? '',
		category: todo.category ?? 'Privat',
		deadline: todo.deadline || undefined,
		priority: todo.priority ?? 'Medium',
		status: todo.status ?? 'Open',
		estimatedDuration: todo.estimatedDuration ?? '',
		recurring: Boolean(todo.recurring),
		recurrence: todo.recurrence,
		createdAt: now
	};

	const result = await collection.insertOne(document);

	return serializeTodo({
		...document,
		_id: result.insertedId
	});
}
