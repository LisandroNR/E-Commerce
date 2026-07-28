const db = require('./db/database');

console.log("Creando módulo de Categorías...");

try {
    // 1. Creamos la tabla de categorías
    db.exec(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT DEFAULT '',
            image TEXT DEFAULT ''
        );
    `);
    console.log("✔️ Tabla 'categories' creada o verificada.");

    // 2. Revisamos si está vacía para meterle datos de prueba
    const checkEmpty = db.prepare('SELECT COUNT(*) as count FROM categories').get();
    
    if (checkEmpty.count === 0) {
        console.log("La tabla está vacía. Insertando categorías por defecto...");
        const insert = db.prepare('INSERT INTO categories (name, description, image) VALUES (?, ?, ?)');
        
        insert.run('Liga Argentina', 'Camisetas de los mejores equipos del fútbol local', 'https://via.placeholder.com/150?text=Argentina');
        insert.run('Equipos Europeos', 'Los gigantes del viejo continente', 'https://via.placeholder.com/150?text=Europa');
        insert.run('Selecciones', 'Camisetas internacionales', 'https://via.placeholder.com/150?text=Selecciones');
        
        console.log("✔️ Categorías iniciales cargadas.");
    } else {
        console.log("❕ La tabla ya tiene categorías, no se insertaron datos nuevos.");
    }

    console.log("¡Todo listo para armar la API de categorías!");

} catch (error) {
    console.error("❌ Hubo un error:", error.message);
}