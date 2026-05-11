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

<article
	class={`card dashboard-card todo-card h-100 todo-card-priority-${todo.priority?.toLowerCase()} ${isCompleted ? 'todo-item-completed' : ''} ${isOverdue ? 'todo-item-overdue' : ''}`}
>
	<div
		class="todo-item-edit-button card-body text-start"
		role="button"
		tabindex="0"
		onclick={() => onEdit(todo)}
		onkeydown={handleEditKeydown}
	>
		{#if isOverdue}
			<div class="badge badge-status badge-status-overdue mb-3">Überfällig</div>
		{/if}

		<div class="todo-card-header">
			<div class="todo-card-title-group">
				<h3 class={`todo-card-title ${isCompleted ? 'todo-title-completed' : ''}`}>
					{todo.title}
				</h3>
				{#if todo.description}
					<p class="todo-card-description">{todo.description}</p>
				{/if}
			</div>
			<span class={`badge todo-card-status badge-status ${isCompleted ? 'badge-status-completed' : 'badge-status-open'}`}>
				{statusLabels[todo.status] ?? todo.status}
			</span>
		</div>

		<div class="todo-card-meta">
			<span class={`badge ${categoryBadgeClasses[todo.category]}`}>{todo.category}</span>
			<span class={`badge ${priorityBadgeClasses[todo.priority]}`}>{todo.priority}</span>
			<span class="badge badge-meta">Termin {todo.scheduledDate ?? 'offen'}</span>
			<span class="badge badge-meta">Deadline {todo.deadline ?? 'offen'}</span>
			{#if todo.estimatedDuration}
				<span class="badge badge-meta">{todo.estimatedDuration}</span>
			{/if}
			{#if todo.recurring && todo.recurrence}
				<span class="badge badge-meta-strong">{recurrenceLabels[todo.recurrence.type]}</span>
			{/if}
		</div>

		{#if errorMessage}
			<div class="mt-3">
				<StatusMessage message={errorMessage} compact />
			</div>
		{/if}
	</div>

	<div class="card-footer todo-card-footer">
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
							class="btn btn-sm btn-outline-success"
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
					class="btn btn-sm btn-outline-danger"
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
