<script>
	const categories = ['Privat', 'Arbeit', 'Sport', 'Sonstiges'];
	const priorities = ['Low', 'Medium', 'High'];
	const durations = ['30 min', '1 h', '2 h', '4 h', 'Ganztägig'];

	let { modalId = 'addTodoModal' } = $props();
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<form>
				<div class="modal-header">
					<h2 class="modal-title fs-5" id={`${modalId}Label`}>Neues To-Do erfassen</h2>
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
								<option value="daily">daily</option>
								<option value="weekly">weekly</option>
								<option value="monthly">monthly</option>
							</select>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Abbrechen</button>
					<button type="submit" class="btn btn-primary">To-Do speichern</button>
				</div>
			</form>
		</div>
	</div>
</div>
