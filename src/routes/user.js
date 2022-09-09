const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const bcrypt = require('bcryptjs')
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const authAdminMiddleware = require("../middlewares/authAdminMiddleware")
const { body } = require("express-validator");

//Configurar multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/images/users')
    },
    filename: function(req, file, cb){
        cb(null, "user_" + Date.now() + path.extname(file.originalname))
    },
});

const validationLogin = [
    body("email")
        .notEmpty().withMessage("Debes escribir un correo electronico").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo valido"),
    body("password").notEmpty().withMessage("Debes escribir una contraseña"),
]

const validationRegister = [
    body("first_name")
        .notEmpty().withMessage("Debes escribir un nombre")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("last_name")
        .notEmpty().withMessage("Debes escribir un apellido")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("email")
        .notEmpty().withMessage("Debes escribir un correo electronico").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo valido"),
    body("username")
        .notEmpty().withMessage("Debes escribir un nombre de usuario")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("password")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1}).withMessage("La contraseña debe tener mayusculas, minusculas, numeros y caracteres especiales"),  
    body("repeatPassword")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .custom((value, { req })=>{
            if(req.body.password != req.body.repeatPassword){
                throw new Error("Las contraseñas no son iguales");
            }
            return true;
        }),
    body("terminos").notEmpty().withMessage("Debes aceptar los terminos"),
    body("mayor").notEmpty().withMessage("Este campo es requerido"),
    body('img').custom((value, {req}) => {
        let file = req.file;
        let acceptedextensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if(!file){
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

const upload = multer({storage: storage});
const userController = require ('../controllers/userController')
 
router.get('/login', guestMiddleware, userController.login);
router.get('/loginReg', guestMiddleware, userController.login);
router.post('/login', validationLogin ,userController.loginProcess);
router.get('/register', guestMiddleware, userController.register);
router.post("/register", userController.register);
router.post('/', upload.single("img"), validationRegister, userController.store);       
router.get('/', authMiddleware, authAdminMiddleware, userController.list);
router.get("/profile", authMiddleware, userController.profile);
router.get('/logout', userController.logout);
router.get('/edit/:id', authMiddleware, userController.edit);
router.patch('/edit/:id', upload.single("img"), userController.update);

module.exports = router;