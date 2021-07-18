<template>
	<h1 class="text-center mt-5">PostgreSQL Todo List</h1>
	<form @submit.prevent="onSubmitForm" class="d-flex mt-5">
		<input type="text" class="form-control" v-model="description" />
		<button class="btn btn-success">Add</button>
	</form>
</template>

<script>
import { ref } from 'vue';
import useTodos from '../composables/todos.js';
export default {
	setup() {
		const description = ref('');

		async function onSubmitForm() {
			if (description.value.trim().length) {
				try {
					const body = { description: description.value };
					const response = await fetch('/todos', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(body),
					});
					const jsonData = await response.json();
					setNewTodo(jsonData);
				} catch (error) {
					console.error(error.message);
				}
			}
			description.value = '';
		}

		const { addTodo: use_addTodo } = useTodos();

		function setNewTodo(data) {
			use_addTodo(data);
		}

		return {
			description,
			onSubmitForm,
		};
	},
};
</script>
