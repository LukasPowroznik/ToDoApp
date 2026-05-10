<script>
	let { message = '', tone = 'danger', compact = false } = $props();
</script>

{#if message}
	<div class={`status-message status-message-${tone} ${compact ? 'status-message-compact' : ''}`} role={tone === 'danger' ? 'alert' : 'status'}>
		<span class="status-message-marker" aria-hidden="true"></span>
		<p class="mb-0">{message}</p>
	</div>
{/if}
