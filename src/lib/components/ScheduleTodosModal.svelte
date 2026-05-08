<script>
	let { modalId = 'scheduleTodosModal', todos = [] } = $props();

	const unscheduledTodos = $derived(
		todos.filter((todo) => todo.status === 'Open' && !todo.deadline)
	);
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<form>
				<div class="modal-header">
					<h2 class="modal-title fs-5" id={`${modalId}Label`}>ToDo's terminieren</h2>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Schliessen"></button>
				</div>

				<div class="modal-body">
					{#if unscheduledTodos.length > 0}
						<p class="text-secondary">
							Offene Aufgaben ohne Deadline können hier einem Datum zugewiesen werden.
						</p>

						<div class="list-group">
							{#each unscheduledTodos as todo}
								<div class="list-group-item">
									<div class="row g-3 align-items-center">
										<div class="col-md">
											<h3 class="h6 mb-1">{todo.title}</h3>
											<p class="text-secondary small mb-0">{todo.description}</p>
										</div>
										<div class="col-md-4">
											<label class="form-label" for={`${modalId}-${todo.id}`}>Fälligkeitsdatum</label>
											<input
												class="form-control"
												id={`${modalId}-${todo.id}`}
												name={`deadline-${todo.id}`}
												type="date"
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="text-secondary mb-0">Aktuell gibt es keine offenen Aufgaben ohne Deadline.</p>
					{/if}
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Abbrechen</button>
					<button type="submit" class="btn btn-primary" disabled={unscheduledTodos.length === 0}>
						Termine speichern
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
