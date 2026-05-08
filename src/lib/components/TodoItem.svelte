<script>
	import {
		categoryBadgeClasses,
		priorityBadgeClasses,
		recurrenceLabels
	} from '$lib/data/todoOptions.js';

	let { todo } = $props();

	const isCompleted = $derived(todo.status === 'Completed');
</script>

<article class={`card h-100 ${isCompleted ? 'todo-item-completed' : ''}`}>
	<div class="card-body">
		<div class="d-flex justify-content-between gap-3 mb-2">
			<h3 class={`h6 mb-0 ${isCompleted ? 'todo-title-completed' : ''}`}>
				{todo.title}
			</h3>
			<span class={`badge ${isCompleted ? 'text-bg-success' : 'text-bg-light'}`}>
				{todo.status}
			</span>
		</div>
		<p class="text-secondary small">{todo.description}</p>
		<div class="d-flex flex-wrap gap-2">
			<span class={`badge ${categoryBadgeClasses[todo.category]}`}>{todo.category}</span>
			<span class={`badge ${priorityBadgeClasses[todo.priority]}`}>{todo.priority}</span>
			<span class="badge text-bg-light">{todo.deadline ?? 'ohne Termin'}</span>
			<span class="badge text-bg-light">{todo.estimatedDuration}</span>
			{#if todo.recurring && todo.recurrence}
				<span class="badge text-bg-dark">{recurrenceLabels[todo.recurrence.type]}</span>
			{/if}
		</div>
	</div>
</article>
