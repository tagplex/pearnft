const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const authAdminMiddleware = require("../middlewares/authAdminMiddleware")


const categoriesController = require ('../controllers/categoriesController')

//Obtener todos los productos para la vista products
router.get('/', authMiddleware,authAdminMiddleware, categoriesController.list);
router.get('/create', authAdminMiddleware, categoriesController.create);
router.post('/', authMiddleware, categoriesController.store);



module.exports = router;
