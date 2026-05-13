<script>
	import CalendarMonthView from '$lib/components/CalendarMonthView.svelte';
	import CalendarWeekView from '$lib/components/CalendarWeekView.svelte';

	let { data } = $props();

	const todos = $derived(data.todos);
	const isMonthView = $derived(data.view === 'month');
	const isWorkWeek = $derived(data.scope === 'workweek');
</script>

<div class="container">
	<header class="page-header">
		<h1 class="h2 mb-2">
			{#if isMonthView}
				Monatsübersicht {data.readableMonth}
			{:else if isWorkWeek}
				Arbeitswoche vom {data.readableWeekStart} bis {data.readableWeekEnd}
			{:else}
				Woche vom {data.readableWeekStart} bis {data.readableWeekEnd}
			{/if}
		</h1>
		<p class="text-secondary mb-0">Kalenderansicht mit terminierten Aufgaben aus MongoDB.</p>
	</header>

	<div class="calendar-toolbar mb-4">
		<div class="d-flex flex-wrap gap-2">
			{#if isMonthView}
				<a class="btn btn-outline-primary" href={`/calendar?view=month&month=${data.previousMonth}`}>
					Vorheriger Monat
				</a>
				<a class="btn btn-primary" href="/calendar?view=month">Aktueller Monat</a>
				<a class="btn btn-outline-primary" href={`/calendar?view=month&month=${data.nextMonth}`}>
					Nächster Monat
				</a>
			{:else}
				<a class="btn btn-outline-primary" href={`/calendar?week=${data.previousWeek}${isWorkWeek ? '&scope=workweek' : ''}`}>
					Vorherige Woche
				</a>
				<a class="btn btn-primary" href={isWorkWeek ? '/calendar?scope=workweek' : '/calendar'}>Heute</a>
				<a class="btn btn-outline-primary" href={`/calendar?week=${data.nextWeek}${isWorkWeek ? '&scope=workweek' : ''}`}>
					Nächste Woche
				</a>
			{/if}
		</div>

		<div class="d-flex flex-wrap gap-2">
			<a
				class={`btn ${isMonthView ? 'btn-primary' : 'btn-outline-primary'} calendar-view-button`}
				href={`/calendar?view=month&month=${data.monthValue}`}
				aria-label="Monatsübersicht"
				aria-current={isMonthView ? 'page' : undefined}
			>
				<span class="calendar-view-icon" aria-hidden="true"></span>
			</a>
			<a
				class={`btn ${!isMonthView && isWorkWeek ? 'btn-primary' : 'btn-outline-primary'}`}
				href={`/calendar?scope=workweek&week=${data.weekStart}`}
				aria-current={!isMonthView && isWorkWeek ? 'page' : undefined}
			>
				Arbeitswoche
			</a>
			<a
				class={`btn ${!isMonthView && !isWorkWeek ? 'btn-primary' : 'btn-outline-primary'}`}
				href={`/calendar?week=${data.weekStart}`}
				aria-current={!isMonthView && !isWorkWeek ? 'page' : undefined}
			>
				Woche
			</a>
		</div>
	</div>

	{#if isMonthView}
		<CalendarMonthView monthDays={data.monthDays} {todos} today={data.today} />
	{:else}
		<CalendarWeekView weekDays={data.weekDays} {todos} today={data.today} />
	{/if}
</div>
