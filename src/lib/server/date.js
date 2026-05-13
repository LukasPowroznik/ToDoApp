export function getTodayMeta() {
	const today = new Date().toISOString().slice(0, 10);
	const [year, month, day] = today.split('-');

	return {
		today,
		monthPrefix: `${year}-${month}`,
		readableDate: `${day}.${month}.${year}`
	};
}

function toDateOnly(date) {
	return date.toISOString().slice(0, 10);
}

function formatReadableDate(dateString) {
	const [year, month, day] = dateString.split('-');

	return `${day}.${month}.${year}`;
}

export function getWeekMeta(weekDateString) {
	const fallbackDate = new Date();
	const parsedDate = weekDateString ? new Date(`${weekDateString}T12:00:00.000Z`) : fallbackDate;
	const selectedDate = Number.isNaN(parsedDate.getTime()) ? fallbackDate : parsedDate;
	const dayOfWeek = selectedDate.getUTCDay() || 7;
	const monday = new Date(selectedDate);

	monday.setUTCHours(12, 0, 0, 0);
	monday.setUTCDate(selectedDate.getUTCDate() - dayOfWeek + 1);

	const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((label, index) => {
		const date = new Date(monday);
		date.setUTCDate(monday.getUTCDate() + index);
		const dateString = toDateOnly(date);

		return {
			label,
			date: dateString,
			readableDate: formatReadableDate(dateString)
		};
	});
	const previousWeek = new Date(monday);
	const nextWeek = new Date(monday);

	previousWeek.setUTCDate(monday.getUTCDate() - 7);
	nextWeek.setUTCDate(monday.getUTCDate() + 7);

	return {
		weekDays,
		weekStart: weekDays[0].date,
		weekEnd: weekDays[6].date,
		readableWeekStart: weekDays[0].readableDate,
		readableWeekEnd: weekDays[6].readableDate,
		previousWeek: toDateOnly(previousWeek),
		nextWeek: toDateOnly(nextWeek),
		today: getTodayMeta().today
	};
}

export function getMonthMeta(monthDateString) {
	const fallbackDate = new Date();
	const normalizedMonthDate =
		monthDateString && monthDateString.length === 7 ? `${monthDateString}-01` : monthDateString;
	const parsedDate = normalizedMonthDate ? new Date(`${normalizedMonthDate}T12:00:00.000Z`) : fallbackDate;
	const selectedDate = Number.isNaN(parsedDate.getTime()) ? fallbackDate : parsedDate;
	const firstOfMonth = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), 1, 12));
	const lastOfMonth = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth() + 1, 0, 12));
	const firstDayOfGrid = new Date(firstOfMonth);
	const dayOfWeek = firstOfMonth.getUTCDay() || 7;
	const today = getTodayMeta().today;

	firstDayOfGrid.setUTCDate(firstOfMonth.getUTCDate() - dayOfWeek + 1);

	const monthDays = Array.from({ length: 42 }, (_, index) => {
		const date = new Date(firstDayOfGrid);
		date.setUTCDate(firstDayOfGrid.getUTCDate() + index);
		const dateString = toDateOnly(date);

		return {
			date: dateString,
			day: date.getUTCDate(),
			isCurrentMonth: date.getUTCMonth() === firstOfMonth.getUTCMonth(),
			isToday: dateString === today
		};
	});
	const previousMonth = new Date(firstOfMonth);
	const nextMonth = new Date(firstOfMonth);
	const month = String(firstOfMonth.getUTCMonth() + 1).padStart(2, '0');
	const year = firstOfMonth.getUTCFullYear();

	previousMonth.setUTCMonth(firstOfMonth.getUTCMonth() - 1);
	nextMonth.setUTCMonth(firstOfMonth.getUTCMonth() + 1);

	return {
		monthDays,
		monthStart: toDateOnly(firstOfMonth),
		monthEnd: toDateOnly(lastOfMonth),
		monthValue: `${year}-${month}`,
		readableMonth: `${month}.${year}`,
		previousMonth: toDateOnly(previousMonth),
		nextMonth: toDateOnly(nextMonth)
	};
}
