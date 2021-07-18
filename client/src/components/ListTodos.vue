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
			<tr v-for="todo in use_todos" :key="todo.todo_id">
				<td>{{ todo.description }}</td>
				<td><EditTodo :todo="todo" /></td>
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
import { onMounted } from 'vue';
import EditTodo from './EditTodo.vue';
import useTodos from '../composables/todos.js';
export default {
	components: {
		EditTodo,
	},
	setup() {
		onMounted(() => {
			getTodos();
		});

		const {
			todos: use_todos,
			setTodos: use_setTodos,
			removeTodo: use_removeTodo,
		} = useTodos();

		async function getTodos() {
			try {
				const response = await fetch('/todos');
				const jsonData = await response.json();
				console.log(jsonData)
				use_setTodos(jsonData);
			} catch (error) {
				console.error(error.message);
			}
		}

		async function deleteTodo(id) {
			try {
				await fetch(`/todos/${id}`, {
					method: 'DELETE',
				});
				use_removeTodo(id);
			} catch (error) {
				console.error(error.message);
			}
		}

		return {
			getTodos,
			deleteTodo,
			use_todos,
		};
	},
};
</script>
