<script>
	import { tick } from 'svelte';
	import CalendarTodoDetailModal from '$lib/components/CalendarTodoDetailModal.svelte';
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

		const modalElement = document.getElementById('dashboardTodoDetailModal');
		const modal = window.bootstrap?.Modal.getOrCreateInstance(modalElement);
		modal?.show();
	}
</script>

<div class="card dashboard-card h-100">
	<div class="card-body">
		<div class="d-flex justify-content-between align-items-start gap-3 mb-3">
			<div>
				<h2 class="h5 mb-1">Heute terminierte To-Dos</h2>
				<p class="text-secondary mb-0">Aufgaben mit geplantem Termin {readableDate}.</p>
			</div>
			<span class="badge text-bg-primary">{todaysTodos.length}</span>
		</div>

		{#if todaysTodos.length > 0}
			<div class="list-group list-group-flush">
				{#each todaysTodos as todo}
					<button class="list-group-item list-group-item-action px-0" type="button" onclick={() => openDetailModal(todo)}>
						<div class="d-flex justify-content-between gap-3">
							<div>
								<h3 class="h6 mb-1">{todo.title}</h3>
								<p class="text-secondary small mb-2">{todo.description}</p>
								<span class={`badge ${categoryBadgeClasses[todo.category]}`}>{todo.category}</span>
								{#if todo.isRecurringOccurrence}
									<span class="badge text-bg-light ms-1">Wiederholung</span>
								{/if}
							</div>
							<span class="badge text-bg-light align-self-start">{todo.priority}</span>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<p class="text-secondary mb-0">
				Keine Aufgaben für heute. Du kannst vorausplanen oder den freien Tag geniessen.
			</p>
		{/if}
	</div>
</div>

<CalendarTodoDetailModal modalId="dashboardTodoDetailModal" todo={selectedTodo} />
