export function getTodayMeta() {
	const today = new Date().toISOString().slice(0, 10);
	const [year, month, day] = today.split('-');

	return {
		today,
		monthPrefix: `${year}-${month}`,
		readableDate: `${day}.${month}.${year}`
	};
}
