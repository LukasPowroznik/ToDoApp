import { ObjectId } from 'mongodb';
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

export async function completeTodo(id) {
	const collection = await getTodosCollection();
	const result = await collection.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{
			$set: {
				status: 'Completed',
				completedAt: new Date().toISOString()
			}
		},
		{ returnDocument: 'after' }
	);

	return result ? serializeTodo(result) : null;
}

export async function updateTodo(id, todo) {
	const collection = await getTodosCollection();
	const recurrenceType = todo.recurrence?.type;
	const update = {
		title: todo.title,
		description: todo.description ?? '',
		category: todo.category ?? 'Privat',
		priority: todo.priority ?? 'Medium',
		status: todo.status ?? 'Open',
		estimatedDuration: todo.estimatedDuration ?? '',
		recurring: Boolean(recurrenceType),
		updatedAt: new Date().toISOString()
	};
	const unset = {};

	if (todo.deadline) {
		update.deadline = todo.deadline;
	} else {
		unset.deadline = '';
	}

	if (recurrenceType) {
		update.recurrence = { type: recurrenceType };
	} else {
		unset.recurrence = '';
	}

	if (update.status === 'Completed') {
		update.completedAt = todo.completedAt ?? new Date().toISOString();
	} else {
		unset.completedAt = '';
	}

	const changes = { $set: update };

	if (Object.keys(unset).length > 0) {
		changes.$unset = unset;
	}

	const result = await collection.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		changes,
		{ returnDocument: 'after' }
	);

	return result ? serializeTodo(result) : null;
}
