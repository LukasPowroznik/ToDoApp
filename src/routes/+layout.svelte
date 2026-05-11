<script>
	import { onMount } from 'svelte';

	import { loadBootstrap } from '$lib/bootstrapModal.js';
	import favicon from '$lib/assets/favicon.svg';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';

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
	{@render children()}
</main>
