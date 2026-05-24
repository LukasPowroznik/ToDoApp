<script>
	import { invalidateAll } from '$app/navigation';
	import { tick } from 'svelte';
	import { showModal } from '$lib/bootstrapModal.js';
	import CalendarTodoDetailModal from '$lib/components/CalendarTodoDetailModal.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import StatusMessage from '$lib/components/StatusMessage.svelte';
	import { categoryBadgeClasses } from '$lib/data/todoOptions.js';
	import { buildTodoOccurrence, isTodoDueOnDate } from '$lib/todoSchedule.js';

	let { monthDays = [], todos = [], today = new Date().toISOString().slice(0, 10) } = $props();
	let selectedTodo = $state(null);
	let draggedTodo = $state(null);
	let dragOverDate = $state('');
	let errorMessage = $state('');

	const monthDates = $derived(monthDays.map((day) => day.date));
	const scheduledTodos = $derived(
		todos.flatMap((todo) => {
			if (!todo.scheduledDate) {
				return [];
			}

			return monthDates
				.filter((date) => isTodoDueOnDate(todo, date))
				.map((date) => buildTodoOccurrence(todo, date));
		})
	);
	const getTodosForDate = (date) => scheduledTodos.filter((todo) => todo.calendarDate === date);

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
				throw new Error(body.message ?? 'Aufgabe konnte nicht verschoben werden.');
			}

			await invalidateAll();
		} catch (error) {
			errorMessage = error.message;
		}
	}

	async function openDetailModal(todo) {
		selectedTodo = todo;
		await tick();

		await showModal('calendarTodoDetailModal');
	}
</script>

{#if scheduledTodos.length > 0}
	{#if errorMessage}
		<StatusMessage message={errorMessage} />
	{/if}

	<section class="calendar-month-grid" aria-label="Monatsübersicht">
		{#each ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as weekday}
			<div class="calendar-month-weekday">{weekday}</div>
		{/each}

		{#each monthDays as day}
			<div
				class={`calendar-month-day ${day.isCurrentMonth ? '' : 'calendar-month-day-muted'} ${day.isToday ? 'calendar-month-day-today' : ''} ${dragOverDate === day.date ? 'calendar-drop-target-active' : ''}`}
				role="list"
				aria-label={`Aufgaben am ${day.date}`}
				ondragover={(event) => handleDragOver(event, day.date)}
				ondragleave={() => {
					if (dragOverDate === day.date) dragOverDate = '';
				}}
				ondrop={() => moveTodoToDate(day.date)}
			>
				<div class="calendar-month-day-number">{day.day}</div>

				{#if getTodosForDate(day.date).length > 0}
					<div class="calendar-month-todos">
						{#each getTodosForDate(day.date) as todo}
							<button
								class={`calendar-month-todo ${todo.isOccurrenceCompleted ? 'todo-item-completed' : ''} ${!todo.isOccurrenceCompleted && todo.status === 'Open' && todo.calendarDate < today ? 'calendar-todo-overdue' : ''}`}
								type="button"
								draggable={!todo.isOccurrenceCompleted}
								ondragstart={(event) => handleDragStart(event, todo)}
								ondragend={handleDragEnd}
								onclick={() => openDetailModal(todo)}
							>
								<span class={`calendar-month-todo-marker ${categoryBadgeClasses[todo.category]}`}></span>
								<span class="calendar-month-todo-title">{todo.title}</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</section>
{:else}
	<div class="card dashboard-card">
		<div class="card-body">
			<EmptyState
				title="Keine terminierten Aufgaben"
				description="Aufgaben mit geplantem Termin erscheinen später automatisch in der Monatsübersicht."
			/>
		</div>
	</div>
{/if}

<CalendarTodoDetailModal todo={selectedTodo} />
