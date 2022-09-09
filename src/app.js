const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const methodOverride = require('method-override');
const session = require("express-session");
const cookies = require("cookie-parser");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const swaggerDocument = require('./data/pear-api-doc.json');
const cors = require('cors');

const ruta =  "http://pearnft.shop";
const puerto = 3001;

/* const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pear API",
      version: "1.0.0",
      description: "Proyecto final del grupo 7 de la comision 14 del curso de Programacion Web Full Stack de DH."
    },
    servers: [
      {
        url: "http://localhost:3001/api" //una vez publicado, cambiar a pearnft.shop
      }
    ]
  },
  apis: ["./routes/api/*.js"]
} */

//const specs = swaggerJsDoc(options)

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(session({
  secret: "grupoPear",
  resave: false,
  saveUninitialized: false,
}));

app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors());

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const userRouter = require("./routes/user");
const categoriesRouter = require("./routes/category");
//const adminRouter = require("./routes/admin")

//Rutas de las api de productos
const apiNftRouter = require('./routes/api/nft')
const apiUserRouter = require('./routes/api/user')
const apiCategoryRouter = require('./routes/api/category')

app.use('/', mainRouter); //Rutas del menu principal
app.use('/products', productsRouter); // Rutas de los productos
app.use('/categories', categoriesRouter); // Rutas de las categorias
app.use('/user', userRouter);
app.use('/register', userRouter);
//app.use('/admin', adminRouter); Rutas del panel de administrador

//Aquí creo la colección de mis recursos de productos (APIs)
app.use('/api/nft', apiNftRouter);
app.use('/api/user', apiUserRouter);
app.use('/api/category', apiCategoryRouter);

app.listen(puerto, () => {
  console.log("Servidor funcionando "+ruta+":"+puerto)
})

