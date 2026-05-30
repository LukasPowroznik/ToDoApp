import { writable } from 'svelte/store';

const emptyMessage = {
	message: '',
	tone: 'success'
};

let timeoutId;

export const appStatusMessage = writable(emptyMessage);

export function showAppStatusMessage(message, tone = 'success') {
	appStatusMessage.set({ message, tone });

	if (typeof window === 'undefined') {
		return;
	}

	window.clearTimeout(timeoutId);
	timeoutId = window.setTimeout(clearAppStatusMessage, 4500);
}

export function clearAppStatusMessage() {
	appStatusMessage.set(emptyMessage);
}
