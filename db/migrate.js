const db = require('./database');
const fs = require('fs');
const path = require('path');

console.log('Iniciando migración de datos de JSON a SQLite...');

// 1. Buscamos y leemos tu archivo JSON viejo
const jsonPath = path.join(__dirname, '../models/products.json');
const productsJSON = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 2. Preparamos la orden de inserción SQL
// Usamos @nombreDeVariable para que better-sqlite3 asigne los valores automáticamente
const insertProduct = db.prepare(`
    INSERT OR IGNORE INTO products (id, name, description, price, image) 
    VALUES (@id, @name, @description, @price, @image)
`);

// 3. Hacemos la inserción de forma masiva (transaction lo hace súper rápido)
const migrate = db.transaction((products) => {
    for (const prod of products) {
        insertProduct.run({
            id: prod.id,
            name: prod.name,
            // Si algún producto no tiene descripción, le ponemos un texto por defecto para que no falle
            description: prod.description || 'Sin descripción', 
            price: prod.price,
            image: prod.image
        });
    }
});

// 4. Ejecutamos la función pasándole los datos del JSON
migrate(productsJSON);

console.log(`¡Éxito! Se migraron ${productsJSON.length} productos a la base de datos SQLite.`);