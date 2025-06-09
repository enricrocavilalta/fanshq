const mysql = require('mysql2');

// Crear la conexión con la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fghjFGHJ85',
  database: 'fanshq'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('✅ Conexión establecida con la base de datos');
});

module.exports = connection;
