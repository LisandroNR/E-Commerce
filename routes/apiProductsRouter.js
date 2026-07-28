const express = require('express');
const router = express.Router();

// Importamos el controlador que creaste en el paso anterior
const apiProductsController = require('../controllers/apiProductsController');

// --------------------------------------------------------
// RUTAS DE LA API (Todas estas van a arrancar con /api/products)
// --------------------------------------------------------

// GET: Listar todos los productos (/api/products)
router.get('/', apiProductsController.list);

// POST: Crear nuevo producto (/api/products/new)
// ¡OJO! Ponemos el 'new' ANTES del ':id' para que Express no se confunda
router.post('/new', apiProductsController.create);

// GET: Detalle de un producto específico (/api/products/:id)
router.get('/:id', apiProductsController.detail);

// PUT: Modificar un producto existente (/api/products/:id/edit)
router.put('/:id/edit', apiProductsController.update);

// DELETE: Eliminar un producto (/api/products/:id/delete)
router.delete('/:id/delete', apiProductsController.destroy);

module.exports = router;