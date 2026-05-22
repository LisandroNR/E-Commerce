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

    // 3. Filtrar por categoría
    filterByCategory: (category) => {
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
    getSorted: (order = 'asc') => { // <--- ACÁ LE CAMBIAMOS EL NOMBRE
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
        // Podemos hacer que traiga otros distintos, pero por ahora lo mantenemos simple para que no rompa
        const query = db.prepare('SELECT * FROM products LIMIT ?');
        return query.all(limit);
    }
}; // <--- No te olvides de esta llave que cerramos antes

module.exports = productsService;