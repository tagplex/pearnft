const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const authMiddlewareEdit = require("../middlewares/authMiddlewareEdit");


//Configurar multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/images')
    },
    filename: function(req, file, cb){
        cb(null, "nft_" + Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({storage: storage});

// requerimiento de express validator

const { body } = require('express-validator');

const validations = [
    body('name')
        .notEmpty().withMessage('Debes colocar un nombre al NFT').bail()
        .isLength({ min: 5 }).withMessage('El nombre del NFT debe tener al menos 5 caracteres'),
    body('url').notEmpty().withMessage('Debes subir tu nft a IPFS y copies tu enlace acá'),
    body('priceeth').notEmpty().withMessage('Debes colocar tu valor en ETH, lo puedes cambiar cuando quieras'),
    body('description')
        .notEmpty().withMessage('Ingresa una breve descripción del NFT que venderas').bail()
        .isLength({ min : 20 }).withMessage('La descripcion del NFT debe contener al menos 20 caracteres'),
    body('category').notEmpty().withMessage('Debes seleccionar una categoria para tu NFT'),
    body('img').custom((value, {req}) => {
        let file = req.file;
        let acceptedextensions = ['.jpg', '.jpeg', '.png', '.gif'];
        

        if(!file) {
            throw new Error("Tienes que subir una imagen");
        } else {
            let fileextensions = path.extname(file.originalname);

            if(!acceptedextensions.includes(fileextensions)){
                throw new Error(`las extensiones permitidas son ${acceptedextensions.join(', ')}`);
            }

        }
        
        return true;
    })
]

const validationsEdit = [
    body('name')
        .notEmpty().withMessage('Debes colocar un nombre al NFT').bail()
        .isLength({ min: 5 }).withMessage('El nombre del NFT debe tener al menos 5 caracteres'),
    body('url').notEmpty().withMessage('Debes subir tu nft a IPFS y copies tu enlace acá'),
    body('priceeth').notEmpty().withMessage('Debes colocar tu valor en ETH, lo puedes cambiar cuando quieras'),
    body('description')
        .notEmpty().withMessage('Ingresa una breve descripción del NFT que venderas').bail()
        .isLength({ min : 20 }).withMessage('La descripcion del NFT debe contener al menos 20 caracteres'),
    body('category').notEmpty().withMessage('Debes seleccionar una categoria para tu NFT'),
    body('img').custom((value, {req}) => {
        let file = req.file;
        let acceptedextensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if(!file) {
            return true;
        } else {
            let fileextensions = path.extname(file.originalname);

            if(!acceptedextensions.includes(fileextensions)){
                throw new Error(`las extensiones permitidas son ${acceptedextensions.join(', ')}`);
            }
        }
        
        return true;
    })
]


const productsController = require ('../controllers/productsController')

//Obtener todos los productos para la vista products
router.get('/',productsController.index);
//Obtener todos los productos para la vista products
router.get('/myproducts', authMiddleware, productsController.myproducts);
/* //Crear todos los productos producto
router.get('/', productsController.index); */
// Ruta para buscar
router.get('/purchase', productsController.purchase);
router.get('/search', productsController.search);
//Crear un producto
router.get('/create', authMiddleware, productsController.create);
router.post('/', upload.single("img"), validations , productsController.store);
//Obtener un producto
router.get('/:id', authMiddleware, productsController.detail);
/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', authMiddleware, productsController.edit);
router.patch('/edit/:id', upload.single("img"), validationsEdit,  authMiddleware, productsController.update); 
//Ruta para deshabilitar productos
router.delete('/delete/:id', authMiddleware, productsController.disable);
//Ruta para habilitar productos
router.patch('/active/:id', authMiddleware, productsController.enable);


module.exports = router;