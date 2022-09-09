const path = require('path');
const fs = require('fs');
const { equal } = require('assert');

/* const nftFilePath = path.join(__dirname, '../data/nft.json');
const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8')); */

let db = require("../database/models");
let categoriesController = {
    list: (req, res) => {
        db.Category.findAll()
            .then(function (categories) {
                res.render('products/categories.ejs', { categories: categories })
            })
    },
    create: (req, res) => {
        res.render('products/categoryAdd.ejs')
    },
    store: (req, res) => {
        //creacion de las categorias en la base de datos
        console.log(req.body.name)
        db.Category.create({ 
            name: req.body.name == undefined ? "Test categoria" : req.body.name,
        })
            .then(() => {
                res.redirect("/categories")

            })
            .catch(error => res.send(error))
        }    
    
    /* ,
    listar: function (req, res) {
        db.User.findAll()
            .then(function (categories) {
                res.send(categories)
            })
    },
    listarProd: function (req, res) {
        db.Product.findAll()
            .then(function (categories) {
                res.send(categories)
            })
    },
    listarRol: function (req, res) {
        db.Role.findAll()
            .then(function (categories) {
                res.send(categories)
            })
    } */
}
module.exports = categoriesController;