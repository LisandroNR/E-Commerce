const express = require('express');
const router = express.Router();

// Importamos el controlador (Ajustado a tu mayúscula actual)
const mainController = require('../controllers/MainController');

// Definimos las rutas
router.get('/', mainController.home);
router.get('/product', mainController.product);
router.get('/cart', mainController.cart);
router.get('/checkout', mainController.checkout);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/product/error', mainController.error);

module.exports = router;