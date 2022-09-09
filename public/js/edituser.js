window.addEventListener("load", function(){
    console.log("JS funcionando en edit user")
    let formularioEdit = document.querySelector("form.edit")
     
    formularioEdit.addEventListener("submit", function(e){
        e.preventDefault();
        let nombre = document.getElementById("first_name");
        let apellido = document.getElementById("input.last_name");  
        let errorNombre = document.getElementById("errorNombre")
        let errorApellido = document.getElementById("errorApellido")
        if(nombre == "" && apellido == ""){
            errorNombre.innerHTML = "Debes ingresar un correo."
            errorApellido.innerHTML = "Debes ingresar un correo."
        }
    })
})