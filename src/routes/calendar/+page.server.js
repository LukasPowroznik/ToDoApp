import { listTodos } from '$lib/server/todos.js';

export async function load() {
	return {
		todos: await listTodos()
	};
}
