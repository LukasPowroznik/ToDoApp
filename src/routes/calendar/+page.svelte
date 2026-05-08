<script>
	import CalendarWeekView from '$lib/components/CalendarWeekView.svelte';

	let { data } = $props();

	const todos = $derived(data.todos);
</script>

<div class="container">
	<header class="page-header">
		<h1 class="h2 mb-2">Woche vom {data.readableWeekStart} bis {data.readableWeekEnd}</h1>
		<p class="text-secondary mb-0">Wochenansicht mit terminierten Aufgaben aus MongoDB.</p>
	</header>

	<div class="d-flex flex-wrap gap-2 mb-4">
		<a class="btn btn-outline-primary" href={`/calendar?week=${data.previousWeek}`}>Vorherige Woche</a>
		<a class="btn btn-primary" href="/calendar">Heute</a>
		<a class="btn btn-outline-primary" href={`/calendar?week=${data.nextWeek}`}>Nächste Woche</a>
	</div>

	<CalendarWeekView weekDays={data.weekDays} {todos} today={data.today} />
</div>
