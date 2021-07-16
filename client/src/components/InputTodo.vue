<template>
	<h1 class="text-center mt-5">PostgreSQL Todo List</h1>
	<form @submit.prevent="onSubmitForm" class="d-flex mt-5">
		<input type="text" class="form-control" v-model="description" />
		<button class="btn btn-success">Add</button>
	</form>
</template>

<script>
import {ref} from 'vue'
export default {
	setup() {
		const description = ref('');

		async function onSubmitForm() {
			try {
				const body = { description: description.value };
				const response = await fetch('http://localhost:5000/todos', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				});
        console.log(response)
			} catch (error) {
				console.error(error.message);
			}
		}

		return {
			description,
			onSubmitForm,
		};
	},
};
</script>
