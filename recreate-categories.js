const db = require('./db/database');

console.log("Limpiando y recreando tabla de categorías...");

try {
    // Borramos la tabla si existe para asegurar una estructura limpia
    db.exec("DROP TABLE IF EXISTS categories;");
    
    // La creamos con la estructura correcta
    db.exec(`
        CREATE TABLE categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            image TEXT
        );
    `);
    console.log("✔️ Tabla 'categories' creada correctamente.");

    // Insertamos los datos
    const insert = db.prepare('INSERT INTO categories (name, description, image) VALUES (?, ?, ?)');
    insert.run('Liga Argentina', 'Camisetas de los mejores equipos del fútbol local', 'https://via.placeholder.com/150?text=Argentina');
    insert.run('Equipos Europeos', 'Los gigantes del viejo continente', 'https://via.placeholder.com/150?text=Europa');
    insert.run('Selecciones', 'Camisetas internacionales', 'https://via.placeholder.com/150?text=Selecciones');
    
    console.log("✔️ Categorías iniciales insertadas.");

} catch (error) {
    console.error("❌ Error al recrear la tabla:", error.message);
}