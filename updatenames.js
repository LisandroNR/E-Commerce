const Database = require('better-sqlite3');
const db = new Database('./db/ecommerce.sqlite');

db.prepare("UPDATE products SET name = 'Short Titular Boca Juniors' WHERE name = 'Short Titular River Plate'").run();
db.prepare("UPDATE products SET name = 'Camiseta Liverpool Alternativa' WHERE name = 'Camiseta Inter Miami - Messi'").run();

console.log('Listo!');