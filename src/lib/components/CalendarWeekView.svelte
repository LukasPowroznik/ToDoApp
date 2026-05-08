<script>
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { categoryBadgeClasses, recurrenceLabels } from '$lib/data/todoOptions.js';

	let { weekDays = [], todos = [], today = new Date().toISOString().slice(0, 10) } = $props();

	const weekDates = $derived(weekDays.map((day) => day.date));
	const scheduledTodos = $derived(todos.filter((todo) => todo.deadline && weekDates.includes(todo.deadline)));
	const getTodosForDate = (date) => scheduledTodos.filter((todo) => todo.deadline === date);
</script>

{#if scheduledTodos.length > 0}
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
									<article
										class={`calendar-todo border rounded p-2 ${todo.status === 'Completed' ? 'todo-item-completed' : ''} ${todo.status === 'Open' && todo.deadline < today ? 'calendar-todo-overdue' : ''}`}
									>
										<span class="d-block fw-semibold">{todo.title}</span>
										<span class={`badge mt-2 ${categoryBadgeClasses[todo.category]}`}>
											{todo.category}
										</span>
										{#if todo.recurring && todo.recurrence}
											<span class="badge text-bg-dark mt-2 ms-1">
												{recurrenceLabels[todo.recurrence.type]}
											</span>
										{/if}
										{#if todo.status === 'Open' && todo.deadline < today}
											<span class="badge text-bg-danger mt-2 ms-1">Überfällig</span>
										{/if}
									</article>
								{/each}
							</div>
						{:else}
							<EmptyState
								title="Keine Termine"
								description="Für diesen Tag sind keine Aufgaben geplant."
								compact
							/>
						{/if}
					</div>
				</div>
			</section>
		{/each}
	</div>
{:else}
	<div class="card dashboard-card">
		<div class="card-body">
			<EmptyState
				title="Keine terminierten Aufgaben"
				description="Aufgaben mit Deadline erscheinen später automatisch in der Wochenansicht."
			/>
		</div>
	</div>
{/if}
