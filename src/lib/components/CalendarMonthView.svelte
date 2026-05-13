<script>
	import { tick } from 'svelte';
	import { showModal } from '$lib/bootstrapModal.js';
	import CalendarTodoDetailModal from '$lib/components/CalendarTodoDetailModal.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { categoryBadgeClasses } from '$lib/data/todoOptions.js';
	import { buildTodoOccurrence, isTodoDueOnDate } from '$lib/todoSchedule.js';

	let { monthDays = [], todos = [], today = new Date().toISOString().slice(0, 10) } = $props();
	let selectedTodo = $state(null);

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

	async function openDetailModal(todo) {
		selectedTodo = todo;
		await tick();

		await showModal('calendarTodoDetailModal');
	}
</script>

{#if scheduledTodos.length > 0}
	<section class="calendar-month-grid" aria-label="Monatsübersicht">
		{#each ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as weekday}
			<div class="calendar-month-weekday">{weekday}</div>
		{/each}

		{#each monthDays as day}
			<div
				class={`calendar-month-day ${day.isCurrentMonth ? '' : 'calendar-month-day-muted'} ${day.isToday ? 'calendar-month-day-today' : ''}`}
			>
				<div class="calendar-month-day-number">{day.day}</div>

				{#if getTodosForDate(day.date).length > 0}
					<div class="calendar-month-todos">
						{#each getTodosForDate(day.date) as todo}
							<button
								class={`calendar-month-todo ${todo.isOccurrenceCompleted ? 'todo-item-completed' : ''} ${!todo.isOccurrenceCompleted && todo.status === 'Open' && todo.calendarDate < today ? 'calendar-todo-overdue' : ''}`}
								type="button"
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
