function authAdminMiddleware(req, res, next){
    if (req.session.userLogged.id_rol == 1) {
        next();
    } else {
        res.render('users/404admin.ejs')
    }
}

module.exports = authAdminMiddleware;