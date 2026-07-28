const productsService = require('../services/productsService');

const apiProductsController = {
    // 1. Obtener todos los productos (GET /api/products)
    list: (req, res) => {
        try {
            const products = productsService.getAll();
            // Respondemos con un JSON puro para que React lo entienda
            res.json(products);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // 2. Obtener un solo producto (GET /api/products/:id)
    detail: (req, res) => {
        try {
            const product = productsService.getById(req.params.id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // 3. Crear un producto nuevo (POST /api/products/new)
    create: (req, res) => {
        try {
            // req.body trae los datos que manda el formulario de React
            const newId = productsService.create(req.body);
            res.status(201).json({ 
                message: "Producto creado con éxito", 
                data: { id: newId, ...req.body } 
            });
        } catch (error) {
            console.error("Error al crear producto:", error);
            res.status(500).json({ error: "Error interno al crear el producto" });
        }
    },

    // 4. Modificar un producto (PUT /api/products/:id/edit)
    update: (req, res) => {
        try {
            const updated = productsService.update(req.params.id, req.body);
            if (updated) {
                res.json({ message: "Producto actualizado correctamente" });
            } else {
                res.status(404).json({ error: "Producto no encontrado para actualizar" });
            }
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            res.status(500).json({ error: "Error interno al actualizar el producto" });
        }
    },

    // 5. Eliminar un producto (DELETE /api/products/:id/delete)
    destroy: (req, res) => {
        try {
            const deleted = productsService.delete(req.params.id);
            if (deleted) {
                res.json({ message: "Producto eliminado correctamente" });
            } else {
                res.status(404).json({ error: "Producto no encontrado para eliminar" });
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            res.status(500).json({ error: "Error interno al eliminar el producto" });
        }
    }
};

module.exports = apiProductsController;