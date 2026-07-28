const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiCategoriesController');

router.get('/', controller.list);
router.get('/:id', controller.detail);
router.post('/new', controller.create);
router.put('/:id/edit', controller.update);
router.delete('/:id/delete', controller.destroy);

module.exports = router;