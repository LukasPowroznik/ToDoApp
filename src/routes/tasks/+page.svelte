<script>
	import TodoList from '$lib/components/TodoList.svelte';
	import { demoTodos } from '$lib/data/demoTodos.js';

	const openTodos = demoTodos.filter((todo) => !todo.completed);
	const completedTodos = demoTodos.filter((todo) => todo.completed);
	const overdueTodos = demoTodos.filter((todo) => !todo.completed && todo.dueDate < '2026-05-06');
	const unscheduledTodos = demoTodos.filter((todo) => !todo.completed && !todo.dueDate);
</script>

<div class="container">
	<header class="page-header">
		<p class="page-kicker">Alle To-Dos</p>
		<h1 class="h2 mb-2">Aufgaben verwalten</h1>
		<p class="text-secondary mb-0">
			Statische Demo-Ansicht als Grundlage für spätere Filter, Modals und Speicherlogik.
		</p>
	</header>

	<div class="row g-3 mb-4">
		<div class="col-sm-6 col-lg-3">
			<div class="card dashboard-card h-100">
				<div class="card-body">
					<p class="text-secondary small mb-1">Offen</p>
					<h2 class="h3 mb-0">{openTodos.length}</h2>
				</div>
			</div>
		</div>
		<div class="col-sm-6 col-lg-3">
			<div class="card dashboard-card h-100">
				<div class="card-body">
					<p class="text-secondary small mb-1">Erledigt</p>
					<h2 class="h3 mb-0">{completedTodos.length}</h2>
				</div>
			</div>
		</div>
		<div class="col-sm-6 col-lg-3">
			<div class="card dashboard-card h-100">
				<div class="card-body">
					<p class="text-secondary small mb-1">Überfällig</p>
					<h2 class="h3 text-danger mb-0">{overdueTodos.length}</h2>
				</div>
			</div>
		</div>
		<div class="col-sm-6 col-lg-3">
			<div class="card dashboard-card h-100">
				<div class="card-body">
					<p class="text-secondary small mb-1">Nicht terminiert</p>
					<h2 class="h3 mb-0">{unscheduledTodos.length}</h2>
				</div>
			</div>
		</div>
	</div>

	<section class="card dashboard-card">
		<div class="card-body">
			<div class="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
				<div>
					<h2 class="h5 mb-1">Aufgabenliste</h2>
					<p class="text-secondary mb-0">Alle Demo-Aufgaben aus den vier festen Kategorien.</p>
				</div>
				<div class="d-flex flex-wrap gap-2">
					<button class="btn btn-primary" type="button">Neues To-Do erfassen</button>
					<button class="btn btn-outline-primary" type="button">ToDo's terminieren</button>
				</div>
			</div>

			<TodoList todos={demoTodos} />
		</div>
	</section>
</div>
