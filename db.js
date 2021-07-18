const { Client } = require('pg');
// require('dotenv').config();

// const devConfig = {
// 	user: process.env.PG_USER,
// 	password: process.env.PG_PASSWORD,
// 	host: process.env.PG_HOST,
// 	database: process.env.PG_DATABASE,
// 	port: process.env.PG_PORT,
// };

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

client.connect();

module.exports = client;
