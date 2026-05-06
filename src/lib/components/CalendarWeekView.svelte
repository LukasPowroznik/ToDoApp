<script>
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { categoryBadgeClasses } from '$lib/data/demoTodos.js';

	let { weekDays = [], todos = [] } = $props();

	const scheduledTodos = $derived(todos.filter((todo) => todo.dueDate));
	const getTodosForDate = (date) => scheduledTodos.filter((todo) => todo.dueDate === date);
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
									<button
										class={`btn text-start border bg-white ${todo.completed ? 'todo-item-completed' : ''}`}
										type="button"
									>
										<span class="d-block fw-semibold">{todo.title}</span>
										<span class={`badge mt-2 ${categoryBadgeClasses[todo.category]}`}>
											{todo.category}
										</span>
										{#if todo.isRecurring}
											<span class="badge text-bg-dark mt-2 ms-1">{todo.recurrence}</span>
										{/if}
									</button>
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
