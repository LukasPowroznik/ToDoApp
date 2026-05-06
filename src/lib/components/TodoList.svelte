<script>
	import TodoItem from '$lib/components/TodoItem.svelte';

	let { todos = [] } = $props();
</script>

{#if todos.length > 0}
	<div class="row g-3">
		{#each todos as todo}
			<div class="col-lg-6">
				<TodoItem {todo} />
			</div>
		{/each}
	</div>
{:else}
	<p class="text-secondary mb-0">Keine Aufgaben für diese Ansicht vorhanden.</p>
{/if}
