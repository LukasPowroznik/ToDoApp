<script>
	import { onMount } from 'svelte';

	import favicon from '$lib/assets/favicon.svg';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children } = $props();

	onMount(async () => {
		await import('bootstrap/dist/js/bootstrap.bundle.min.js');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navigation />

<main class="app-main">
	{@render children()}
</main>
