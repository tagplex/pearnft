const path = require('path');
const fs = require('fs');
const { equal } = require('assert');
const bcrypt = require('bcryptjs');
const session = require('express-session');
let db = require("../database/models");
const { default: Swal } = require('sweetalert2');
const { validationResult } = require("express-validator");

const controladorUser = {
    login: (req, res) => {
        return res.render('users/login.ejs')
    },
    loginProcess: (req, res) => { 
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("users/login.ejs", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userToLogin = db.User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user) {
                    let contraseñaCorrecta = bcrypt.compareSync(req.body.password, user.password);
                    if (contraseñaCorrecta) {
                        req.session.userLogged = user;

                        if(req.body.recordar){
                            res.cookie('email', req.body.email, { maxAge: (1000 * 90) * 10 })
                        }
                        return res.redirect("/user/profile")
                    }
                }
                return res.render('users/login.ejs', {
                    errors: {
                        emailpass: {
                            msg: "Datos de usuario incorrectos"
                        } 
                    }
                })
            })
    },
    profile: (req, res) => {
        console.log(req.cookies.userEmail)
        res.render('users/profile.ejs', { user: req.session.userLogged })
    },

    register: (req, res) => {
        res.render('users/register.ejs')
    },
    store: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("users/register.ejs", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        const newEmail = db.User.findOne({ where: { email: req.body.email } })
        const newUser = db.User.findOne({ where: { username: req.body.username } })
        Promise.all([newEmail, newUser])
            .then(function (user, email) {
                /* if (email != null || email != undefined || email != "") {
                    return res.render('users/register.ejs', {
                        errors: {
                            emailinuse: {
                                msg: "El correo registrado ya esta en uso."
                            }
                        }
                    })
                }

                if (user != null || user != undefined || user != "") {
                    return res.render('users/register.ejs', {
                        errors: {
                            usernameuse: {
                                msg: "El usuario ingresado ya esta en uso."
                            }
                        }
                    })
                } */
                db.User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    profile_image: req.file == undefined ? "default_user.jpg" : req.file.filename,
                    user_state: 1,
                    id_rol: 2

                })
                    .then(() => {
                        res.render('users/loginAfterReg.ejs')
                    })
                    .catch(error => {
                        if (error.errors[0].path == "email") {
                            return res.render('users/register.ejs', {
                                errors: {
                                    duplicado: {
                                        msg: "Ya existe una cuenta con ese correo"
                                    },
                                    oldData: req.body
                                }
                            })
                        } else {
                            return res.render('users/register.ejs', {
                                errors: {
                                    duplicado: {
                                        msg: "Ya existe una cuenta con ese nombre de usuario"
                                    },
                                    oldData: req.body
                                }
                            })
                        }
                    })
            })
    },

    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect("/");
    },

    edit: (req, res) => {
        res.render('users/edit.ejs', { user: req.session.userLogged })
    },

    update: (req, res) => {
        let user = req.session.userLogged
        db.User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_image: req.file == undefined ? user.profile_image : req.file.filename,
            user_state: 1,
            id_rol: 2
        }, {
            where: { id: user.id }
        })
            .then(() => {

                req.session.destroy();
                res.redirect("/user/login")

            })
            .catch(error => res.send(error))
    },
    list: (req, res) => {
        db.User.findAll()
            .then(function (users) {
                res.render('users/users.ejs', { users: users })
            })
    }
}

module.exports = controladorUser;