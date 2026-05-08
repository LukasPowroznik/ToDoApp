<script>
	import { invalidateAll } from '$app/navigation';
	import { tick } from 'svelte';
	import CalendarTodoDetailModal from '$lib/components/CalendarTodoDetailModal.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { categoryBadgeClasses, recurrenceLabels } from '$lib/data/todoOptions.js';
	import { buildTodoOccurrence, isTodoDueOnDate } from '$lib/todoSchedule.js';

	let { weekDays = [], todos = [], today = new Date().toISOString().slice(0, 10) } = $props();
	let updatingOccurrence = $state('');
	let errorMessage = $state('');
	let selectedTodo = $state(null);

	const weekDates = $derived(weekDays.map((day) => day.date));
	const scheduledTodos = $derived(
		todos.flatMap((todo) => {
			if (!todo.deadline) {
				return [];
			}

			return weekDates
				.filter((date) => isTodoDueOnDate(todo, date))
				.map((date) => buildTodoOccurrence(todo, date));
		})
	);
	const getTodosForDate = (date) => scheduledTodos.filter((todo) => todo.calendarDate === date);

	async function completeOccurrence(todo) {
		const occurrenceKey = `${todo.id}-${todo.calendarDate}`;

		updatingOccurrence = occurrenceKey;
		errorMessage = '';

		try {
			const response = await fetch(`/api/todos/${todo.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					status: 'Completed',
					occurrenceDate: todo.calendarDate
				})
			});

			if (!response.ok) {
				throw new Error('Wiederholung konnte nicht abgeschlossen werden.');
			}

			await invalidateAll();
		} catch (error) {
			errorMessage = error.message;
		} finally {
			updatingOccurrence = '';
		}
	}

	async function openDetailModal(todo) {
		selectedTodo = todo;
		await tick();

		const modalElement = document.getElementById('calendarTodoDetailModal');
		const modal = window.bootstrap?.Modal.getOrCreateInstance(modalElement);
		modal?.show();
	}
</script>

{#if scheduledTodos.length > 0}
	<div class="row g-3">
		{#if errorMessage}
			<div class="col-12">
				<div class="alert alert-danger" role="alert">{errorMessage}</div>
			</div>
		{/if}

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
										class={`calendar-todo border rounded p-2 ${todo.isOccurrenceCompleted ? 'todo-item-completed' : ''} ${!todo.isOccurrenceCompleted && todo.status === 'Open' && todo.calendarDate < today ? 'calendar-todo-overdue' : ''}`}
									>
										<button
											class="calendar-todo-detail-button text-start"
											type="button"
											onclick={() => openDetailModal(todo)}
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
											{#if todo.isRecurringOccurrence}
												<span class="badge text-bg-light mt-2 ms-1">Wiederholung</span>
											{/if}
											{#if todo.isOccurrenceCompleted}
												<span class="badge text-bg-success mt-2 ms-1">Erledigt</span>
											{/if}
											{#if !todo.isOccurrenceCompleted && todo.status === 'Open' && todo.calendarDate < today}
												<span class="badge text-bg-danger mt-2 ms-1">Überfällig</span>
											{/if}
										</button>

										{#if todo.recurring && !todo.isOccurrenceCompleted}
											<button
												class="btn btn-sm btn-outline-success d-block mt-3"
												type="button"
												onclick={() => completeOccurrence(todo)}
												disabled={updatingOccurrence === `${todo.id}-${todo.calendarDate}`}
											>
												{updatingOccurrence === `${todo.id}-${todo.calendarDate}` ? 'Speichert...' : 'erledigt'}
											</button>
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

<CalendarTodoDetailModal todo={selectedTodo} />
