const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/products/:id', mainController.product);
router.get('/categories/:category', mainController.category);

// RUTAS DEL CARRITO
router.get('/cart', mainController.cart); // Ver el carrito
router.post('/cart/add', mainController.addToCart); // Agregar producto
router.post('/cart/update', mainController.updateCart); // Sumar o restar
router.post('/cart/empty', mainController.emptyCart); // Vaciar todo

router.get('/checkout', mainController.checkout);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/product/error', mainController.error);

module.exports = router;