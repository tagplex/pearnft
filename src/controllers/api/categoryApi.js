const db = require("../../database/models");

const ruta = 'http://pearnft.shop';

const categoryAPIController = {
    'list': (req, res) => {
        db.Category.findAll()
            .then(category => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: category.length,
                        url: ruta+'/api/category'
                    },
                    data: category
                }
                res.json(respuesta);
            })
    }
}

module.exports = categoryAPIController;