<template>
	<table class="table table-hover mt-5">
		<thead>
			<tr>
				<th scope="col">Description</th>
				<th scope="col">Edit</th>
				<th scope="col">Delete</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="todo in todos" :key="todo.todo_id">
				<td>{{ todo.description }}</td>
				<td> <EditTodo :todo="todo"/> </td>
				<td>
					<button @click="deleteTodo(todo.todo_id)" class="btn btn-danger">
						Delete
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
import { ref, onMounted } from 'vue';

import EditTodo from './EditTodo.vue'
export default {
	components: {
		EditTodo
	},
	setup() {
		onMounted(() => {
			getTodos();
		});

		const todos = ref(null);
		async function getTodos() {
			try {
				const response = await fetch('http://localhost:5000/todos');
				todos.value = await response.json();
			} catch (error) {
				console.error(error.message);
			}
		}

		async function deleteTodo(id) {
			try {
				const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
					method: 'DELETE',
				});

				todos.value = todos.value.filter((todo) => todo.todo_id !== id);
        console.log(todos.value)
			} catch (error) {
				console.error(error.message);
			}
		}

		return {
			getTodos,
			deleteTodo,
			todos,
		};
	},
};
</script>
