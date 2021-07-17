import { ref } from 'vue';

const todos = ref(null);

export default function useTodos() {
	function setTodos(items) {
		todos.value = items;
	}
	function addTodo(item) {
		todos.value.push(item);
	}

	function removeTodo(id) {
		todos.value = todos.value.filter((todo) => todo.todo_id !== id);
	}

	function updateTodo(item) {
		const update = todos.value.find(
			(todo) => todo.todo_id === parseInt(item.id)
		);
		update.description = item.description;
	}

	return {
		todos,
		setTodos,
		addTodo,
		removeTodo,
		updateTodo,
	};
}
