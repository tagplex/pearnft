window.addEventListener("load", function(){
    console.log("Trabajando")
    let formularioRegister = document.querySelector("form.register")
    formularioRegister.addEventListener("submit", function(e){
        e.preventDefault();
        let validarCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        let validarNombre =  /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        let validarNombreUsuario =  /^[a-zA-Z0-9\_\-]{4,16}$/;
        let nombre = document.querySelector("input.first_name");
        if(nombre.value == ""){
            nombre.classList.add("is-invalid")
            /* key("Atención!", "Debes ingresar un Nombre.", "info"); */
        } else if(!validarNombre.test(nombre.value)){
            nombre.classList.add("is-invalid")
            /* key("Atención!", "Debes ingresar un Nombre valido.", "info"); */
        }
        let apellido = document.querySelector("input.last_name");
        if(apellido.value == ""){
            apellido.classList.add("is-invalid")
            /* key("Atención!", "Debes ingresar un Apellido.", "info"); */
        } else if(!validarNombre.test(nombre.value)){
            apellido.classList.add("is-invalid")
            /* key("Atención!", "Debes ingresar un Apellido valido.", "info"); */
        }
        let correo = document.querySelector("input.email");
        if(correo.value == ""){
            correo.classList.add("is-invalid")
           /*  key("Atención!", "Debes ingresar un correo.", "info"); */
        } else if(!validarCorreo.test(correo.value)){
            correo.classList.add("is-invalid")
            /* key("Atención!", "Debes ingresar un correo valido.", "info"); */
        }
        let nombreUsuario = document.querySelector("input.username");
        if(nombreUsuario.value == ""){nombreUsuario.classList.add("is-invalid")
            /* key("Atención!", "Debes ingresar un Nombre de usuario.", "info"); */
        } else if(!validarNombreUsuario.test(nombre.value)){
            nombreUsuario.classList.add("is-invalid")
            /* key("Atención!", "Debes ingresar un Nombre de Usuario valido.", "info"); */
        }
        let password = document.querySelector("input.password");
        if (password.value.length < 6){
            password.classList.add("is-invalid")
            /* key("Atención!", "La contraseña debe tener al menos 6 caracteres.", "info"); */
        }else if(password.value == ""){
            password.classList.add("is-invalid")
            /* key("Atención!", "Debes ingresar una contraseña.", "info"); */

        }
        let repeat_password = document.querySelector("input.repeatPassword")
        if (repeat_password.value.length < 6){
            repeat_password.classList.add("is-invalid")
            /* key("Atención!", "La contraseña debe tener al menos 6 caracteres.", "info"); */
        }else if(repeat_password.value != password.value){
            repeat_password.classList.add("is-invalid")
            /* key("Atención!", "Ambas contraseñas deben ser iguales.", "info"); */
        }else{
            formularioRegister.submit();
        }
        let errorBack = document.querySelector("input.errorLogin")
        
        /* if(){
            formularioRegister.key();
        }
     */
    })
})