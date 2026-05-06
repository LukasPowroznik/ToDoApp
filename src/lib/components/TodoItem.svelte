<script>
	import { categoryBadgeClasses, priorityBadgeClasses } from '$lib/data/demoTodos.js';

	let { todo } = $props();
</script>

<article class={`card h-100 ${todo.completed ? 'todo-item-completed' : ''}`}>
	<div class="card-body">
		<div class="d-flex justify-content-between gap-3 mb-2">
			<h3 class={`h6 mb-0 ${todo.completed ? 'todo-title-completed' : ''}`}>
				{todo.title}
			</h3>
			<span class={`badge ${todo.completed ? 'text-bg-success' : 'text-bg-light'}`}>
				{todo.status}
			</span>
		</div>
		<p class="text-secondary small">{todo.description}</p>
		<div class="d-flex flex-wrap gap-2">
			<span class={`badge ${categoryBadgeClasses[todo.category]}`}>{todo.category}</span>
			<span class={`badge ${priorityBadgeClasses[todo.priority]}`}>{todo.priority}</span>
			<span class="badge text-bg-light">{todo.dueDate ?? 'ohne Termin'}</span>
			<span class="badge text-bg-light">{todo.estimatedDuration}</span>
			{#if todo.isRecurring}
				<span class="badge text-bg-dark">{todo.recurrence}</span>
			{/if}
		</div>
	</div>
</article>
