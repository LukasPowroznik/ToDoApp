<script>
	import { categoryBadgeClasses, demoTodos } from '$lib/data/demoTodos.js';

	const weekDays = [
		{ label: 'Mo', date: '2026-05-04' },
		{ label: 'Di', date: '2026-05-05' },
		{ label: 'Mi', date: '2026-05-06' },
		{ label: 'Do', date: '2026-05-07' },
		{ label: 'Fr', date: '2026-05-08' },
		{ label: 'Sa', date: '2026-05-09' },
		{ label: 'So', date: '2026-05-10' }
	];

	const scheduledTodos = demoTodos.filter((todo) => todo.dueDate);
	const getTodosForDate = (date) => scheduledTodos.filter((todo) => todo.dueDate === date);
</script>

<div class="container">
	<header class="page-header">
		<p class="page-kicker">Kalender</p>
		<h1 class="h2 mb-2">Woche vom 04.05. bis 10.05.2026</h1>
		<p class="text-secondary mb-0">
			Statische Wochenansicht mit terminierten Demo-Aufgaben.
		</p>
	</header>

	<div class="d-flex flex-wrap gap-2 mb-4">
		<button class="btn btn-outline-primary" type="button">Vorherige Woche</button>
		<button class="btn btn-primary" type="button">Heute</button>
		<button class="btn btn-outline-primary" type="button">Nächste Woche</button>
	</div>

	<div class="row g-3">
		{#each weekDays as day}
			<section class="col-md-6 col-xl">
				<div class="card dashboard-card calendar-day h-100">
					<div class="card-body">
						<h2 class="h6 mb-1">{day.label}</h2>
						<p class="text-secondary small mb-3">{day.date}</p>

						{#if getTodosForDate(day.date).length > 0}
							<div class="d-grid gap-2">
								{#each getTodosForDate(day.date) as todo}
									<button
										class={`btn text-start border bg-white ${todo.completed ? 'todo-item-completed' : ''}`}
										type="button"
									>
										<span class="d-block fw-semibold">{todo.title}</span>
										<span class={`badge mt-2 ${categoryBadgeClasses[todo.category]}`}>
											{todo.category}
										</span>
									</button>
								{/each}
							</div>
						{:else}
							<p class="text-secondary small mb-0">Keine Termine.</p>
						{/if}
					</div>
				</div>
			</section>
		{/each}
	</div>
</div>
