<script>
	import { invalidateAll } from '$app/navigation';
	import StatusMessage from '$lib/components/StatusMessage.svelte';

	const categories = ['Privat', 'Arbeit', 'Sport', 'Sonstiges'];

	let { data } = $props();
	let isSaving = $state(false);
	let message = $state('');
	let messageTone = $state('success');

	async function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const settings = {
			dailyHourLimit: Number(formData.get('dailyHourLimit')),
			defaultCalendarView: formData.get('defaultCalendarView'),
			categoryHourLimits: Object.fromEntries(
				categories.map((category) => [category, Number(formData.get(`category-${category}`))])
			)
		};

		isSaving = true;
		message = '';

		try {
			const response = await fetch('/api/settings', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(settings)
			});

			if (!response.ok) {
				throw new Error('Einstellungen konnten nicht gespeichert werden.');
			}

			await invalidateAll();
			messageTone = 'success';
			message = 'Einstellungen wurden gespeichert.';
		} catch (error) {
			messageTone = 'danger';
			message = error.message;
		} finally {
			isSaving = false;
		}
	}
</script>

<div class="container">
	<header class="page-header">
		<h1 class="h2 mb-2">Einstellungen</h1>
		<p class="text-secondary mb-0">Limits für geplante To-Dos pro Tag und Kategorie.</p>
	</header>

	<section class="card dashboard-card">
		<form onsubmit={handleSubmit}>
			<div class="card-body">
				<StatusMessage message={message} tone={messageTone} />

				<div class="row g-3">
					<div class="col-md-6">
						<label class="form-label" for="daily-hour-limit">Maximale Stunden pro Tag</label>
						<input
							class="form-control"
							id="daily-hour-limit"
							name="dailyHourLimit"
							type="number"
							min="0"
							max="24"
							step="0.5"
							value={data.settings.dailyHourLimit}
							required
						/>
					</div>
					<div class="col-md-6">
						<label class="form-label" for="default-calendar-view">Standardansicht Kalender</label>
						<select
							class="form-select"
							id="default-calendar-view"
							name="defaultCalendarView"
							value={data.settings.defaultCalendarView}
						>
							<option value="week">Woche</option>
							<option value="workweek">Arbeitswoche</option>
							<option value="month">Monat</option>
						</select>
					</div>
				</div>

				<hr class="my-4" />

				<h2 class="h5 mb-3">Kategorie-Limits</h2>

				<div class="row g-3">
					{#each categories as category}
						<div class="col-md-6">
							<label class="form-label" for={`category-${category}`}>{category}</label>
							<div class="input-group">
								<input
									class="form-control"
									id={`category-${category}`}
									name={`category-${category}`}
									type="number"
									min="0"
									max="24"
									step="0.5"
									value={data.settings.categoryHourLimits[category]}
									required
								/>
								<span class="input-group-text">h/Tag</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="card-footer bg-white border-top d-flex justify-content-end">
				<button class="btn btn-action-primary" type="submit" disabled={isSaving}>
					{#if isSaving}
						<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
						Speichert...
					{:else}
						Einstellungen speichern
					{/if}
				</button>
			</div>
		</form>
	</section>
</div>
