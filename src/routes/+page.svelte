<script>
	import DashboardStats from '$lib/components/DashboardStats.svelte';
	import MonthlyCompletionChart from '$lib/components/MonthlyCompletionChart.svelte';
	import TodayTodos from '$lib/components/TodayTodos.svelte';

	let { data } = $props();

	const todos = $derived(data.todos);
</script>

<div class="container">
	<header class="page-header">
		<h1 class="h2 mb-2">Heute im Überblick</h1>
		<p class="text-secondary mb-0">
			Aktuelle Aufgaben, heutige Termine und Kennzahlen aus MongoDB.
		</p>
	</header>

	<div class="row g-4">
		<section class="col-lg-7">
			<TodayTodos {todos} today={data.today} readableDate={data.readableDate} />
		</section>

		<section class="col-lg-5">
			<DashboardStats {todos} today={data.today} monthPrefix={data.monthPrefix} />
		</section>

		<section class="col-12">
			<MonthlyCompletionChart {todos} />
		</section>
	</div>
</div>
