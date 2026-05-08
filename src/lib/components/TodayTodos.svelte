<script>
	import { categoryBadgeClasses } from '$lib/data/todoOptions.js';

	let { todos = [], today = '2026-05-06', readableDate = '06.05.2026' } = $props();

	const todaysTodos = $derived(todos.filter((todo) => todo.deadline === today));
</script>

<div class="card dashboard-card h-100">
	<div class="card-body">
		<div class="d-flex justify-content-between align-items-start gap-3 mb-3">
			<div>
				<h2 class="h5 mb-1">Heute terminierte To-Dos</h2>
				<p class="text-secondary mb-0">Aufgaben mit Fälligkeitsdatum {readableDate}.</p>
			</div>
			<span class="badge text-bg-primary">{todaysTodos.length}</span>
		</div>

		{#if todaysTodos.length > 0}
			<div class="list-group list-group-flush">
				{#each todaysTodos as todo}
					<article class="list-group-item px-0">
						<div class="d-flex justify-content-between gap-3">
							<div>
								<h3 class="h6 mb-1">{todo.title}</h3>
								<p class="text-secondary small mb-2">{todo.description}</p>
								<span class={`badge ${categoryBadgeClasses[todo.category]}`}>{todo.category}</span>
							</div>
							<span class="badge text-bg-light align-self-start">{todo.priority}</span>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<p class="text-secondary mb-0">
				Keine Aufgaben für heute. Du kannst vorausplanen oder den freien Tag geniessen.
			</p>
		{/if}
	</div>
</div>
