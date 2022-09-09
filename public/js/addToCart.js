window.addEventListener("load", function(){
    let addToCartButton = document.querySelector("#cart-button");
    let idProducto = document.querySelector("#product-id")
    let nombreProducto = document.querySelector("#product-name")
    let imgProducto = document.querySelector("#product-img")
    let precioProducto = document.querySelector("#product-price")


    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart", "[]")
    }

    addToCartButton.addEventListener("click", function(e){
        e.preventDefault();
        let id = idProducto.textContent
        let cart = JSON.parse(localStorage.getItem("cart"))
        for(i of cart){
            if(i.id == id){
                return
            }
            else{
                continue
            }
        }        
        let item = {id: parseInt(idProducto.textContent), nombre: nombreProducto.textContent, img: imgProducto.src, precio: parseFloat(precioProducto.textContent)}
        cart.push(item)
        localStorage.setItem("cart", JSON.stringify(cart))
        console.log(localStorage.getItem("cart"))
        alertify.success('Agregado al carrito');
    })
})