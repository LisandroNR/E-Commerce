const db = require('../db/database');

const categoriesService = {
    getAll: () => db.prepare('SELECT * FROM categories').all(),
    getById: (id) => db.prepare('SELECT * FROM categories WHERE id = ?').get(id),
    
    create: (data) => {
        const query = db.prepare('INSERT INTO categories (name, description, image) VALUES (?, ?, ?)');
        const result = query.run(data.name, data.description, data.image);
        return result.lastInsertRowid;
    },
    
    update: (id, data) => {
        const query = db.prepare('UPDATE categories SET name = ?, description = ?, image = ? WHERE id = ?');
        const result = query.run(data.name, data.description, data.image, id);
        return result.changes > 0;
    },
    
    delete: (id) => {
        const result = db.prepare('DELETE FROM categories WHERE id = ?').run(id);
        return result.changes > 0;
    },

    // Nuevo método para obtener la cantidad total de categorías (User Story #4 del Sprint 4)
    count: () => {
        const query = db.prepare('SELECT COUNT(*) AS total FROM categories');
        const result = query.get();
        return result.total;
    }
};

module.exports = categoriesService;