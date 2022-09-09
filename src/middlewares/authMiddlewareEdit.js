function authMiddleware(req, res, next){
    if (!req.session.userLogged){
        return res.redirect("/user/login");
    }/*  else if(req.session.userLogged.id != product[i].id_creator){
        return res.send("No es tu producto")
    } */
    next();
}

module.exports = authMiddleware;