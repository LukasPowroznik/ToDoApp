<script>
	let { todos = [], monthPrefix = '2026-05', today = '2026-05-06' } = $props();

	const openTodosThisMonth = $derived(todos.filter(
		(todo) => !todo.completed && todo.dueDate?.startsWith(monthPrefix)
	));
	const scheduledThisMonth = $derived(
		todos.filter((todo) => todo.dueDate?.startsWith(monthPrefix))
	);
	const overdueTodos = $derived(todos.filter((todo) => !todo.completed && todo.dueDate < today));
</script>

<div class="row g-3">
	<div class="col-sm-6">
		<div class="card dashboard-card h-100">
			<div class="card-body">
				<p class="text-secondary small mb-1">On-time completion</p>
				<h2 class="h3 mb-3">80%</h2>
				<div
					class="progress"
					role="progressbar"
					aria-label="Rechtzeitig erledigt"
					aria-valuenow="80"
					aria-valuemin="0"
					aria-valuemax="100"
				>
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
