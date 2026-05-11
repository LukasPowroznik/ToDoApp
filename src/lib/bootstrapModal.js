export async function loadBootstrap() {
	if (typeof window === 'undefined') {
		return null;
	}

	if (window.bootstrap?.Modal) {
		return window.bootstrap;
	}

	const bootstrap = await import('bootstrap/dist/js/bootstrap.esm.min.js');

	window.bootstrap = bootstrap;

	return bootstrap;
}

export async function showModal(modalId) {
	const modalElement = document.getElementById(modalId);

	if (!modalElement) {
		return;
	}

	const bootstrap = await loadBootstrap();
	const modal = bootstrap?.Modal.getOrCreateInstance(modalElement);

	modal?.show();
}

export async function hideModal(modalId) {
	const modalElement = document.getElementById(modalId);

	if (!modalElement) {
		return;
	}

	const bootstrap = await loadBootstrap();
	const modal = bootstrap?.Modal.getInstance(modalElement);

	modal?.hide();
}
