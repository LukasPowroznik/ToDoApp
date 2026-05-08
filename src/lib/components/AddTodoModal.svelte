<script>
	import { invalidateAll } from '$app/navigation';

	const categories = ['Privat', 'Arbeit', 'Sport', 'Sonstiges'];
	const priorities = ['Low', 'Medium', 'High'];
	const durations = ['30 min', '1 h', '2 h', '4 h', 'Ganztägig'];

	let { modalId = 'addTodoModal' } = $props();
	let isSaving = $state(false);
	let errorMessage = $state('');

	async function handleSubmit(event) {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const recurrenceType = formData.get('recurrenceType')?.toString();
		const todo = {
			title: formData.get('title')?.toString().trim(),
			description: formData.get('description')?.toString().trim(),
			category: formData.get('category')?.toString(),
			priority: formData.get('priority')?.toString(),
			deadline: formData.get('deadline')?.toString(),
			estimatedDuration: formData.get('estimatedDuration')?.toString(),
			status: formData.get('status')?.toString(),
			recurring: Boolean(recurrenceType),
			recurrence: recurrenceType ? { type: recurrenceType } : undefined
		};

		if (!todo.title) {
			errorMessage = 'Bitte gib einen Titel ein.';
			return;
		}

		isSaving = true;
		errorMessage = '';

		try {
			const response = await fetch('/api/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(todo)
			});

			if (!response.ok) {
				throw new Error('Das To-Do konnte nicht gespeichert werden.');
			}

			form.reset();
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
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<form onsubmit={handleSubmit}>
				<div class="modal-header">
					<h2 class="modal-title fs-5" id={`${modalId}Label`}>Neues To-Do erfassen</h2>
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
								placeholder="Zum Beispiel: Projektplan überarbeiten"
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
								placeholder="Kurze Notiz zur Aufgabe"
							></textarea>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-category`}>Kategorie</label>
							<select class="form-select" id={`${modalId}-category`} name="category">
								{#each categories as category}
									<option value={category}>{category}</option>
								{/each}
							</select>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-priority`}>Priorität</label>
							<select class="form-select" id={`${modalId}-priority`} name="priority">
								{#each priorities as priority}
									<option value={priority}>{priority}</option>
								{/each}
							</select>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-deadline`}>Deadline</label>
							<input class="form-control" id={`${modalId}-deadline`} name="deadline" type="date" />
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-duration`}>Geschätzte Dauer</label>
							<select class="form-select" id={`${modalId}-duration`} name="estimatedDuration">
								<option value="">keine Angabe</option>
								{#each durations as duration}
									<option value={duration}>{duration}</option>
								{/each}
							</select>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-status`}>Status</label>
							<select class="form-select" id={`${modalId}-status`} name="status">
								<option value="Open">Open</option>
								<option value="Completed">Completed</option>
							</select>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-recurrence-type`}>Wiederholung</label>
							<select class="form-select" id={`${modalId}-recurrence-type`} name="recurrenceType">
								<option value="">keine</option>
								<option value="daily">täglich</option>
								<option value="weekly">wöchentlich</option>
								<option value="monthly">monatlich</option>
							</select>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" disabled={isSaving}>
						Abbrechen
					</button>
					<button type="submit" class="btn btn-primary" disabled={isSaving}>
						{isSaving ? 'Speichert...' : 'To-Do speichern'}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
