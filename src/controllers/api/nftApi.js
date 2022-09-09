const db = require("../../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const ruta = 'http://pearnft.shop';

const nftAPIController = {
    /* 'list': (req, res) => {
        db.Product.findAll({
            limit: 10,
            include: ['category'],
            attributes: ['id','name','image','price','description'], //Oculto datos como creador, estado, y quien creo el producto
            order: [['id','DESC']]
        })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: 'api/nft'
                    },
                    data: product
                }
                res.json(respuesta);
            })
    }, */

    'list': (req,res) => {

        let nfts = db.Product.findAll({where: {state: 1}, include: ['category']})
        let categories = db.Category.findAll()
        Promise.all([nfts, categories]).then(([nfts, categories]) =>{
            
            //Recorremos todos los nft que hay en la base de datos, siempre que esten activos.
            let nftsToSend = nfts.map((nft) => {
                return nft.dataValues;
            })
            //Recorremos las categorias que hay en la base de datos.
            let categoriesToSend = categories.map((category) => {
                return category.dataValues;
            })
            //Creamos arreglo para contabilizar el total de categorias y obtener sus nombre
            let categoriesNames = []
            let CategoryCount = []

            categoriesToSend.forEach((category) => {
                categoriesNames.push(category.name);
                CategoryCount.push(0)
            })
        
            nftsToSend.forEach((nft) => {
                CategoryCount[nft.id_category - 1] = CategoryCount[nft.id_category - 1] + 1
            })

            let countByCategoryToSend = {};
            for (let i = 0; i < categoriesNames.length; i++) {
                countByCategoryToSend[categoriesNames[i]] = CategoryCount[i];
            }
            
            nftsToSend.forEach((nft) => {
                delete nft.id_creator,
                delete nft.id_category
                delete nft.state,
                delete nft.created_at,
                delete nft.updated_at

                nft.urlNft = ruta + '/api/nft/'+ nft.id
            })

            return res.status(200).json({
                count: nfts.length,
                countByCategory: countByCategoryToSend,
                CategoryCount: categoriesToSend.length,
                nfts: nftsToSend,
                status: 200
            })
        })
        .catch(error => {console.log(error)});
    },
    'detail': (req, res) => {
        db.Product.findByPk(req.params.id,
            {
                include : ['category'],
                attributes: ['id','name','image','price','description'] //Oculto datos como creador, estado, y quien creo el producto

            })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,/* 
                        total: product.length, */
                        url: ruta + '/api/nft/' + req.params.id
                    },
                    data: product
                }
                res.json(respuesta);
            });
    },
    'listNFT': (req, res) => {
        db.Product.findAll({
            limit: 1,
            include: ['category'],
            attributes: ['id','name','image','price','description'], //Oculto datos como creador, estado, y quien creo el producto
            order: [['id','DESC']]
        })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: ruta + '/api/nft/last'
                    },
                    data: product
                }
                res.json(respuesta);
            })
    },
}

module.exports = nftAPIController;