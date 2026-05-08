<script>
	import CalendarWeekView from '$lib/components/CalendarWeekView.svelte';

	let { data } = $props();

	const todos = $derived(data.todos);

	const weekDays = [
		{ label: 'Mo', date: '2026-05-04' },
		{ label: 'Di', date: '2026-05-05' },
		{ label: 'Mi', date: '2026-05-06' },
		{ label: 'Do', date: '2026-05-07' },
		{ label: 'Fr', date: '2026-05-08' },
		{ label: 'Sa', date: '2026-05-09' },
		{ label: 'So', date: '2026-05-10' }
	];
</script>

<div class="container">
	<header class="page-header">
		<p class="page-kicker">Kalender</p>
		<h1 class="h2 mb-2">Woche vom 04.05. bis 10.05.2026</h1>
		<p class="text-secondary mb-0">Wochenansicht mit terminierten Aufgaben aus MongoDB.</p>
	</header>

	<div class="d-flex flex-wrap gap-2 mb-4">
		<button class="btn btn-outline-primary" type="button">Vorherige Woche</button>
		<button class="btn btn-primary" type="button">Heute</button>
		<button class="btn btn-outline-primary" type="button">Nächste Woche</button>
	</div>

	<CalendarWeekView weekDays={weekDays} {todos} />
</div>
