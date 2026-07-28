const productsService = require('../services/productsService');
const categoriesService = require('../services/categoriesService');

const apiStatsController = {
    getStats: (req, res) => {
        try {
            const totalProducts = productsService.count();
            const totalCategories = categoriesService.count();
            
            // Devolvemos el JSON exactamente con la estructura que pide el profe
            res.json({
                totalProducts: totalProducts,
                totalCategories: totalCategories
            });
        } catch (error) {
            console.error("Error al obtener estadísticas:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};

module.exports = apiStatsController;