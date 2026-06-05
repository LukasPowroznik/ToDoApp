<script>
	import { invalidateAll } from '$app/navigation';
	import { tick } from 'svelte';
	import { showAppStatusMessage } from '$lib/appStatusMessage.js';
	import { showModal } from '$lib/bootstrapModal.js';
	import CalendarTodoDetailModal from '$lib/components/CalendarTodoDetailModal.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import StatusMessage from '$lib/components/StatusMessage.svelte';
	import { categoryBadgeClasses, recurrenceLabels } from '$lib/data/todoOptions.js';
	import { buildTodoOccurrence, isTodoDueOnDate } from '$lib/todoSchedule.js';

	let { weekDays = [], todos = [], today = new Date().toISOString().slice(0, 10) } = $props();
	let updatingOccurrence = $state('');
	let errorMessage = $state('');
	let selectedTodo = $state(null);
	let draggedTodo = $state(null);
	let dragOverDate = $state('');

	const weekDates = $derived(weekDays.map((day) => day.date));
	const scheduledTodos = $derived(
		todos.flatMap((todo) => {
			if (!todo.scheduledDate) {
				return [];
			}

			return weekDates
				.filter((date) => isTodoDueOnDate(todo, date))
				.map((date) => buildTodoOccurrence(todo, date));
		})
	);
	const getTodosForDate = (date) => scheduledTodos.filter((todo) => todo.calendarDate === date);
	const getDurationClass = (duration) =>
		({
			'30 min': 'calendar-todo-duration-30',
			'1 h': 'calendar-todo-duration-60',
			'2 h': 'calendar-todo-duration-120',
			'4 h': 'calendar-todo-duration-240',
			Ganztägig: 'calendar-todo-duration-day'
		})[duration] ?? 'calendar-todo-duration-30';

	const buildUpdatePayload = (todo, scheduledDate) => ({
		title: todo.title,
		description: todo.description ?? '',
		category: todo.category ?? 'Privat',
		priority: todo.priority ?? 'Medium',
		scheduledDate,
		deadline: todo.deadline ?? '',
		estimatedDuration: todo.estimatedDuration ?? '',
		status: todo.status ?? 'Open',
		recurring: Boolean(todo.recurring),
		recurrence: todo.recurrence,
		completedAt: todo.completedAt
	});

	function handleDragStart(event, todo) {
		if (todo.isOccurrenceCompleted) {
			event.preventDefault();
			return;
		}

		draggedTodo = todo;
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/plain', todo.id);
	}

	function handleDragOver(event, date) {
		if (!draggedTodo || draggedTodo.calendarDate === date) {
			return;
		}

		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
		dragOverDate = date;
	}

	function handleDragEnd() {
		draggedTodo = null;
		dragOverDate = '';
	}

	async function moveTodoToDate(date) {
		if (!draggedTodo || draggedTodo.calendarDate === date) {
			handleDragEnd();
			return;
		}

		const todoToMove = draggedTodo;
		handleDragEnd();
		errorMessage = '';

		try {
			const response = await fetch(`/api/todos/${todoToMove.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(buildUpdatePayload(todoToMove, date))
			});

			if (!response.ok) {
				const body = await response.json();
				throw new Error(body.message ?? 'To-Do konnte nicht verschoben werden.');
			}

			await invalidateAll();
			showAppStatusMessage('To-Do wurde verschoben.');
		} catch (error) {
			errorMessage = error.message;
		}
	}

	async function completeCalendarTodo(todo) {
		const occurrenceKey = `${todo.id}-${todo.calendarDate}`;
		const payload = todo.recurring
			? {
					status: 'Completed',
					occurrenceDate: todo.calendarDate
				}
			: {
					status: 'Completed'
				};

		updatingOccurrence = occurrenceKey;
		errorMessage = '';

		try {
			const response = await fetch(`/api/todos/${todo.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				throw new Error('To-Do konnte nicht abgeschlossen werden.');
			}

			await invalidateAll();
			showAppStatusMessage('To-Do wurde als erledigt markiert.');
		} catch (error) {
			errorMessage = error.message;
		} finally {
			updatingOccurrence = '';
		}
	}

	async function openDetailModal(todo) {
		selectedTodo = todo;
		await tick();

		await showModal('calendarTodoDetailModal');
	}

	function handleCompleteClick(event, todo) {
		event.stopPropagation();
		completeCalendarTodo(todo);
	}
</script>

{#if scheduledTodos.length > 0}
	<div class="row g-3">
		{#if errorMessage}
			<div class="col-12">
				<StatusMessage message={errorMessage} />
			</div>
		{/if}

		{#each weekDays as day}
			<section class="col-md-6 col-xl">
				<div
					class={`card dashboard-card calendar-day h-100 ${dragOverDate === day.date ? 'calendar-drop-target-active' : ''}`}
					role="list"
					aria-label={`To-Dos am ${day.date}`}
					ondragover={(event) => handleDragOver(event, day.date)}
					ondragleave={() => {
						if (dragOverDate === day.date) dragOverDate = '';
					}}
					ondrop={() => moveTodoToDate(day.date)}
				>
					<div class="card-body">
						<h2 class="h6 mb-1">{day.label}</h2>
						<p class="text-secondary small mb-3">{day.date}</p>

						{#if getTodosForDate(day.date).length > 0}
							<div class="d-grid gap-2">
								{#each getTodosForDate(day.date) as todo}
									<div
										class={`calendar-todo border rounded p-2 ${getDurationClass(todo.estimatedDuration)} ${todo.isOccurrenceCompleted ? 'todo-item-completed' : ''} ${!todo.isOccurrenceCompleted && todo.status === 'Open' && todo.calendarDate < today ? 'calendar-todo-overdue' : ''}`}
										role="button"
										tabindex="0"
										aria-label={`Details zu ${todo.title} öffnen`}
										draggable={!todo.isOccurrenceCompleted}
										ondragstart={(event) => handleDragStart(event, todo)}
										ondragend={handleDragEnd}
										onclick={() => openDetailModal(todo)}
										onkeydown={(event) => {
											if (event.key === 'Enter' || event.key === ' ') {
												event.preventDefault();
												openDetailModal(todo);
											}
										}}
									>
										<div class="calendar-todo-detail-button text-start">
											<span class="d-block fw-semibold">{todo.title}</span>
											<span class={`badge mt-2 ${categoryBadgeClasses[todo.category]}`}>
												{todo.category}
											</span>
											{#if todo.estimatedDuration}
												<span class="badge badge-meta mt-2 ms-1">{todo.estimatedDuration}</span>
											{/if}
											{#if todo.recurring && todo.recurrence}
												<span class="badge badge-meta-strong mt-2 ms-1">
													{recurrenceLabels[todo.recurrence.type]}
												</span>
											{/if}
											{#if todo.isRecurringOccurrence}
												<span class="badge badge-meta mt-2 ms-1">Wiederholung</span>
											{/if}
											{#if todo.isOccurrenceCompleted}
												<span class="badge badge-status badge-status-completed mt-2 ms-1">Erledigt</span>
											{/if}
											{#if !todo.isOccurrenceCompleted && todo.status === 'Open' && todo.calendarDate < today}
												<span class="badge badge-status badge-status-overdue mt-2 ms-1">Überfällig</span>
											{/if}
										</div>

										{#if !todo.isOccurrenceCompleted}
											<button
												class="btn btn-sm btn-outline-success btn-with-icon d-flex mt-3"
												type="button"
												onclick={(event) => handleCompleteClick(event, todo)}
												disabled={updatingOccurrence === `${todo.id}-${todo.calendarDate}`}
											>
												{#if updatingOccurrence === `${todo.id}-${todo.calendarDate}`}
													<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
													Speichert...
												{:else}
													<span class="btn-icon" aria-hidden="true">✓</span>
													Erledigt
												{/if}
											</button>
										{/if}
									</div>
								{/each}
							</div>
						{:else}
							<EmptyState
								title="Keine Termine"
								description="Für diesen Tag sind keine To-Dos geplant."
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
				title="Keine terminierten To-Dos"
				description="To-Dos mit geplantem Termin erscheinen später automatisch in der Wochenansicht."
			/>
		</div>
	</div>
{/if}

<CalendarTodoDetailModal todo={selectedTodo} />
