<script>
	import { tick } from 'svelte';
	import { showModal } from '$lib/bootstrapModal.js';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import EditTodoModal from '$lib/components/EditTodoModal.svelte';
	import TodoItem from '$lib/components/TodoItem.svelte';

	let { todos = [], today = new Date().toISOString().slice(0, 10), editTodoId = null } = $props();
	let selectedTodo = $state(null);

	async function openEditModal(todo) {
		selectedTodo = todo;
		await tick();

		await showModal('editTodoModal');
	}

	$effect(() => {
		if (!editTodoId || selectedTodo?.id === editTodoId) {
			return;
		}

		const todoToEdit = todos.find((todo) => todo.id === editTodoId);

		if (todoToEdit) {
			openEditModal(todoToEdit);
		}
	});
</script>

{#if todos.length > 0}
	<div class="row g-3">
		{#each todos as todo}
			<div class="col-lg-6">
				<TodoItem {todo} {today} onEdit={openEditModal} />
			</div>
		{/each}
	</div>
{:else}
	<EmptyState
		title="Keine Aufgaben für diese Ansicht"
		description="Passe die Filter an oder erfasse ein neues To-Do."
	/>
{/if}

<EditTodoModal todo={selectedTodo} />
