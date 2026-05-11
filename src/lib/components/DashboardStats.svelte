<script>
	import { buildTodoOccurrence, isTodoDueOnDate } from '$lib/todoSchedule.js';

	let { todos = [], monthPrefix = '2026-05', today = '2026-05-06' } = $props();

	const openTodos = $derived(todos.filter((todo) => todo.status === 'Open'));
	const completedTodos = $derived(todos.filter((todo) => todo.status === 'Completed'));
	const todaysOpenTodos = $derived(
		todos
			.filter((todo) => isTodoDueOnDate(todo, today))
			.map((todo) => buildTodoOccurrence(todo, today))
			.filter((todo) => !todo.isOccurrenceCompleted)
	);
	const overdueTodos = $derived(
		todos.filter((todo) => todo.status === 'Open' && todo.deadline && todo.deadline < today)
	);
	const scheduledThisMonth = $derived(
		todos.filter((todo) => todo.scheduledDate?.startsWith(monthPrefix))
	);
	const completedThisMonth = $derived(
		todos.filter((todo) => todo.status === 'Completed' && todo.completedAt?.startsWith(monthPrefix))
	);
	const onTimeCompletedThisMonth = $derived(
		completedThisMonth.filter((todo) => todo.deadline && todo.completedAt?.slice(0, 10) <= todo.deadline)
	);
	const onTimeCompletionRate = $derived(
		completedThisMonth.length > 0
			? Math.round((onTimeCompletedThisMonth.length / completedThisMonth.length) * 100)
			: 0
	);
</script>

<div class="row g-3">
	<div class="col-sm-6">
		<a class="card dashboard-card stat-card stat-card-open stat-card-link h-100" href="/tasks?status=open">
			<div class="card-body">
				<p class="text-secondary small mb-1">Offen</p>
				<h2 class="h3 mb-0">{openTodos.length}</h2>
			</div>
		</a>
	</div>
	<div class="col-sm-6">
		<a class="card dashboard-card stat-card stat-card-completed stat-card-link h-100" href="/tasks?status=completed">
			<div class="card-body">
				<p class="text-secondary small mb-1">Erledigt</p>
				<h2 class="h3 text-success mb-0">{completedTodos.length}</h2>
			</div>
		</a>
	</div>
	<div class="col-sm-6">
		<a class="card dashboard-card stat-card stat-card-today stat-card-link h-100" href="/tasks?status=today">
			<div class="card-body">
				<p class="text-secondary small mb-1">Heute terminiert</p>
				<h2 class="h3 mb-0">{todaysOpenTodos.length}</h2>
			</div>
		</a>
	</div>
	<div class="col-sm-6">
		<a class="card dashboard-card stat-card stat-card-overdue stat-card-link h-100" href="/tasks?status=overdue">
			<div class="card-body">
				<p class="text-secondary small mb-1">Überfällig</p>
				<h2 class="h3 text-danger mb-0">{overdueTodos.length}</h2>
			</div>
		</a>
	</div>
	<div class="col-12">
		<a class="card dashboard-card stat-card stat-card-scheduled stat-card-link h-100" href="/tasks?status=scheduled">
			<div class="card-body">
				<p class="text-secondary small mb-1">Terminiert diesen Monat</p>
				<h2 class="h3 mb-0">{scheduledThisMonth.length}</h2>
			</div>
		</a>
	</div>
	<div class="col-12">
		<div class="card dashboard-card stat-card stat-card-on-time h-100">
			<div class="card-body">
				<p class="text-secondary small mb-1">Rechtzeitig erledigt diesen Monat</p>
				<h2 class="h3 mb-3">{onTimeCompletionRate}%</h2>
				<div
					class="progress"
					role="progressbar"
					aria-label="Rechtzeitig erledigt diesen Monat"
					aria-valuenow={onTimeCompletionRate}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<div class="progress-bar" style={`width: ${onTimeCompletionRate}%`}></div>
				</div>
				<p class="text-secondary small mb-0 mt-2">
					{onTimeCompletedThisMonth.length} von {completedThisMonth.length} erledigten Aufgaben.
				</p>
			</div>
		</div>
	</div>
</div>
