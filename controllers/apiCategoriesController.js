const categoriesService = require('../services/categoriesService');

const apiCategoriesController = {
    list: (req, res) => res.json(categoriesService.getAll()),
    detail: (req, res) => {
        const category = categoriesService.getById(req.params.id);
        category ? res.json(category) : res.status(404).json({ error: "Categoría no encontrada" });
    },
    create: (req, res) => {
        // --- INICIO DE LA SECCIÓN DE DIAGNÓSTICO ---
        console.log("------------------------------------------");
        console.log("🕵️ Intentando crear categoría con estos datos:");
        console.log(req.body); // Esto nos dirá si React está mandando los datos bien
        console.log("------------------------------------------");
        
        try {
            const id = categoriesService.create(req.body);
            res.status(201).json({ id, ...req.body });
        } catch (error) {
            // Si la base de datos falla (ej: falta una columna), entrará acá
            console.error("❌ ERROR AL CREAR EN LA BASE DE DATOS:");
            console.error(error); // ESTE ES EL MENSAJE QUE ESTAMOS BUSCANDO
            res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
        }
        // --- FIN DE LA SECCIÓN DE DIAGNÓSTICO ---
    },
    update: (req, res) => {
        try {
            categoriesService.update(req.params.id, req.body) 
                ? res.json({ message: "Categoría actualizada" })
                : res.status(404).json({ error: "No encontrada" });
        } catch (error) {
            console.error("❌ ERROR AL ACTUALIZAR:");
            console.error(error);
            res.status(500).json({ error: "Error interno al actualizar" });
        }
    },
    destroy: (req, res) => {
        try {
            categoriesService.delete(req.params.id)
                ? res.json({ message: "Categoría eliminada" })
                : res.status(404).json({ error: "No encontrada" });
        } catch (error) {
            console.error("❌ ERROR AL ELIMINAR:");
            console.error(error);
            res.status(500).json({ error: "Error interno al eliminar" });
        }
    }
};

module.exports = apiCategoriesController;