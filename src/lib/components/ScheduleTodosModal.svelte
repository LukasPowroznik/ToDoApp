<script>
	import { invalidateAll } from '$app/navigation';
	import { hideModal } from '$lib/bootstrapModal.js';
	import StatusMessage from '$lib/components/StatusMessage.svelte';

	let { modalId = 'scheduleTodosModal', todos = [] } = $props();
	let isSaving = $state(false);
	let errorMessage = $state('');

	const unscheduledOpenTodos = $derived(
		todos.filter((todo) => todo.status === 'Open' && !todo.scheduledDate)
	);

	async function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const updates = unscheduledOpenTodos
			.map((todo) => ({
				todo,
				scheduledDate: formData.get(`scheduledDate-${todo.id}`)?.toString() ?? ''
			}))
			.filter(({ todo, scheduledDate }) => scheduledDate !== (todo.scheduledDate ?? ''));

		if (updates.length === 0) {
			errorMessage = 'Bitte wähle mindestens einen neuen Termin aus.';
			return;
		}

		isSaving = true;
		errorMessage = '';

		try {
			await Promise.all(
				updates.map(({ todo, scheduledDate }) =>
					fetch(`/api/todos/${todo.id}`, {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							...todo,
							scheduledDate
						})
					}).then((response) => {
						if (!response.ok) {
							throw new Error('Termine konnten nicht gespeichert werden.');
						}
					})
				)
			);

			await invalidateAll();

			await hideModal(modalId);
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isSaving = false;
		}
	}
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<form onsubmit={handleSubmit}>
				<div class="modal-header">
					<h2 class="modal-title fs-5" id={`${modalId}Label`}>To-Dos terminieren</h2>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Schliessen"></button>
				</div>

				<div class="modal-body">
					<StatusMessage message={errorMessage} />

					{#if unscheduledOpenTodos.length > 0}
						<p class="text-secondary">
							Plane offene Aufgaben ohne Bearbeitungsdatum. Die Deadline bleibt dabei unverändert.
						</p>

						<div class="list-group">
							{#each unscheduledOpenTodos as todo}
								<div class="list-group-item">
									<div class="row g-3 align-items-center">
										<div class="col-md">
											<h3 class="h6 mb-1">{todo.title}</h3>
											<p class="text-secondary small mb-1">{todo.description}</p>
											<p class="text-secondary small mb-0">Deadline: {todo.deadline ?? 'offen'}</p>
										</div>
										<div class="col-md-4">
											<label class="form-label" for={`${modalId}-${todo.id}`}>Zu erledigen am</label>
											<input
												class="form-control"
												id={`${modalId}-${todo.id}`}
												name={`scheduledDate-${todo.id}`}
												type="date"
												value={todo.scheduledDate ?? ''}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="text-secondary mb-0">Aktuell gibt es keine offenen Aufgaben ohne Bearbeitungsdatum.</p>
					{/if}
				</div>

				<div class="modal-footer">
					<button type="submit" class="btn btn-action-schedule" disabled={unscheduledOpenTodos.length === 0 || isSaving}>
						{#if isSaving}
							<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
							Speichert...
						{:else}
							Termine speichern
						{/if}
					</button>
					<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" disabled={isSaving}>Abbrechen</button>
				</div>
			</form>
		</div>
	</div>
</div>
