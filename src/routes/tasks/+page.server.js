import { listTodos } from '$lib/server/todos.js';
import { getTodayMeta } from '$lib/server/date.js';
import { getCapacitySettings } from '$lib/server/settings.js';

export async function load() {
	return {
		todos: await listTodos(),
		settings: await getCapacitySettings(),
		...getTodayMeta()
	};
}
