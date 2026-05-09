<script>
	import { invalidateAll } from '$app/navigation';
	import {
		categoryBadgeClasses,
		priorityBadgeClasses,
		recurrenceLabels,
		statusLabels
	} from '$lib/data/todoOptions.js';

	let { todo, today = new Date().toISOString().slice(0, 10), onEdit = () => {} } = $props();
	let isUpdating = $state(false);
	let isDeleting = $state(false);
	let errorMessage = $state('');

	const isCompleted = $derived(todo.status === 'Completed');
	const isOverdue = $derived(todo.status === 'Open' && todo.deadline && todo.deadline < today);

	async function completeTodo() {
		isUpdating = true;
		errorMessage = '';

		try {
			const response = await fetch(`/api/todos/${todo.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ status: 'Completed' })
			});

			if (!response.ok) {
				throw new Error('Status konnte nicht geaendert werden.');
			}

			await invalidateAll();
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isUpdating = false;
		}
	}

	async function deleteTodo() {
		isDeleting = true;
		errorMessage = '';

		try {
			const response = await fetch(`/api/todos/${todo.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('To-Do konnte nicht geloescht werden.');
			}

			await invalidateAll();
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isDeleting = false;
		}
	}
</script>

<article class={`card h-100 ${isCompleted ? 'todo-item-completed' : ''} ${isOverdue ? 'todo-item-overdue' : ''}`}>
	<button class="todo-item-edit-button card-body text-start" type="button" onclick={() => onEdit(todo)}>
		{#if isOverdue}
			<div class="badge text-bg-danger mb-3">Überfällig</div>
		{/if}

		<div class="d-flex justify-content-between gap-3 mb-2">
			<h3 class={`h6 mb-0 ${isCompleted ? 'todo-title-completed' : ''}`}>
				{todo.title}
			</h3>
			<span class={`badge ${isCompleted ? 'text-bg-success' : 'text-bg-light'}`}>
				{statusLabels[todo.status] ?? todo.status}
			</span>
		</div>
		<p class="text-secondary small">{todo.description}</p>
		<div class="d-flex flex-wrap gap-2">
			<span class={`badge ${categoryBadgeClasses[todo.category]}`}>{todo.category}</span>
			<span class={`badge ${priorityBadgeClasses[todo.priority]}`}>{todo.priority}</span>
			<span class="badge text-bg-light">Termin: {todo.scheduledDate ?? 'offen'}</span>
			<span class="badge text-bg-light">Deadline: {todo.deadline ?? 'offen'}</span>
			<span class="badge text-bg-light">{todo.estimatedDuration}</span>
			{#if todo.recurring && todo.recurrence}
				<span class="badge text-bg-dark">{recurrenceLabels[todo.recurrence.type]}</span>
			{/if}
		</div>

		{#if errorMessage}
			<p class="text-danger small mt-3 mb-0">{errorMessage}</p>
		{/if}
	</button>

	<div class="card-footer bg-white border-0 pt-0 d-flex justify-content-between gap-2">
		<div>
			{#if !isCompleted}
				<button
					class="btn btn-sm btn-outline-success mt-3"
					type="button"
					onclick={completeTodo}
					disabled={isUpdating || isDeleting}
				>
					{isUpdating ? 'Speichert...' : 'erledigt'}
				</button>
			{/if}
		</div>

		<button
			class="btn btn-sm btn-outline-danger mt-3"
			type="button"
			onclick={deleteTodo}
			disabled={isUpdating || isDeleting}
		>
			{isDeleting ? 'Löscht...' : 'Löschen'}
		</button>
	</div>
</article>
