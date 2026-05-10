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

			<button
				class="btn btn-sm btn-outline-secondary ms-lg-3 mt-3 mt-lg-0 theme-toggle-button"
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
