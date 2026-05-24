import { getCapacitySettings } from '$lib/server/settings.js';

export async function load() {
	return {
		settings: await getCapacitySettings()
	};
}
