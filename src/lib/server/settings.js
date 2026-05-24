import { getSettingsCollection } from '$lib/server/db.js';

const SETTINGS_ID = 'capacity';

export const DEFAULT_CAPACITY_SETTINGS = {
	dailyHourLimit: 16,
	defaultCalendarView: 'week',
	categoryHourLimits: {
		Privat: 16,
		Arbeit: 8,
		Sport: 16,
		Sonstiges: 16
	}
};

function normalizeLimit(value, fallback) {
	const number = Number(value);

	return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function normalizeCalendarView(value) {
	return ['week', 'workweek', 'month'].includes(value)
		? value
		: DEFAULT_CAPACITY_SETTINGS.defaultCalendarView;
}

export function normalizeCapacitySettings(settings = {}) {
	const normalizedInput = settings ?? {};
	const categoryHourLimits = DEFAULT_CAPACITY_SETTINGS.categoryHourLimits;

	return {
		dailyHourLimit: normalizeLimit(normalizedInput.dailyHourLimit, DEFAULT_CAPACITY_SETTINGS.dailyHourLimit),
		defaultCalendarView: normalizeCalendarView(normalizedInput.defaultCalendarView),
		categoryHourLimits: Object.fromEntries(
			Object.entries(categoryHourLimits).map(([category, fallback]) => [
				category,
				normalizeLimit(normalizedInput.categoryHourLimits?.[category], fallback)
			])
		)
	};
}

export async function getCapacitySettings() {
	const collection = await getSettingsCollection();
	const settings = await collection.findOne({ _id: SETTINGS_ID });

	return normalizeCapacitySettings(settings);
}

export async function updateCapacitySettings(settings) {
	const collection = await getSettingsCollection();
	const normalizedSettings = normalizeCapacitySettings(settings);

	await collection.updateOne(
		{ _id: SETTINGS_ID },
		{
			$set: {
				...normalizedSettings,
				updatedAt: new Date().toISOString()
			}
		},
		{ upsert: true }
	);

	return normalizedSettings;
}
