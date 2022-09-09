const path = require('path');
const fs = require('fs');
const { equal } = require('assert');
const { validationResult } = require('express-validator');


/* const nftFilePath = path.join(__dirname, '../data/nft.json');
const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8')); */

let db = require("../database/models");
const Op = db.Sequelize.Op;

const controladorProducts = {
    index: (req, res) => {
        //Listado de NFT desde la base de datos con sequelize
        let pedidoProducto = db.Product.findAll({ where: { state: 1 } });

        let pedidoCreador = db.User.findAll();

        Promise.all([pedidoProducto, pedidoCreador])
            .then(function ([products, creators]) {

                res.render('products/products.ejs', { products: products, creators: creators })
            })

        //Listado de NFT desde un archibo JSON

        /*  const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
         let nftFiltrados = nft.filter(article => article.condition == 1)
         
         res.render('products/products.ejs', { nftFiltrados }) */
    },
    myproducts: (req, res) => {
        //Listado de NFT desde la base de datos con sequelize
        let id_usuario = req.session.userLogged.id
        let pedidoProducto = db.Product.findAll({
            where: { id_creator: id_usuario }
        });
        let pedidoCreador = db.User.findAll();

        Promise.all([pedidoProducto, pedidoCreador])
            .then(function ([products, creators]) {

                res.render('products/myproducts.ejs', { products: products, creators: creators })
            })

        //Listado de NFT desde un archibo JSON

        /*  const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
         let nftFiltrados = nft.filter(article => article.condition == 1)
         
         res.render('products/products.ejs', { nftFiltrados }) */
    },
    create: (req, res) => {
        db.Category.findAll()
            .then(function (categories) {
                return res.render("products/create.ejs", { categories: categories })
            })
        /* res.render('products/create.ejs') */
    },
    detail: (req, res) => {
        //obteniendo detalle desde la base de datos
        /* console.log(req.params.id); */
        db.Product.findByPk(req.params.id, { include: ["creator", "category"] })
            .then(function (product) {
                if (product) {
                    res.render('products/details', { product: product });
                } else {
                    res.render('products/404')
                }
            })
            .catch(error => res.send(error))

        /*  // entrega de datos de detalle co el json
         let nftDetail = nft.find(nft => req.params.id == nft.id)
         if(nftDetail.condition == 0){
             res.render('products/404')
         }else{
         res.render('products/details', { nftDetail: nftDetail })
         } */
    },

    edit: (req, res) => {
        let id_usuario = req.session.userLogged.id
        let pedidoProducto = db.Product.findByPk(req.params.id);
        let pedidoCreador = db.User.findAll();
        let pedidoCategoria = db.Category.findAll();

        Promise.all([pedidoProducto, pedidoCreador, pedidoCategoria])
            .then(function ([product, creator, category]) {
                if (product) {
                    if (product.id_creator == id_usuario) {
                        res.render("products/edit", { product: product, creator: creator, category: category });
                    } else {
                        res.render('products/404')
                    }
                } else {
                    res.render('products/404')
                }
            })

        /* const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        let id = req.params.id
        let productToEdit = nft.find(article => article.id == id)
        res.render('products/edit', { productToEdit }) */
    },
    update: (req, res) => {

        const resultValidations = validationResult(req);
        if (resultValidations.errors.length > 0) {

            let pedidoProducto = db.Product.findByPk(req.params.id);
            let pedidoCreador = db.User.findAll();
            let pedidoCategoria = db.Category.findAll();
            Promise.all([pedidoProducto, pedidoCreador, pedidoCategoria])
                .then(function ([product, creator, category]) {
                    if (req.session.userLogged.id == product.id_creator) {
                        res.render("products/edit", {
                            product: product, creator: creator, category: category, errors: resultValidations.mapped(),
                            oldData: req.body
                        });
                    } else {
                        res.render('products/404')
                    }
                })
                .catch(error => res.send(error))

        } else {
            let id_usuario = req.session.userLogged.id
            db.Product.update({
                name: req.body.name,
                id_category: req.body.category,
                image: req.file == undefined ? db.Product.image : req.file.filename,
                url: req.body.url,
                cid: req.file == undefined ? req.body.name : req.file.filename,
                price: req.body.priceeth,
                description: req.body.description == "" ? "Producto sin descripción" : req.body.description,
                id_creator: id_usuario,
                state: 1 //estado siempre sera 1. En 0 el producto se deshabilita

            }, {
                where: {
                    id: req.params.id
                }
            })
                .then(() => {

                    res.redirect("/products")

                })
                .catch(error => res.send(error))

        }

        //Hay campos como el autor, el price en usd y el rating que no deben modificarse.
        /*  const products = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
         let productToEdit = products.find(product => product.id == req.params.id)
         let editedProduct = {
             id: productToEdit.id,
             name: req.body.name,
             author: productToEdit.author,
             category: req.body.category == "" ? productToEdit.category : req.body.category,
             priceeth: req.body.priceeth,
             priceusd: productToEdit.priceusd,
             url: req.body.url,
             rating: productToEdit.rating,
             description: req.body.description,
             condition: productToEdit.condition,
             img: req.file == undefined ? productToEdit.img : "/img/images/" + req.file.filename
         }
         let indice = products.findIndex(product => product.id == req.params.id);
         products[indice] = editedProduct;
         fs.writeFileSync(nftFilePath, JSON.stringify(products, null, " "));
         res.redirect("/products"); */
    },
    store: (req, res) => {

        //validation de datos por express -validator

        const resultValidations = validationResult(req);

        if (resultValidations.errors.length > 0) {

            db.Category.findAll()
                .then(function (categories) {
                    return res.render("products/create.ejs", {
                        categories: categories,
                        errors: resultValidations.mapped(),
                        oldData: req.body
                    });
                })

        } else {

            //creacion del NFT en la base de datos
            let id_usuario = req.session.userLogged.id
            db.Product.create({
                name: req.body.name,
                id_category: req.body.category,
                image: req.file == undefined ? "default.jpg" : req.file.filename,
                url: req.body.url,
                cid: req.file == undefined ? req.body.name : req.file.filename,
                price: req.body.priceeth,
                description: req.body.description == "" ? "Producto sin descripción" : req.body.description,
                id_creator: id_usuario,
                state: 1

            })
                .then(() => {

                    res.redirect("/products")

                })
                .catch(error =>
                    res.send(error))

        }


        //El if lo utilizaremos para rescatar errores. Por el momento no se exigen validaciones, simplemente lo cargo vacio y con una imagen por defecto

        // Creacion de datos a una estructura JSON
        /* const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        let newNFT = {
            id: nft[nft.length - 1].id + 1,
            name: req.body.name,
            author: "defaultAuthor",
            category: req.body.category,
            priceeth: req.body.priceeth,
            priceusd: req.body.priceeth,
            url: req.body.url,
            rating: "0/5",
            description: req.body.description,
            condition: 1,
            img: req.file == undefined ? "/img/images/default.jpg" : "/img/images/" + req.file.filename
        }
        nft.push(newNFT);
        fs.writeFileSync(nftFilePath, JSON.stringify(nft, null, " "));
        res.redirect("/products") */
    },
    disable: (req, res) => {
        db.Product.update({
            state: 0
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {

                res.redirect("/products/myproducts");

            })
            .catch(error => res.send(error))




        /* const products = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        let productToEdit = products.find(product => product.id == req.params.id)
        let editedProduct = {
            id: productToEdit.id,
            name: productToEdit.name,
            author: productToEdit.author,
            category: productToEdit.category,
            priceeth: productToEdit.priceeth,
            priceusd: productToEdit.priceusd,
            url: productToEdit.url,
            rating: productToEdit.rating,
            description: req.body.description,
            condition: 0,
            img: productToEdit.img
        }
        let indice = products.findIndex(product => product.id == req.params.id);
        products[indice] = editedProduct;
        fs.writeFileSync(nftFilePath, JSON.stringify(products, null, " "));
        res.redirect("/products"); */
    },
    enable: (req, res) => {
        db.Product.update({
            state: 1
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {

                res.redirect("/products/myproducts");

            })
            .catch(error => res.send(error))
    },
    search: (req, res) => {
        let nftBuscado = '%' + req.query.search + '%';

        let pedidoCreador = db.User.findAll();

        let pedidoProducto = db.Product.findAll({
            where: {
                name: { [Op.like]: nftBuscado },
                state: 1
                }});


        Promise.all([pedidoProducto, pedidoCreador])
            .then(function ([results, creators]) {

                res.render('products/productsSearch.ejs', { results: results, creators: creators })
            })
            .catch(error => res.send(error))
    },
    viewCart: (req, res) => {
        let productsInCart = JSON.parse(localStorage.getItem("id"))
        let products = []
        for (i of productsInCart) {
            db.Product.findByPk(i.id).then((item) => {
                products.push(item)
            })
        }
        console.log(products)
        res.render('users/shoppingcart', { products: products })

    },
    purchase: (req, res) => {
        res.render('products/purchase')
    }
}

module.exports = controladorProducts;