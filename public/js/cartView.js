window.addEventListener("load", function(){
    let productosEnCarrito = JSON.parse(localStorage.getItem("cart"))
    console.log(productosEnCarrito)
    let displayProductos = document.querySelector("#productos-carrito")
    let botonesFinales = document.querySelector("#botones")
    let precioFinal = document.querySelector("#precioFinal")

    let precioTotal = 0;

    if(productosEnCarrito == null){
        displayProductos.innerHTML += "<h3 class='carritoVacio'>Tu carrito esta vacio!</h3>"
    } else{
        for(producto of productosEnCarrito){
            displayProductos.innerHTML += 
            "<article class='articulosCarrito'><div class='productoImagenDescripcion'><button class='botonQuitar'><i class='fas fa-times boton-quitar' id= '"+producto.id+"'></i></button><img src='"+ producto.img +"' alt='producto1' class='imgProductos'><div><h3 class='tituloProducto'>"+ producto.nombre+"</h3><p class='precios'>Precio:</p><p class='precios'>"+producto.precio +" ETH</p></div></div><div class='precioProd'></div></article>"
            precioTotal += producto.precio            
        }
        precioFinal.innerHTML += "<div><p class='precioProdTotal'>Total: ~"+precioTotal.toFixed(2)+" ETH</p></div>"
        botonesFinales.innerHTML += "<div class='botonesPago'><button class='botonPago'>Proceder al Pago</button><a href='/' class='linkSeguirComprando'>Seguir Comprando</a></div>"
        
        document.querySelectorAll(".boton-quitar").forEach(el => {
            el.addEventListener("click", e => {
              let id = parseInt(e.target.getAttribute("id"));
              console.log("Se ha clickeado el id "+id);
              console.log(productosEnCarrito)
              productosEnCarrito = productosEnCarrito.filter((item) => item.id !==  id);
              console.log(productosEnCarrito)
              localStorage.setItem("cart", JSON.stringify(productosEnCarrito))
              location.reload()
            });
          });
    }


    
    
})

  