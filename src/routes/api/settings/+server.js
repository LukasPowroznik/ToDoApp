import { json } from '@sveltejs/kit';
import { getCapacitySettings, updateCapacitySettings } from '$lib/server/settings.js';

export async function GET() {
	const settings = await getCapacitySettings();

	return json({ settings });
}

export async function PATCH({ request }) {
	const settings = await request.json();
	const updatedSettings = await updateCapacitySettings(settings);

	return json({ settings: updatedSettings });
}
