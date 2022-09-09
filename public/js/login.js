window.addEventListener("load", function(){
    console.log("JS funcionando en login")
    let formularioLogin = document.querySelector("form.login")
    let validarCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let correo = document.querySelector("input.email");
    let password = document.querySelector("input.password")
    correo.addEventListener("change",function(){
        if(validarCorreo.test(correo.value)){
            correo.classList.add("is-valid")
        }
    })
    password.addEventListener("change",function(){
            password.classList.add("is-valid")
    })

    formularioLogin.addEventListener("submit", function(e){
        e.preventDefault();
        let validarCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        let correo = document.querySelector("input.email");
        let password = document.querySelector("input.password")
        let erroresCorreo = document.getElementById("errorCorreo")
        let erroresPassword = document.getElementById("errorPassword")

        if(correo.value == "" && password.value == ""){
            correo.classList.add("is-invalid")
            password.classList.add("is-invalid")
            erroresCorreo.innerHTML = "Debes ingresar un correo."
            erroresPassword.innerHTML = "Debes ingresar una contraseña."
        } else if(!validarCorreo.test(correo.value)){
            correo.classList.add("is-invalid")
            erroresCorreo.innerHTML = "Debes ingresar un correo valido."
        } else if (password.value == ""){
            password.classList.add("is-invalid")
            erroresPassword.innerHTML = "Debes ingresar una contraseña."
        } else {
            formularioLogin.submit();
        }
    })
})