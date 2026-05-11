<script>
	import { page } from '$app/state';
	import { showModal } from '$lib/bootstrapModal.js';
	import AddTodoModal from '$lib/components/AddTodoModal.svelte';
	import ScheduleTodosModal from '$lib/components/ScheduleTodosModal.svelte';
	import TodoList from '$lib/components/TodoList.svelte';

	const categories = ['Privat', 'Arbeit', 'Sport', 'Sonstiges'];
	const priorities = ['Low', 'Medium', 'High'];

	let { data } = $props();
	let statusFilter = $state('all');
	let categoryFilter = $state('all');
	let priorityFilter = $state('all');

	const todos = $derived(data.todos);
	const editTodoId = $derived(page.url.searchParams.get('edit'));
	const openTodos = $derived(todos.filter((todo) => todo.status === 'Open'));
	const completedTodos = $derived(todos.filter((todo) => todo.status === 'Completed'));
	const overdueTodos = $derived(
		todos.filter((todo) => todo.status === 'Open' && todo.deadline && todo.deadline < data.today)
	);
	const unscheduledTodos = $derived(todos.filter((todo) => todo.status === 'Open' && !todo.scheduledDate));
	const priorityOrder = {
		High: 0,
		Medium: 1,
		Low: 2
	};
	const filteredTodos = $derived(
		todos
			.filter((todo) => {
				const matchesStatus =
					statusFilter === 'all' ||
					(statusFilter === 'open' && todo.status === 'Open') ||
					(statusFilter === 'completed' && todo.status === 'Completed') ||
					(statusFilter === 'overdue' &&
						todo.status === 'Open' &&
						todo.deadline &&
						todo.deadline < data.today) ||
					(statusFilter === 'unscheduled' && todo.status === 'Open' && !todo.scheduledDate) ||
					(statusFilter === 'today' && todo.status === 'Open' && todo.scheduledDate === data.today) ||
					(statusFilter === 'scheduled' && todo.scheduledDate?.startsWith(data.monthPrefix));
				const matchesCategory = categoryFilter === 'all' || todo.category === categoryFilter;
				const matchesPriority = priorityFilter === 'all' || todo.priority === priorityFilter;

				return matchesStatus && matchesCategory && matchesPriority;
			})
			.toSorted((firstTodo, secondTodo) => {
				const shouldGroupCompletedLast = statusFilter === 'all' || statusFilter === 'scheduled';

				if (shouldGroupCompletedLast && firstTodo.status !== secondTodo.status) {
					return firstTodo.status === 'Completed' ? 1 : -1;
				}

				const firstDeadline = firstTodo.deadline ?? '9999-12-31';
				const secondDeadline = secondTodo.deadline ?? '9999-12-31';

				if (firstDeadline !== secondDeadline) {
					return firstDeadline.localeCompare(secondDeadline);
				}

				return (priorityOrder[firstTodo.priority] ?? 99) - (priorityOrder[secondTodo.priority] ?? 99);
			})
	);

	function toggleStatusFilter(filter) {
		statusFilter = statusFilter === filter ? 'all' : filter;
	}

	$effect(() => {
		const status = page.url.searchParams.get('status');
		const category = page.url.searchParams.get('category');
		const priority = page.url.searchParams.get('priority');

		statusFilter = status ?? 'all';
		categoryFilter = category ?? 'all';
		priorityFilter = priority ?? 'all';
	});
</script>

<div class="container">
	<header class="page-header">
		<h1 class="h2 mb-2">Aufgaben verwalten</h1>
		<p class="text-secondary mb-0">
			To-Dos erfassen, filtern, bearbeiten und in MongoDB speichern.
		</p>
	</header>

	<div class="row g-3 mb-4">
		<div class="col-sm-6 col-lg-3">
			<button
				class={`card dashboard-card stat-filter-card stat-card-open h-100 w-100 text-start ${statusFilter === 'open' ? 'stat-filter-card-active' : ''}`}
				type="button"
				aria-pressed={statusFilter === 'open'}
				onclick={() => toggleStatusFilter('open')}
			>
				<div class="card-body">
					<p class="text-secondary small mb-1">Offen</p>
					<h2 class="h3 mb-0">{openTodos.length}</h2>
				</div>
			</button>
		</div>
		<div class="col-sm-6 col-lg-3">
			<button
				class={`card dashboard-card stat-filter-card stat-card-completed h-100 w-100 text-start ${statusFilter === 'completed' ? 'stat-filter-card-active' : ''}`}
				type="button"
				aria-pressed={statusFilter === 'completed'}
				onclick={() => toggleStatusFilter('completed')}
			>
				<div class="card-body">
					<p class="text-secondary small mb-1">Erledigt</p>
					<h2 class="h3 text-success mb-0">{completedTodos.length}</h2>
				</div>
			</button>
		</div>
		<div class="col-sm-6 col-lg-3">
			<button
				class={`card dashboard-card stat-filter-card stat-card-overdue h-100 w-100 text-start ${statusFilter === 'overdue' ? 'stat-filter-card-active' : ''}`}
				type="button"
				aria-pressed={statusFilter === 'overdue'}
				onclick={() => toggleStatusFilter('overdue')}
			>
				<div class="card-body">
					<p class="text-secondary small mb-1">Überfällig</p>
					<h2 class="h3 text-danger mb-0">{overdueTodos.length}</h2>
				</div>
			</button>
		</div>
		<div class="col-sm-6 col-lg-3">
			<button
				class={`card dashboard-card stat-filter-card stat-card-scheduled h-100 w-100 text-start ${statusFilter === 'unscheduled' ? 'stat-filter-card-active' : ''}`}
				type="button"
				aria-pressed={statusFilter === 'unscheduled'}
				onclick={() => toggleStatusFilter('unscheduled')}
			>
				<div class="card-body">
					<p class="text-secondary small mb-1">Nicht terminiert</p>
					<h2 class="h3 mb-0">{unscheduledTodos.length}</h2>
				</div>
			</button>
		</div>
	</div>

	<section class="card dashboard-card tasks-list-card">
		<div class="card-body">
			<div class="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
				<div>
					<h2 class="h5 mb-1">Aufgabenliste</h2>
					<p class="text-secondary mb-0">{filteredTodos.length} von {todos.length} Aufgaben angezeigt.</p>
				</div>
				<div class="d-flex flex-wrap gap-2">
					<button
						class="btn btn-action-primary"
						type="button"
						onclick={() => showModal('addTodoModal')}
					>
						Neues To-Do erfassen
					</button>
					<button
						class="btn btn-action-schedule"
						type="button"
						onclick={() => showModal('scheduleTodosModal')}
					>
						To-Dos terminieren
					</button>
				</div>
			</div>

			<div class="row g-3 mb-4">
				<div class="col-md-4">
					<label class="form-label" for="status-filter">Status</label>
					<select class="form-select" id="status-filter" bind:value={statusFilter}>
						<option value="all">Alle</option>
						<option value="open">Offen</option>
						<option value="completed">Erledigt</option>
						<option value="overdue">Überfällig</option>
						<option value="unscheduled">Nicht terminiert</option>
						<option value="today">Heute terminiert</option>
						<option value="scheduled">Terminiert diesen Monat</option>
					</select>
				</div>

				<div class="col-md-4">
					<label class="form-label" for="category-filter">Kategorie</label>
					<select class="form-select" id="category-filter" bind:value={categoryFilter}>
						<option value="all">Alle Kategorien</option>
						{#each categories as category}
							<option value={category}>{category}</option>
						{/each}
					</select>
				</div>

				<div class="col-md-4">
					<label class="form-label" for="priority-filter">Priorität</label>
					<select class="form-select" id="priority-filter" bind:value={priorityFilter}>
						<option value="all">Alle Prioritäten</option>
						{#each priorities as priority}
							<option value={priority}>{priority}</option>
						{/each}
					</select>
				</div>
			</div>

			<TodoList todos={filteredTodos} today={data.today} {editTodoId} />
		</div>
	</section>

	<AddTodoModal />
	<ScheduleTodosModal {todos} />
</div>
