const mysql = require('mysql2/promise');

// const host = process.env.MYSQL_HOST;
// const user = process.env.MYSQL_USER;
// const password = process.env.MYSQL_PASSWORD;
// const database = process.env.MYSQL_DB;
// const port = process.env.MYSQL_PORT;

// eslint-disable-next-line arrow-body-style
// const mysqlConnection = async () => {
//   return mysql.createConnection({
//     host: 'glassdoor.c7wmc0etoudt.us-west-1.rds.amazonaws.com',
//     user: 'harry_potter',
//     password: '!harry+456-369',
//     database: 'glassdoor-prototype',
//     multipleStatements: true,
//     port: '3306',
//   });
// };

const pool = mysql.createPool({
  connectionLimit: 50,
  host: 'glassdoor.c7wmc0etoudt.us-west-1.rds.amazonaws.com',
  user: 'harry_potter',
  password: '!harry+456-369',
  database: 'glassdoor-prototype',
  multipleStatements: true,
  port: '3306',
});

const mysqlConnection = async () => {
  return pool.getConnection();
};

// // const mysqlConnection = function (callback) {
//   pool.getConnection(function (err, connection) {
//     callback(err, connection);
//   });
// };

module.exports = mysqlConnection;
