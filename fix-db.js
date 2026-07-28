const db = require('./db/database');

console.log("Iniciando actualización de la base de datos...");

// Intentamos agregar 'stock'
try {
    db.exec("ALTER TABLE products ADD COLUMN stock INTEGER DEFAULT 0;");
    console.log("✔️ Columna 'stock' agregada con éxito.");
} catch (error) {
    console.log("❕ La columna 'stock' ya existía.");
}

// Intentamos agregar 'description'
try {
    db.exec("ALTER TABLE products ADD COLUMN description TEXT DEFAULT '';");
    console.log("✔️ Columna 'description' agregada con éxito.");
} catch (error) {
    console.log("❕ La columna 'description' ya existía.");
}

// Intentamos agregar 'store'
try {
    db.exec("ALTER TABLE products ADD COLUMN store TEXT DEFAULT 'Havanna SL';");
    console.log("✔️ Columna 'store' agregada con éxito.");
} catch (error) {
    console.log("❕ La columna 'store' ya existía.");
}

console.log("=========================================");
console.log("¡Actualización completada! Ya podés guardar.");
console.log("=========================================");