import { listTodos } from '$lib/server/todos.js';
import { getTodayMeta } from '$lib/server/date.js';

export async function load() {
	return {
		todos: await listTodos(),
		...getTodayMeta()
	};
}
