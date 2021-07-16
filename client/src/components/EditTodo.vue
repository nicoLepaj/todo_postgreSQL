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
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
    @click="resetDescription"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Edit todo</h5>
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
						v-model="editTodo.description"
					/>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
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

		async function updateDescription() {
			try {
				const body = { description: editTodo.value.description };
				const response = await fetch(
					`http://localhost:5000/todos/${editTodo.value.todo_id}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(body),
					}
				);
			} catch (error) {
				console.error(error.message);
			}
		}

		function resetDescription() {
			editTodo.value.description = props.todo.description; 
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
