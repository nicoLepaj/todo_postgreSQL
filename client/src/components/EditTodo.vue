<template>
	<!-- Button trigger modal -->
	<button
		type="button"
		class="btn btn-primary"
		data-bs-toggle="modal"
		:data-bs-target="modalTarget"
	>
		Edit
	</button>

	<!-- Modal -->
	<div
		class="modal fade"
		:id="modalId"
		data-bs-backdrop="static"
		tabindex="-1"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Edit todo</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
						@click="resetDescription"
					></button>
				</div>
				<div class="modal-body">
					<input
						type="text"
						class="form-control"
						@keyup.enter="updateDescription"
						v-model="editTodo.description"
					/>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
						id="close-button"
						@click="resetDescription"
					>
						Close
					</button>
					<button
						type="button"
						class="btn btn-primary"
						@click="updateDescription"
					>
						Save changes
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import useTodos from '../composables/todos.js';
export default {
	props: {
		todo: {
			required: true,
			type: Object,
		},
	},
	setup(props) {
		const editTodo = ref({ ...props.todo });

		// Create id and target for unique modals
		const modalId = computed(() => {
			return `id${editTodo.value.todo_id}`;
		});

		const modalTarget = computed(() => {
			return `#id${editTodo.value.todo_id}`;
		});

		const { updateTodo: use_updateTodo } = useTodos();

		async function updateDescription() {
			try {
				const body = { description: editTodo.value.description };

				// Proxy => will use proxy url in package.json or hosting url
				const response = await fetch(
					`/todos/${editTodo.value.todo_id}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(body),
					}
				);
				const jsonData = await response.json();
				closeModal();
				use_updateTodo(jsonData);
			} catch (error) {
				console.error(error.message);
			}
		}

		function resetDescription() {
			setTimeout(() => {
				editTodo.value.description = props.todo.description;
			}, 150);
		}

		function closeModal() {
			const closeBtn = document.getElementById('close-button');
			closeBtn.click();
		}

		return {
			editTodo,
			modalId,
			modalTarget,
			updateDescription,
			resetDescription,
		};
	},
};
</script>
