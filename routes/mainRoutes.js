// routes/mainRoutes.js
const express = require('express');
const router = express.Router();

// Importamos el controlador que creamos en el paso anterior
const mainController = require('../controllers/mainController');

// Definimos las rutas y las conectamos con su función en el controlador
router.get('/', mainController.home);
router.get('/product', mainController.product);
router.get('/cart', mainController.cart);
router.get('/checkout', mainController.checkout);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/product/error', mainController.error);

module.exports = router;