<script>
	import { categoryBadgeClasses, demoTodos } from '$lib/data/demoTodos.js';

	const todaysTodos = demoTodos.filter((todo) => todo.dueDate === '2026-05-06');
	const openTodosThisMonth = demoTodos.filter(
		(todo) => !todo.completed && todo.dueDate?.startsWith('2026-05')
	);
	const scheduledThisMonth = demoTodos.filter((todo) => todo.dueDate?.startsWith('2026-05'));
	const overdueTodos = demoTodos.filter((todo) => !todo.completed && todo.dueDate < '2026-05-06');
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
			<div class="card dashboard-card h-100">
				<div class="card-body">
					<div class="d-flex justify-content-between align-items-start gap-3 mb-3">
						<div>
							<h2 class="h5 mb-1">Heute terminierte To-Dos</h2>
							<p class="text-secondary mb-0">Aufgaben mit Fälligkeitsdatum 06.05.2026.</p>
						</div>
						<span class="badge text-bg-primary">{todaysTodos.length}</span>
					</div>

					{#if todaysTodos.length > 0}
						<div class="list-group list-group-flush">
							{#each todaysTodos as todo}
								<article class="list-group-item px-0">
									<div class="d-flex justify-content-between gap-3">
										<div>
											<h3 class="h6 mb-1">{todo.title}</h3>
											<p class="text-secondary small mb-2">{todo.description}</p>
											<span class={`badge ${categoryBadgeClasses[todo.category]}`}>{todo.category}</span>
										</div>
										<span class="badge text-bg-light align-self-start">{todo.priority}</span>
									</div>
								</article>
							{/each}
						</div>
					{:else}
						<p class="text-secondary mb-0">
							Keine Aufgaben für heute. Du kannst vorausplanen oder den freien Tag genießen.
						</p>
					{/if}
				</div>
			</div>
		</section>

		<section class="col-lg-5">
			<div class="row g-3">
				<div class="col-sm-6">
					<div class="card dashboard-card h-100">
						<div class="card-body">
							<p class="text-secondary small mb-1">On-time completion</p>
							<h2 class="h3 mb-3">80%</h2>
							<div class="progress" role="progressbar" aria-label="Rechtzeitig erledigt" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
								<div class="progress-bar" style="width: 80%"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="card dashboard-card h-100">
						<div class="card-body">
							<p class="text-secondary small mb-1">Offen diesen Monat</p>
							<h2 class="h3 mb-0">{openTodosThisMonth.length}</h2>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="card dashboard-card h-100">
						<div class="card-body">
							<p class="text-secondary small mb-1">Fällig diesen Monat</p>
							<h2 class="h3 mb-0">{scheduledThisMonth.length}</h2>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="card dashboard-card h-100 border border-danger-subtle">
						<div class="card-body">
							<p class="text-secondary small mb-1">Überfällig</p>
							<h2 class="h3 text-danger mb-0">{overdueTodos.length}</h2>
						</div>
					</div>
				</div>
			</div>
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
