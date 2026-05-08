<script>
	let {
		title = 'Keine Einträge vorhanden',
		description = 'Sobald Daten vorhanden sind, werden sie hier angezeigt.',
		compact = false
	} = $props();
</script>

<div class={`text-center text-secondary ${compact ? 'py-2' : 'py-5'}`}>
	<p class={`fw-semibold mb-1 ${compact ? 'small' : ''}`}>{title}</p>
	<p class={`mb-0 ${compact ? 'small' : ''}`}>{description}</p>
</div>