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
