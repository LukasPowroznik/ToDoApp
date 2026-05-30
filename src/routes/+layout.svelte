<script>
	import { onMount } from 'svelte';

	import { loadBootstrap } from '$lib/bootstrapModal.js';
	import favicon from '$lib/assets/favicon.svg';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import StatusMessage from '$lib/components/StatusMessage.svelte';
	import { appStatusMessage } from '$lib/appStatusMessage.js';

	let { children } = $props();

	onMount(async () => {
		await loadBootstrap();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navigation />

<main class="app-main">
	{#if $appStatusMessage.message}
		<div class="container app-status-message">
			<StatusMessage message={$appStatusMessage.message} tone={$appStatusMessage.tone} />
		</div>
	{/if}

	{@render children()}
</main>
