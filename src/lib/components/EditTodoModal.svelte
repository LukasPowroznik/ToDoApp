<script>
	import { invalidateAll } from '$app/navigation';
	import StatusMessage from '$lib/components/StatusMessage.svelte';

	const categories = ['Privat', 'Arbeit', 'Sport', 'Sonstiges'];
	const priorities = ['Low', 'Medium', 'High'];
	const durations = ['30 min', '1 h', '2 h', '4 h', 'Ganztägig'];

	let { modalId = 'editTodoModal', todo = null } = $props();
	let isSaving = $state(false);
	let isDeleting = $state(false);
	let isConfirmingDelete = $state(false);
	let errorMessage = $state('');

	const currentTodo = $derived(
		todo ?? {
			title: '',
			description: '',
			category: 'Privat',
			priority: 'Medium',
			scheduledDate: '',
			deadline: '',
			estimatedDuration: '',
			status: 'Open',
			recurring: false,
			recurrence: undefined,
			createdAt: new Date().toISOString()
		}
	);

	async function handleSubmit(event) {
		event.preventDefault();

		if (!todo?.id) {
			errorMessage = 'Kein To-Do zum Bearbeiten ausgewählt.';
			return;
		}

		const form = event.currentTarget;
		const formData = new FormData(form);
		const recurrenceType = formData.get('recurrenceType')?.toString();
		const updatedTodo = {
			title: formData.get('title')?.toString().trim(),
			description: formData.get('description')?.toString().trim(),
			category: formData.get('category')?.toString(),
			priority: formData.get('priority')?.toString(),
			scheduledDate: formData.get('scheduledDate')?.toString(),
			deadline: formData.get('deadline')?.toString(),
			estimatedDuration: formData.get('estimatedDuration')?.toString(),
			status: formData.get('status')?.toString(),
			recurring: Boolean(recurrenceType),
			recurrence: recurrenceType ? { type: recurrenceType } : undefined,
			completedAt: currentTodo.completedAt
		};

		if (!updatedTodo.title) {
			errorMessage = 'Bitte gib einen Titel ein.';
			return;
		}

		isSaving = true;
		errorMessage = '';

		try {
			const response = await fetch(`/api/todos/${todo.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updatedTodo)
			});

			if (!response.ok) {
				throw new Error('Die Aenderungen konnten nicht gespeichert werden.');
			}

			await invalidateAll();

			const modalElement = document.getElementById(modalId);
			const modal = window.bootstrap?.Modal.getInstance(modalElement);
			modal?.hide();
			document.body.classList.remove('modal-open');
			document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isSaving = false;
		}
	}

	async function handleDelete() {
		if (!todo?.id) {
			errorMessage = 'Kein To-Do zum Löschen ausgewählt.';
			return;
		}

		isDeleting = true;
		errorMessage = '';

		try {
			const response = await fetch(`/api/todos/${todo.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Das To-Do konnte nicht gelöscht werden.');
			}

			await invalidateAll();

			const modalElement = document.getElementById(modalId);
			const modal = window.bootstrap?.Modal.getInstance(modalElement);
			modal?.hide();
			document.body.classList.remove('modal-open');
			document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isDeleting = false;
		}
	}

	function requestDeleteConfirmation() {
		isConfirmingDelete = true;
		errorMessage = '';
	}

	function cancelDeleteConfirmation() {
		isConfirmingDelete = false;
	}
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<form onsubmit={handleSubmit}>
				<div class="modal-header">
					<h2 class="modal-title fs-5" id={`${modalId}Label`}>To-Do bearbeiten</h2>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Schliessen"></button>
				</div>

				<div class="modal-body">
					<StatusMessage message={errorMessage} />

					<div class="row g-3">
						<div class="col-12">
							<label class="form-label" for={`${modalId}-title`}>Titel</label>
							<input
								class="form-control"
								id={`${modalId}-title`}
								name="title"
								type="text"
								value={currentTodo.title}
								required
							/>
						</div>

						<div class="col-12">
							<label class="form-label" for={`${modalId}-description`}>Beschreibung</label>
							<textarea
								class="form-control"
								id={`${modalId}-description`}
								name="description"
								rows="3"
								value={currentTodo.description}
							></textarea>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-category`}>Kategorie</label>
							<select class="form-select" id={`${modalId}-category`} name="category" value={currentTodo.category}>
								{#each categories as category}
									<option value={category}>{category}</option>
								{/each}
							</select>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-priority`}>Priorität</label>
							<select class="form-select" id={`${modalId}-priority`} name="priority" value={currentTodo.priority}>
								{#each priorities as priority}
									<option value={priority}>{priority}</option>
								{/each}
							</select>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-scheduled-date`}>Zu erledigen am</label>
							<input
								class="form-control"
								id={`${modalId}-scheduled-date`}
								name="scheduledDate"
								type="date"
								value={currentTodo.scheduledDate ?? ''}
							/>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-deadline`}>Deadline</label>
							<input
								class="form-control"
								id={`${modalId}-deadline`}
								name="deadline"
								type="date"
								value={currentTodo.deadline ?? ''}
							/>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-duration`}>Geschätzte Dauer</label>
							<select
								class="form-select"
								id={`${modalId}-duration`}
								name="estimatedDuration"
								value={currentTodo.estimatedDuration ?? ''}
							>
								<option value="">keine Angabe</option>
								{#each durations as duration}
									<option value={duration}>{duration}</option>
								{/each}
							</select>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-status`}>Status</label>
							<select class="form-select" id={`${modalId}-status`} name="status" value={currentTodo.status}>
								<option value="Open">offen</option>
								<option value="Completed">erledigt</option>
							</select>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-recurrence-type`}>Wiederholung</label>
							<select
								class="form-select"
								id={`${modalId}-recurrence-type`}
								name="recurrenceType"
								value={currentTodo.recurrence?.type ?? ''}
							>
								<option value="">keine</option>
								<option value="daily">täglich</option>
								<option value="weekly">wöchentlich</option>
								<option value="monthly">monatlich</option>
							</select>
						</div>
					</div>
				</div>

				<div class="modal-footer justify-content-between">
					<div>
						{#if isConfirmingDelete}
							<div class="delete-confirm-box">
								<p class="small mb-2">
									Dieses To-Do wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
								</p>
								<div class="d-flex flex-wrap gap-2">
									<button
										type="button"
										class="btn btn-sm btn-danger"
										onclick={handleDelete}
										disabled={isSaving || isDeleting}
									>
										{#if isDeleting}
											<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
											Löscht...
										{:else}
											Endgültig löschen
										{/if}
									</button>
									<button
										type="button"
										class="btn btn-sm btn-outline-secondary"
										onclick={cancelDeleteConfirmation}
										disabled={isSaving || isDeleting}
									>
										Abbrechen
									</button>
								</div>
							</div>
						{:else}
							<button
								type="button"
								class="btn btn-outline-danger"
								onclick={requestDeleteConfirmation}
								disabled={isSaving || isDeleting}
							>
								Löschen
							</button>
						{/if}
					</div>

					<div class="d-flex gap-2">
						<button type="submit" class="btn btn-primary" disabled={isSaving || isDeleting}>
							{#if isSaving}
								<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
								Speichert...
							{:else}
								Speichern
							{/if}
						</button>
						<button
							type="button"
							class="btn btn-outline-secondary"
							data-bs-dismiss="modal"
							disabled={isSaving || isDeleting}
						>
							Abbrechen
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
