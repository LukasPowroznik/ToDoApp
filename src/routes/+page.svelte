<script>
	import DashboardStats from '$lib/components/DashboardStats.svelte';
	import TodayTodos from '$lib/components/TodayTodos.svelte';
	import { demoTodos } from '$lib/data/demoTodos.js';
</script>

<div class="container">
	<header class="page-header">
		<p class="page-kicker">Dashboard</p>
		<h1 class="h2 mb-2">Heute im Überblick</h1>
		<p class="text-secondary mb-0">
			Ein erster statischer Prototyp mit Demo-Daten, Bootstrap Cards und klarer Seitenstruktur.
		</p>
	</header>

	<div class="row g-4">
		<section class="col-lg-7">
			<TodayTodos todos={demoTodos} />
		</section>

		<section class="col-lg-5">
			<DashboardStats todos={demoTodos} />
		</section>

		<section class="col-12">
			<div class="card dashboard-card">
				<div class="card-body">
					<h2 class="h5 mb-1">Gelöste Aufgaben pro Monat</h2>
					<p class="text-secondary mb-3">
						Platzhalter für ein späteres Liniendiagramm mit echten Aufgaben-Daten.
					</p>
					<div class="chart-placeholder rounded d-flex align-items-center justify-content-center text-secondary">
						Diagramm-Platzhalter
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
