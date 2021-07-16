<template>
	<div class="container">
		<InputTodo/>
		<ListTodos/>
	</div>
</template>

<script>
import InputTodo from './components/InputTodo.vue';
import ListTodos from './components/ListTodos.vue';

export default {
	name: 'App',
	components: {
		InputTodo,
		ListTodos
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
