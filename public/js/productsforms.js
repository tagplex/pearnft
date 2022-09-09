window.addEventListener("load", function(){

    

    
    let formulario = document.querySelector("form.formulario");

    formulario.addEventListener("submit", function(e){
        e.preventDefault();

        
        
        let campoNombre = document.querySelector("#nombrenft");
        let erroresName = [];

        if (campoNombre.value == "") {
            erroresName = "mínimo 5 caracteres ";
            let ulErrores2 = document.getElementById("nombrenft");
            ulErrores2.placeholder = erroresName;
            
        } else if (campoNombre.value.length < 5) {
            erroresName = (" mínimo 5");
            let ulErrores = document.getElementById("nombreProducto");
            ulErrores.classList.add("errores");
            ulErrores.innerHTML = "Nombre de tu producto(*)" + erroresName;
           
        } else if(campoNombre.value.length >= 5){
            let ulErrores = document.getElementById("nombreProducto");
            ulErrores.classList.remove("errores");
            ulErrores.innerHTML = "Nombre de tu producto(*)";

        }

        
        
        let campoDescription = document.querySelector("#descripcion");

        let erroresDescription = [];

        if (campoDescription.value == "") {
            erroresDescription = "mínimo 20 caracteres ";
            let ulErrores4 = document.getElementById("descripcion");
            ulErrores4.placeholder = erroresDescription;
            
        } else if (campoDescription.value.length < 20) {
            erroresDescription = (" mínimo 20");
            let ulErrores3 = document.getElementById("descriptionProducto");
            ulErrores3.classList.add("errores");
            ulErrores3.innerHTML = "Descripcion(*)" + erroresDescription;
           
        } else if(campoDescription.value.length >= 20){
            let ulErrores3 = document.getElementById("descriptionProducto");
            ulErrores3.classList.remove("errores");
            ulErrores3.innerHTML = "Descripcion(*)";

        }



            console.log("validando imagen");
            var fileInput = document.getElementById('file');
            var filePath = fileInput.value;
            var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
            if(!allowedExtensions.exec(filePath)){
                alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
                fileInput.value = '';
                return false;
            }else{
                //Image preview
                console.log("imagen validada");
                if (fileInput.files && fileInput.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }
            }
       

       
       

       
        if (erroresName.length < 1 && erroresDescription < 1 && allowedExtensions.exec(filePath)){
            formulario.submit();

        }


    });
})