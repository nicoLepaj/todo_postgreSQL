const express = require('express');
const app = express();
const cors = require('cors');
const client = require('./db');
const path = require('path');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // lets us access req.body object

if (process.env.NODE_ENV === 'production') {
	// Serve static content
	app.use(express.static(path.join(__dirname, 'client/dist')));
}

// ROUTES
// Create a todo
app.post('/todos', async (req, res) => {
	console.log(req.body);
	try {
		const { description } = req.body;

		const newTodo = await client.query(
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
		const allTodos = await client.query('SELECT * FROM todo ORDER BY todo_id');
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
}).catch ((err) => {
	console.log(err)
	console.error(err)
	console.info(err)
})

// Get a todo
app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await client.query('SELECT * FROM todo WHERE todo_id = $1', [
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
		await client.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
			description,
			id,
		]);

		res.json({ id, description });
	} catch (err) {
		console.error(err.message);
	}
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await client.query(
			'DELETE FROM todo WHERE todo_id = $1 RETURNING *',
			[id]
		);

		res.json(`Todo with id ${deleteTodo.rows[0].todo_id} was deleted!`);
	} catch (err) {
		console.error(err.message);
	}
});

// Delete all todos
app.delete('/todos', async (req, res) => {
	try {
		const deleteTodo = await client.query('DELETE FROM todo RETURNING *');

		res.json('All todos were deleted!');
	} catch (err) {
		console.error(err.message);
	}
});

// Catch all route
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '/client/dist/index.html'));
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
