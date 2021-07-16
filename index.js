const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json()); // lets us access req.body object

// ROUTES

// Create a todo
app.post('/todos', async (req, res) => {
	console.log(req.body);
	try {
		const { description } = req.body;

		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES($1) RETURNING *',
			[description]
		);
		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// Get all todos
app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool.query('SELECT * FROM todo ORDER BY todo_id');
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// Get a todo
app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
			id,
		]);

		res.json(todo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updateTodo = await pool.query(
			'UPDATE todo SET description = $1 WHERE todo_id = $2',
			[description, id]
		);

		res.json('Todo was updated');
	} catch (err) {
		console.error(err.message);
	}
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query(
			'DELETE FROM todo WHERE todo_id = $1 RETURNING *',
			[id]
		);

		res.json(`Todo with id ${deleteTodo.rows[0].todo_id} was deleted!`);
	} catch (err) {
		console.error(err.message);
	}
});

// Delete ALL todos
app.delete('/todos', async (req, res) => {
	try {
		const deleteTodo = await pool.query('DELETE FROM todo RETURNING *');

		res.json('All todos were deleted!');
	} catch (err) {
		console.error(err.message);
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
