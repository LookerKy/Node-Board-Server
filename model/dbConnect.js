const mysql = require("mysql");
const dbInfo = require("./dbInfo");

//server db || server db || dev db
const { local } = dbInfo();

const getConnection = pool =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      resolve(connection);
    });
  });

const getTransaction = connection =>
  new Promise((resolve, reject) => {
    connection.beginTransaction(err => {
      if (err) reject(err);
      resolve(connection);
    });
  });

const changeCommit = connection =>
  new Promise((resolve, reject) => {
    connection.commit(err => {
      if (err) reject(err);

      resolve();
    });
  });

const changeRollback = connection =>
  new Promise((resolve, reject) => {
    connection.rollback(() => {
      console.log(123);
      resolve();
    });
  });

const pool = mysql.createPool({
  connectionLimit: 100,
  host: local.host,
  port: local.port,
  user: local.user,
  password: local.password,
  database: local.database,
  dateStrings: local.dateStrings,
  multipleStatements: local.multipleStatements
  // waitForConnections: false
});

const connectdb = {
  getPool: async () => {
    let connection = await getConnection(pool);
    connection = await getTransaction(connection);

    return connection;
  }
};

module.exports = connectdb;
