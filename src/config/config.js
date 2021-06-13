require('dotenv').config()
module.exports = {
    database: process.env.DB_database,
    host: process.env.DB_host,
    port: process.env.DB_port,
    user: process.env.DB_user,
    password: process.env.DB_password,
};