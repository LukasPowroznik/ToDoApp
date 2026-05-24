<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	const navigationItems = [
		{ href: '/', label: 'Dashboard' },
		{ href: '/tasks', label: 'Alle To-Dos' },
		{ href: '/calendar', label: 'Kalender' }
	];

	let theme = $state('light');

	const isActive = (href) => {
		if (href === '/') {
			return page.url.pathname === '/';
		}

		return page.url.pathname.startsWith(href);
	};

	function setTheme(nextTheme) {
		theme = nextTheme;
		document.documentElement.dataset.bsTheme = nextTheme;
		localStorage.setItem('todoapp-theme', nextTheme);
	}

	function toggleTheme() {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}

	onMount(() => {
		theme = document.documentElement.dataset.bsTheme ?? 'light';
	});
</script>

<nav class="navbar navbar-expand-lg app-navbar border-bottom sticky-top">
	<div class="container">
		<a class="navbar-brand fw-semibold" href="/">To-Do Dashboard</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#mainNavigation"
			aria-controls="mainNavigation"
			aria-expanded="false"
			aria-label="Navigation umschalten"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="mainNavigation">
			<ul class="navbar-nav ms-auto gap-lg-2">
				{#each navigationItems as item}
					<li class="nav-item">
						<a
							class={`nav-link rounded px-lg-3 ${isActive(item.href) ? 'active fw-semibold text-primary bg-primary-subtle' : ''}`}
							aria-current={isActive(item.href) ? 'page' : undefined}
							href={item.href}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>

			<a
				class={`btn btn-sm btn-outline-secondary ms-lg-3 mt-3 mt-lg-0 navbar-icon-button ${isActive('/settings') ? 'active' : ''}`}
				href="/settings"
				aria-label="Einstellungen"
				aria-current={isActive('/settings') ? 'page' : undefined}
				title="Einstellungen"
			>
				<svg class="settings-icon" aria-hidden="true" viewBox="0 0 24 24">
					<path
						d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					/>
					<path
						d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.04.04a2 2 0 0 1-2.83 2.83l-.04-.04a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 0 1-4 0v-.07a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.04.04a2 2 0 0 1-2.83-2.83l.04-.04A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 0 1 0-4h.07A1.7 1.7 0 0 0 4.6 8.94a1.7 1.7 0 0 0-.34-1.88l-.04-.04a2 2 0 0 1 2.83-2.83l.04.04a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 10 3.01V3a2 2 0 0 1 4 0v.07a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.04-.04a2 2 0 0 1 2.83 2.83l-.04.04a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 0 1 0 4h-.07A1.7 1.7 0 0 0 19.4 15Z"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					/>
				</svg>
			</a>

			<button
				class="btn btn-sm btn-outline-secondary ms-lg-2 mt-3 mt-lg-0 theme-toggle-button"
				type="button"
				aria-label={theme === 'dark' ? 'Hellen Modus aktivieren' : 'Dunklen Modus aktivieren'}
				aria-pressed={theme === 'dark'}
				onclick={toggleTheme}
			>
				<span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
			</button>
		</div>
	</div>
</nav>
