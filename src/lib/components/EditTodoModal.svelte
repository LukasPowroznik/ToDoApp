<script>
	import { invalidateAll } from '$app/navigation';

	const categories = ['Privat', 'Arbeit', 'Sport', 'Sonstiges'];
	const priorities = ['Low', 'Medium', 'High'];
	const durations = ['30 min', '1 h', '2 h', '4 h', 'Ganztägig'];

	let { modalId = 'editTodoModal', todo = null } = $props();
	let isSaving = $state(false);
	let isDeleting = $state(false);
	let errorMessage = $state('');

	const currentTodo = $derived(
		todo ?? {
			title: '',
			description: '',
			category: 'Privat',
			priority: 'Medium',
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
			errorMessage = 'Kein To-Do zum Bearbeiten ausgewaehlt.';
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
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isSaving = false;
		}
	}

	async function handleDelete() {
		if (!todo?.id) {
			errorMessage = 'Kein To-Do zum Loeschen ausgewaehlt.';
			return;
		}

		isDeleting = true;
		errorMessage = '';

		try {
			const response = await fetch(`/api/todos/${todo.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Das To-Do konnte nicht geloescht werden.');
			}

			await invalidateAll();

			const modalElement = document.getElementById(modalId);
			const modal = window.bootstrap?.Modal.getInstance(modalElement);
			modal?.hide();
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isDeleting = false;
		}
	}
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<form onsubmit={handleSubmit}>
				<div class="modal-header">
					<h2 class="modal-title fs-5" id={`${modalId}Label`}>To-Do bearbeiten</h2>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Schließen"></button>
				</div>

				<div class="modal-body">
					{#if errorMessage}
						<div class="alert alert-danger" role="alert">{errorMessage}</div>
					{/if}

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
								<option value="Open">Open</option>
								<option value="Completed">Completed</option>
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
								<option value="daily">daily</option>
								<option value="weekly">weekly</option>
								<option value="monthly">monthly</option>
							</select>
						</div>
					</div>
				</div>

				<div class="modal-footer justify-content-between">
					<button
						type="button"
						class="btn btn-outline-danger"
						onclick={handleDelete}
						disabled={isSaving || isDeleting}
					>
						{isDeleting ? 'Löscht...' : 'Löschen'}
					</button>

					<div class="d-flex gap-2">
						<button type="submit" class="btn btn-primary" disabled={isSaving || isDeleting}>
							{isSaving ? 'Speichert...' : 'Speichern'}
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
