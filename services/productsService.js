const fs = require('fs');
const path = require('path');

// Ubicación de nuestra base de datos (JSON)
const productsFilePath = path.join(__dirname, '../models/products.json');

const productsService = {
    // 1. Traer TODOS los productos
    getAll: () => {
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    },
// 7. Traer todos los productos ordenados (US#18)
    getSorted: (sortOrder) => {
        const products = productsService.getAll();
        
        if (sortOrder === 'asc') {
            // Menor a mayor precio
            return products.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            // Mayor a menor precio
            return products.sort((a, b) => b.price - a.price);
        }
        
        // Si no mandan nada raro, los devolvemos como vienen
        return products;
    },
    // 2. Traer un producto por su ID
    getById: (id) => {
        const products = productsService.getAll();
        return products.find(p => p.id == id);
    },

    // 3. Traer productos de una categoría específica
    getByCategory: (category) => {
        const products = productsService.getAll();
        return products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    },

    // 4. Traer los más vendidos (mezclados)
    getBestsellers: (limit) => {
        const products = productsService.getAll();
        const bestsellers = products.filter(p => p.bestseller === true);
        const shuffled = bestsellers.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
    },

    // 5. Traer productos sugeridos (mezclados)
    getSuggested: (limit) => {
        const products = productsService.getAll();
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
    },

    // 6. Traer productos relacionados (misma categoría, excluyendo el actual)
    getRelated: (category, excludeId, limit) => {
        if (!category) return [];
        const products = productsService.getAll();
        const related = products.filter(p => p.category === category && p.id != excludeId);
        const shuffled = related.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
    }
};

module.exports = productsService;