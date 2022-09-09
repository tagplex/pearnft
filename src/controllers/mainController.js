const path = require('path');
const fs = require('fs');
let db = require("../database/models");
const Op = db.Sequelize.Op;


const controladorMain ={
    index: (req, res) => {
        db.Product.findAll({
            limit: 3,
            include: ['category'],
            attributes: ['id','name','image','price','description'], //Oculto datos como creador, estado, y quien creo el producto
            /* order: [
                [db.sequelize.literal('RAND()')]
              ] */
            order: [['id','DESC']]
        })
        .then(function (products){
         return res.render("index.ejs", {products: products}) 
           
        })
        .catch(error => res.send(error))
    },
    cart:(req,res)=>{
        res.render('users/shoppingcart'/*, {nft:nft}*/)
    }
}

module.exports = controladorMain;