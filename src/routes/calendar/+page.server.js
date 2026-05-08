import { listTodos } from '$lib/server/todos.js';
import { getWeekMeta } from '$lib/server/date.js';

export async function load({ url }) {
	const weekMeta = getWeekMeta(url.searchParams.get('week'));

	return {
		todos: await listTodos(),
		...weekMeta
	};
}
