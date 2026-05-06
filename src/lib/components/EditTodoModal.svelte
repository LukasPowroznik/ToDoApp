<script>
	const categories = ['Privat', 'Arbeit', 'Sport', 'Sonstiges'];
	const priorities = ['hoch', 'mittel', 'niedrig'];

	let { modalId = 'editTodoModal', todo = null } = $props();

	const currentTodo = $derived(
		todo ?? {
			title: '',
			description: '',
			category: 'Privat',
			priority: 'mittel',
			dueDate: '',
			estimatedDuration: '',
			status: 'offen',
			recurrence: ''
		}
	);
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<form>
				<div class="modal-header">
					<h2 class="modal-title fs-5" id={`${modalId}Label`}>To-Do bearbeiten</h2>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Schließen"></button>
				</div>

				<div class="modal-body">
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
							<label class="form-label" for={`${modalId}-due-date`}>Deadline</label>
							<input
								class="form-control"
								id={`${modalId}-due-date`}
								name="dueDate"
								type="date"
								value={currentTodo.dueDate ?? ''}
							/>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-duration`}>Geschätzte Dauer</label>
							<input
								class="form-control"
								id={`${modalId}-duration`}
								name="estimatedDuration"
								type="text"
								value={currentTodo.estimatedDuration}
							/>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-status`}>Status</label>
							<select class="form-select" id={`${modalId}-status`} name="status" value={currentTodo.status}>
								<option value="offen">offen</option>
								<option value="erledigt">erledigt</option>
							</select>
						</div>

						<div class="col-md-6">
							<label class="form-label" for={`${modalId}-recurrence`}>Wiederholung</label>
							<select
								class="form-select"
								id={`${modalId}-recurrence`}
								name="recurrence"
								value={currentTodo.recurrence ?? ''}
							>
								<option value="">keine</option>
								<option value="täglich">täglich</option>
								<option value="wöchentlich">wöchentlich</option>
								<option value="monatlich">monatlich</option>
							</select>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Abbrechen</button>
					<button type="submit" class="btn btn-primary">Änderungen speichern</button>
				</div>
			</form>
		</div>
	</div>
</div>
