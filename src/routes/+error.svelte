<script>
	import { page } from '$app/state';
</script>

<div class="container">
	<section class="error-state-card">
		<p class="page-kicker">Fehler {page.status}</p>
		<h1 class="h3 mb-3">Die Ansicht konnte nicht geladen werden</h1>
		<p class="text-secondary mb-4">
			Bitte prüfe die Verbindung und versuche es erneut. Falls die App gerade lokal läuft, kann auch die MongoDB-Verbindung fehlen.
		</p>
		<a class="btn btn-primary" href="/">Zurück zum Dashboard</a>
	</section>
</div>
