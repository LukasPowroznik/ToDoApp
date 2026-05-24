import { listTodos } from '$lib/server/todos.js';
import { getMonthMeta, getWeekMeta } from '$lib/server/date.js';
import { getCapacitySettings } from '$lib/server/settings.js';

export async function load({ url }) {
	const settings = await getCapacitySettings();
	const hasExplicitCalendarMode =
		url.searchParams.has('view') ||
		url.searchParams.has('scope') ||
		url.searchParams.has('week') ||
		url.searchParams.has('month');
	const defaultCalendarView = hasExplicitCalendarMode ? null : settings.defaultCalendarView;
	const weekMeta = getWeekMeta(url.searchParams.get('week'));
	const monthMeta = getMonthMeta(url.searchParams.get('month') ?? url.searchParams.get('week'));
	const view =
		url.searchParams.get('view') === 'month' ||
		(url.searchParams.has('month') && !url.searchParams.has('week')) ||
		defaultCalendarView === 'month'
			? 'month'
			: 'week';
	const scope =
		url.searchParams.get('scope') === 'workweek' || defaultCalendarView === 'workweek'
			? 'workweek'
			: 'week';
	const weekDays = scope === 'workweek' ? weekMeta.weekDays.slice(0, 5) : weekMeta.weekDays;
	const weekEndDay = weekDays.at(-1);

	return {
		todos: await listTodos(),
		...weekMeta,
		...monthMeta,
		view,
		scope,
		weekDays,
		weekEnd: weekEndDay.date,
		readableWeekEnd: weekEndDay.readableDate
	};
}
