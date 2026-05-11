<script>
	import { tick } from 'svelte';
	import { showModal } from '$lib/bootstrapModal.js';
	import CalendarTodoDetailModal from '$lib/components/CalendarTodoDetailModal.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { categoryBadgeClasses } from '$lib/data/todoOptions.js';
	import { buildTodoOccurrence, isTodoDueOnDate } from '$lib/todoSchedule.js';

	let { todos = [], today = '2026-05-06', readableDate = '06.05.2026' } = $props();
	let selectedTodo = $state(null);

	const todaysTodos = $derived(
		todos
			.filter((todo) => isTodoDueOnDate(todo, today))
			.map((todo) => buildTodoOccurrence(todo, today))
			.filter((todo) => !todo.isOccurrenceCompleted)
	);

	async function openDetailModal(todo) {
		selectedTodo = todo;
		await tick();

		await showModal('dashboardTodoDetailModal');
	}
</script>

<div class="card dashboard-card dashboard-section-card h-100">
	<div class="dashboard-section-header">
		<div class="d-flex justify-content-between align-items-start gap-3">
			<div>
				<h2 class="h5 mb-1">Heute terminierte To-Dos</h2>
				<p class="text-secondary mb-0">Aufgaben mit geplantem Termin {readableDate}.</p>
			</div>
			<span class="badge text-bg-primary">{todaysTodos.length}</span>
		</div>
	</div>

	<div class="card-body dashboard-section-body">
		{#if todaysTodos.length > 0}
			<div class="dashboard-todo-list">
				{#each todaysTodos as todo}
					<button class="dashboard-todo-item" type="button" onclick={() => openDetailModal(todo)}>
						<div class="dashboard-todo-item-main">
							<div class="dashboard-todo-item-content">
								<div class="d-flex flex-wrap align-items-center gap-2 mb-2">
									<span class={`badge ${categoryBadgeClasses[todo.category]}`}>{todo.category}</span>
									<span class="badge text-bg-light">{todo.priority}</span>
									{#if todo.estimatedDuration}
										<span class="badge text-bg-light">{todo.estimatedDuration}</span>
									{/if}
								</div>

								<h3 class="h6 mb-1">{todo.title}</h3>

								{#if todo.description}
									<p class="text-secondary small mb-0">{todo.description}</p>
								{/if}
							</div>

							<div class="dashboard-todo-item-meta">
								{#if todo.isRecurringOccurrence}
									<span class="badge text-bg-dark">Wiederholung</span>
								{/if}
							</div>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<EmptyState
				title="Keine Aufgaben für heute"
				description="Du kannst vorausplanen oder den freien Tag geniessen."
			/>
		{/if}
	</div>
</div>

<CalendarTodoDetailModal modalId="dashboardTodoDetailModal" todo={selectedTodo} />
