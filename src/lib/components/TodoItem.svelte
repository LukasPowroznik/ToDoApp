<script>
	import { invalidateAll } from '$app/navigation';
	import {
		categoryBadgeClasses,
		priorityBadgeClasses,
		recurrenceLabels,
		statusLabels
	} from '$lib/data/todoOptions.js';
	import StatusMessage from '$lib/components/StatusMessage.svelte';

	let { todo, today = new Date().toISOString().slice(0, 10), onEdit = () => {} } = $props();
	let isUpdating = $state(false);
	let isDeleting = $state(false);
	let isConfirmingDelete = $state(false);
	let errorMessage = $state('');

	const isCompleted = $derived(todo.status === 'Completed');
	const isOverdue = $derived(todo.status === 'Open' && todo.deadline && todo.deadline < today);

	async function completeTodo(event) {
		event.stopPropagation();
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
				throw new Error('Status konnte nicht geändert werden.');
			}

			await invalidateAll();
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isUpdating = false;
		}
	}

	async function deleteTodo(event) {
		event.stopPropagation();
		isDeleting = true;
		errorMessage = '';

		try {
			const response = await fetch(`/api/todos/${todo.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('To-Do konnte nicht gelöscht werden.');
			}

			await invalidateAll();
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isDeleting = false;
		}
	}

	function requestDeleteConfirmation(event) {
		event.stopPropagation();
		isConfirmingDelete = true;
		errorMessage = '';
	}

	function cancelDeleteConfirmation(event) {
		event.stopPropagation();
		isConfirmingDelete = false;
	}

	function handleEditKeydown(event) {
		if (event.key !== 'Enter' && event.key !== ' ') {
			return;
		}

		event.preventDefault();
		onEdit(todo);
	}
</script>

<article class={`card h-100 ${isCompleted ? 'todo-item-completed' : ''} ${isOverdue ? 'todo-item-overdue' : ''}`}>
	<div
		class="todo-item-edit-button card-body text-start"
		role="button"
		tabindex="0"
		onclick={() => onEdit(todo)}
		onkeydown={handleEditKeydown}
	>
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
			<div class="mt-3">
				<StatusMessage message={errorMessage} compact />
			</div>
		{/if}
	</div>

	<div class="card-footer bg-white border-0 pt-0">
		{#if isConfirmingDelete}
			<div class="delete-confirm-box mt-3">
				<p class="small mb-2">
					Dieses To-Do wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
				</p>
				<div class="d-flex flex-wrap gap-2">
					<button
						class="btn btn-sm btn-danger"
						type="button"
						onclick={deleteTodo}
						disabled={isDeleting}
					>
						{#if isDeleting}
							<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
							Löscht...
						{:else}
							Endgültig löschen
						{/if}
					</button>
					<button
						class="btn btn-sm btn-outline-secondary"
						type="button"
						onclick={cancelDeleteConfirmation}
						disabled={isDeleting}
					>
						Abbrechen
					</button>
				</div>
			</div>
		{:else}
			<div class="d-flex justify-content-between gap-2">
				<div>
					{#if !isCompleted}
						<button
							class="btn btn-sm btn-outline-success mt-3"
							type="button"
							onclick={completeTodo}
							disabled={isUpdating || isDeleting}
						>
							{#if isUpdating}
								<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
								Speichert...
							{:else}
								erledigt
							{/if}
						</button>
					{/if}
				</div>

				<button
					class="btn btn-sm btn-outline-danger mt-3"
					type="button"
					onclick={requestDeleteConfirmation}
					disabled={isUpdating || isDeleting}
				>
					Löschen
				</button>
			</div>
		{/if}
	</div>
</article>
