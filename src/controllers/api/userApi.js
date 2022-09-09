const db = require("../../database/models");

const ruta = 'http://pearnft.shop';

const userAPIController = {
    'list': (req, res) => {
        db.User.findAll({ 
                /* include: { association: 'role' }, */
                attributes: ['id','first_name','last_name','username','email','profile_image']
            })
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: ruta+'/api/user'
                    },
                    data: user
                }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.User.findByPk(req.params.id,
            {
                /* include : ['role'], */
                attributes: ['id','first_name','last_name','username','email','profile_image']
            })
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: ruta+'/api/user/'+req.params.id
                    },
                    data: user
                }
                res.json(respuesta);
            });
    }
}

module.exports = userAPIController;