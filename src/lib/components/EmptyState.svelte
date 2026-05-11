<script>
	let {
		title = 'Keine Einträge vorhanden',
		description = 'Sobald Daten vorhanden sind, werden sie hier angezeigt.',
		compact = false
	} = $props();
</script>

<div class={`empty-state ${compact ? 'empty-state-compact' : ''}`}>
	<div class="empty-state-icon" aria-hidden="true"></div>
	<p class={`empty-state-title ${compact ? 'small' : ''}`}>{title}</p>
	<p class={`empty-state-description ${compact ? 'small' : ''}`}>{description}</p>
</div>
