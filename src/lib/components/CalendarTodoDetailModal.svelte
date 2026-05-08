<script>
	import { goto } from '$app/navigation';
	import { categoryBadgeClasses, priorityBadgeClasses, recurrenceLabels } from '$lib/data/todoOptions.js';

	let { modalId = 'calendarTodoDetailModal', todo = null } = $props();

	const currentTodo = $derived(
		todo ?? {
			title: '',
			description: '',
			category: 'Sonstiges',
			priority: 'Medium',
			status: 'Open',
			calendarDate: '',
			scheduledDate: '',
			deadline: '',
			estimatedDuration: '',
			recurring: false,
			recurrence: undefined,
			isRecurringOccurrence: false,
			isOccurrenceCompleted: false
		}
	);

	function handleEditClick(event) {
		event.preventDefault();

		const targetUrl = `/tasks?edit=${currentTodo.id}`;
		const modalElement = document.getElementById(modalId);
		const modal = window.bootstrap?.Modal.getInstance(modalElement);

		if (!modal || !modalElement) {
			goto(targetUrl);
			return;
		}

		modalElement.addEventListener('hidden.bs.modal', () => goto(targetUrl), { once: true });
		modal.hide();
	}
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title fs-5" id={`${modalId}Label`}>{currentTodo.title}</h2>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Schliessen"></button>
			</div>

			<div class="modal-body">
				<div class="d-flex flex-wrap gap-2 mb-3">
					<span class={`badge ${categoryBadgeClasses[currentTodo.category]}`}>{currentTodo.category}</span>
					<span class={`badge ${priorityBadgeClasses[currentTodo.priority]}`}>{currentTodo.priority}</span>
					<span class={`badge ${currentTodo.isOccurrenceCompleted ? 'text-bg-success' : 'text-bg-light'}`}>
						{currentTodo.isOccurrenceCompleted ? 'Erledigt' : currentTodo.status}
					</span>
					{#if currentTodo.recurring && currentTodo.recurrence}
						<span class="badge text-bg-dark">{recurrenceLabels[currentTodo.recurrence.type]}</span>
					{/if}
					{#if currentTodo.isRecurringOccurrence}
						<span class="badge text-bg-light">Wiederholung</span>
					{/if}
				</div>

				<dl class="row mb-0">
					<dt class="col-sm-4">Kalenderdatum</dt>
					<dd class="col-sm-8">{currentTodo.calendarDate || 'ohne Termin'}</dd>

					<dt class="col-sm-4">Geplant am</dt>
					<dd class="col-sm-8">{currentTodo.scheduledDate || currentTodo.calendarDate || 'ohne Termin'}</dd>

					<dt class="col-sm-4">Deadline</dt>
					<dd class="col-sm-8">{currentTodo.deadline || 'ohne Termin'}</dd>

					<dt class="col-sm-4">Dauer</dt>
					<dd class="col-sm-8">{currentTodo.estimatedDuration || 'keine Angabe'}</dd>

					<dt class="col-sm-4">Beschreibung</dt>
					<dd class="col-sm-8">{currentTodo.description || 'Keine Beschreibung vorhanden.'}</dd>
				</dl>
			</div>

			<div class="modal-footer justify-content-between">
				{#if currentTodo.id}
					<a class="btn btn-primary" href={`/tasks?edit=${currentTodo.id}`} onclick={handleEditClick}>Bearbeiten</a>
				{/if}
				<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Schliessen</button>
			</div>
		</div>
	</div>
</div>
