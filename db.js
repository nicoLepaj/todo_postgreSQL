const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	port: process.env.PG_PORT,
};

const prodConfig = {
	connectionString: 'postgres://ldoaomlcboltqh:f3bb29492563d1827b6a5d6484c46ddc44bd5b68a3339e704d6839f7e2c96a50@ec2-54-228-9-90.eu-west-1.compute.amazonaws.com:5432/d7fu864r1d487q', //heroku addons
};

const pool = new Pool(
	process.env.NODE_ENV === 'production' ? prodConfig : devConfig
);

module.exports = pool;
