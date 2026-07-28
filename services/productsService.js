const db = require('../db/database');

const productsService = {
    // 1. Obtener todos los productos desde SQLite
    getAll: () => {
        const query = db.prepare('SELECT * FROM products');
        return query.all();
    },

    // 2. Obtener un producto por ID
    getById: (id) => {
        const query = db.prepare('SELECT * FROM products WHERE id = ?');
        return query.get(id);
    },

    // 3. Filtrar por categoría (Corregido a getByCategory para coincidir con el controlador)
    getByCategory: (category) => {
        const query = db.prepare('SELECT * FROM products WHERE category = ?');
        return query.all(category);
    },

    // 4. Buscar por nombre (Coincidencia parcial - US#19)
    search: (searchQuery) => {
        const query = db.prepare('SELECT * FROM products WHERE name LIKE ?');
        // El % le dice a SQL que busque cualquier texto antes o después de la palabra
        return query.all(`%${searchQuery}%`);
    },

    // 5. Ordenar por precio (Menor a Mayor / Mayor a Menor)
    getSorted: (order = 'asc') => { 
        const direction = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
        const query = db.prepare(`SELECT * FROM products ORDER BY price ${direction}`);
        return query.all();
    },

    // 6. Obtener productos relacionados (Misma categoría, excluyendo el actual)
    getRelated: (category, currentId, limit = 4) => {
        const query = db.prepare('SELECT * FROM products WHERE category = ? AND id != ? LIMIT ?');
        return query.all(category, currentId, limit);
    },

    // 7. Obtener productos más vendidos
    getBestsellers: (limit = 4) => {
        const query = db.prepare('SELECT * FROM products LIMIT ?');
        return query.all(limit);
    },

    // 8. Obtener productos sugeridos
    getSuggested: (limit = 8) => {
        const query = db.prepare('SELECT * FROM products ORDER BY id DESC LIMIT ? OFFSET 5');
        return query.all(limit);
    },

    // =========================================================
    // NUEVOS MÉTODOS PARA EL DASHBOARD DE GESTIÓN (React Admin)
    // =========================================================

    // 9. Crear un nuevo producto (Para la User Story #10 - POST)
    create: (productData) => {
        const query = db.prepare(`
            INSERT INTO products (name, price, stock, description, category, store, image)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        
        // Manejamos si el frontend envía 'image' o el array 'images'
        const mainImage = productData.image || (productData.images && productData.images[0]) || '';

        const result = query.run(
            productData.name,
            productData.price || 0,
            productData.stock || 0,
            productData.description || '',
            productData.category || 'Camisetas', // Por defecto si viene vacío
            productData.store || 'Havanna SL',
            mainImage
        );

        // Retorna el ID del producto que se acaba de crear en la base de datos
        return result.lastInsertRowid;
    },

    // 10. Modificar un producto existente (Para la User Story #9 - PUT)
    update: (id, productData) => {
        const query = db.prepare(`
            UPDATE products 
            SET name = ?, price = ?, stock = ?, description = ?, category = ?, store = ?, image = ?
            WHERE id = ?
        `);

        const mainImage = productData.image || (productData.images && productData.images[0]) || '';

        const result = query.run(
            productData.name,
            productData.price || 0,
            productData.stock || 0,
            productData.description || '',
            productData.category || 'Camisetas',
            productData.store || 'Havanna SL',
            mainImage,
            id
        );

        // Retorna true si se modificó correctamente, false si no encontró el ID
        return result.changes > 0;
    },

    // 11. Eliminar un producto (Para la User Story #9 - DELETE)
    delete: (id) => {
        const query = db.prepare('DELETE FROM products WHERE id = ?');
        const result = query.run(id);
        
        // Retorna true si se eliminó, false si el producto no existía
        return result.changes > 0;
    },

    // 12. Obtener la cantidad total de productos (Para la User Story #4 del Sprint 4)
    count: () => {
        const query = db.prepare('SELECT COUNT(*) AS total FROM products');
        const result = query.get();
        return result.total;
    }
};

module.exports = productsService;