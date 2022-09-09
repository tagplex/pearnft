const express = require ('express');
const router = express.Router();

const mainController = require ('../controllers/mainController')
const productController = require ('../controllers/productsController')

router.post('/', mainController.index); //LINEA QUE FALLA
router.get('/', mainController.index);
router.get('/cart',mainController.cart);

module.exports = router;