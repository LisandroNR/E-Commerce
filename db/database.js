const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Le decimos que cree el archivo de la base de datos adentro de esta misma carpeta "db"
const dbPath = path.join(__dirname, 'ecommerce.sqlite');

// Iniciamos la conexión
const db = new Database(dbPath);

// ==========================================
// INICIALIZACIÓN AUTOMÁTICA DE TABLAS
// ==========================================
// Leemos el archivo SQL que creamos en el paso anterior
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Ejecutamos el SQL para asegurarnos de que las tablas existan
db.exec(schema);

console.log("¡Base de datos SQLite conectada y tablas verificadas!");

// Exportamos la conexión para poder usarla en nuestros servicios más adelante
module.exports = db;