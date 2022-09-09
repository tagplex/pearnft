window.addEventListener("load", function () {
    console.log("JS funcionando en register")
    let formularioRegister = document.querySelector("form.register")
    let validarCorreo = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let validarNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    let validarNombreUsuario = /^[a-zA-Z0-9\_\-]{4,16}$/;
    let validarPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let nombre = document.getElementById("first_name")
    let apellido = document.getElementById("last_name")
    let email = document.getElementById("email")
    let username = document.getElementById("username")
    let password = document.getElementById("password")
    let repeatPassword = document.getElementById("repeatPassword")

    nombre.addEventListener("change", function () {
        if (validarNombre.test(nombre.value)) {
            nombre.classList.add("is-valid")
        }
    })
    apellido.addEventListener("change", function () {
        if (validarNombre.test(apellido.value)) {
            apellido.classList.add("is-valid")
        }
    })
    email.addEventListener("change", function () {
        if (validarCorreo.test(email.value)) {
            email.classList.add("is-valid")
        }
    })
    username.addEventListener("change", function () {
        if (validarNombreUsuario.test(username.value)) {
            username.classList.add("is-valid")
        }
    })
    password.addEventListener("change", function () {
        if (validarPassword.test(password.value)) {
            password.classList.add("is-valid")
        }
    })
    repeatPassword.addEventListener("change", function () {
        if (repeatPassword.value == password.value) {
            password.classList.add("is-valid")
        }
    })

    formularioRegister.addEventListener("submit", function (e) {
        e.preventDefault();
        let validarCorreo = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        let validarNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        let validarNombreUsuario = /^[a-zA-Z0-9\_\-]{4,16}$/;
        let validarPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        let nombre = document.getElementById("first_name")
        let apellido = document.getElementById("last_name")
        let email = document.getElementById("email")
        let username = document.getElementById("username")
        let password = document.getElementById("password")
        let repeatPassword = document.getElementById("repeatPassword")
        let terminos = document.getElementById("terminos")
        let mayor = document.getElementById("mayor")
        let errorNombre = document.getElementById("errorFirst")
        let errorApellido = document.getElementById("errorLast")
        let errorEmail = document.getElementById("errorEmail")
        let errorUsername = document.getElementById("errorUsername")
        let errorPassword = document.getElementById("errorPassword")
        let errorRepeatPassword = document.getElementById("errorRepeatPassword")
        let errorTerminos = document.getElementById("errorTerminos")
        let errorMayor = document.getElementById("errorMayor")

        if (nombre.value == "" && apellido.value == "" && email.value == "" && username.value == "" &&  password.value == "" && repeatPassword.value == "") {
            nombre.classList.add("is-invalid")
            errorNombre.innerHTML = "Debes ingresar un nombre."
            apellido.classList.add("is-invalid")
            errorApellido.innerHTML = "Debes ingresar un apellido."
            email.classList.add("is-invalid")
            errorEmail.innerHTML = "Debes ingresar un correo."
            username.classList.add("is-invalid")
            errorUsername.innerHTML = "Debes ingresar un nombre de usuario."
            password.classList.add("is-invalid")
            errorPassword.innerHTML = "Debes ingresar una contraseña."
            repeatPassword.classList.add("is-invalid")
            errorRepeatPassword.innerHTML = "Debes ingresar una contraseña."
        } else if (!validarNombre.test(nombre.value)) {
            nombre.classList.add("is-invalid")
            errorNombre.innerHTML = "Debes ingresar un nombre valido."
        } else
        if (apellido.value == "") {
            apellido.classList.add("is-invalid")
            errorApellido.innerHTML = "Debes ingresar un apellido."
        } else if (!validarNombre.test(apellido.value)) {
            apellido.classList.add("is-invalid")
            errorApellido.innerHTML = "Debes ingresar un apellido valido."
        } else
        if (email.value == "") {
            email.classList.add("is-invalid")
            errorEmail.innerHTML = "Debes ingresar un correo."
        } else if (!validarCorreo.test(email.value)) {
            email.classList.add("is-invalid")
            errorEmail.innerHTML = "Debes ingresar un correo con formato valido."
        } else
        if (username.value == "") {
            username.classList.add("is-invalid")
            errorUsername.innerHTML = "Debes ingresar un nombre de usuario."
        } else if (!validarNombreUsuario.test(username.value)) {
            username.classList.add("is-invalid")
            errorUsername.innerHTML = "Debes ingresar un correo con nombre de usuario valido."
        } else
        if (password.value == "") {
            password.classList.add("is-invalid")
            errorPassword.innerHTML = "Debes ingresar una contraseña."
        } else if (!validarPassword.test(password.value)) {
            password.classList.add("is-invalid");
            errorPassword.innerHTML = "Debes ingresar una contraseña segura con mayuscula, minuscula, numeros y caracteres especiales."
        } else
        if (repeatPassword.value == "") {
            repeatPassword.classList.add("is-invalid")
            errorRepeatPassword.innerHTML = "Debes ingresar una contraseña."
        } else if (repeatPassword.value != password.value) {
            repeatPassword.classList.add("is-invalid");
            errorRepeatPassword.innerHTML = "Debes ingresar la misma contraseña."
        }
        else {
            formularioRegister.submit();
        }
    })
})