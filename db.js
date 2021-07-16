const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	password: 'Po1991374285!',
	host: 'localhost',
	port: 5432,
	database: 'perntodo',
});

module.exports = pool;
