//Definimos las variables principales
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const contadorCarrito = document.getElementById('contadorCarrito')
let carrito = []
//como no tenemos en nuestro archivo un usuario logeado le vamos a pasar por default este que ya tenemos para echarlo andar y que arranque con este usuario
localStorage.setItem('userId', 'AdrianaGzz@gmail.com');
let stockProductos = [];

document.addEventListener('DOMContentLoaded', async () => {
    //aqui va a leer de la api los productos y me los va cargar en stockProductos
    stockProductos= await leerCatalogo()
    //pintar todos los productos que acabo de recibir en el arreglo anterior 
    crearProductos();
    //validar que exista un userId que exista en el localStorage
    if (localStorage.getItem('userId')) {
        userId = localStorage.getItem('userId');
    }
    //si existe un usuario llamo a la api para consultar su carrito
    if (userId != "") {
        //guardas en carrito el contenido de la api leerCarrito por medio del userId
        carrito = await leerCarrito(userId);
        console.log('DOMContentLoaded',carrito[0]['carrito']);
        //si tiene informacion carrito entonces creaCarrtio donde pintas los productos que tiene ese carrito
        if (carrito.length > 0) {
            crearCarrito();
        }
    }
    else {
        // pedir usuario
        alert('no hay usuario');
    }   
})
const crearCarrito = ()=> {
    alert ('hola')
    //contadorCarrito=document.getElementById('contadorCarrito')
    contadorCarrito.innerText=carrito.length   //cambioandole el valor que esta dentro
    //contenedorCarrito=document.getElementById('carrito-contenedor')
    const precioTotal=carrito.reduce((acc,prod)=>acc+prod.cantidad*prod.precio,0)
    contenedorCarrito.innerHTML='' //estamos limpiando todo el contenido
    carrito.forEach((producto)=>{
        const div=document.createElement('div')
        div.classList.add('productoEnCarrrito')
        div.insertAdjacentHTML("beforeend", "<p>" + producto.nombre + "</p>");
        div.insertAdjacentHTML("beforeend", "<p> " + producto.cantidad + "</p>" );
        div.insertAdjacentHTML("beforeend","<p class='precioProducto'>Precio: $" + producto.precio +"</p>");
        div.insertAdjacentHTML("beforeend", "<button onclick='eliminarDelCarrito(" + producto.id + ")' class='boton-eliminar'><i class='fas fa-trash-alt'></i></button>");
        contenedorCarrito.appendChild(div)
    })
    const div2=document.createElement('div')
    div2.insertAdjacentHTML("beforeend","<p class='precioProducto'>PrecioTotal: $" + precioTotal +"</p>");
    contenedorCarrito.appendChild(div2)
    div2.insertAdjacentHTML("beforeend", "<button onclick='vaciarCarrito()' class='boton-vaciar'>Vaciar Carrito</button>");
  }
const crearProductos=() => {
    stockProductos.forEach((producto) => {
        //1.    crear un div y pegarle la clase css 
        //2.    crear el contenido del div, toda la info de cada producto 
        //3.    anidar el nuevo elemento al contenedor de productos 
        //4.    crear el boton de cada producto 
        //5.    generar el evento click al boton creado y asociarlo a la funcion agregar carrito   
        //--------------------------------------------------------------------------------------------------------- 
        const div = document.createElement('div');
        div.classList.add('producto');
        div.insertAdjacentHTML("beforeend", "<img src=" + producto.img + ">");
        div.insertAdjacentHTML("beforeend", "<h3>" + producto.nombre + "</h3>");
        div.insertAdjacentHTML("beforeend", "<p>" + producto.desc + "</p>");
        div.insertAdjacentHTML("beforeend", "<p class='precioProducto'>Precio: $" + producto.precio + "</p>");
        div.insertAdjacentHTML("beforeend", "<button id=agregar" + producto.id + " class='boton-agregar'>Agregar <i class='fas fa-shopping-cart'></i></button>");
        contenedorProductos.appendChild(div);
        const boton = document.getElementById("agregar" + producto.id);
        boton.addEventListener('click', () => {
          AgregarCarrito(producto.id) 
          console.log('agregarCarrito', producto.id)
    
        });
    });
}
//llenar el contenedor de productos con cada producto del catalogo del stock.js

const AgregarCarrito = (prodid) => {
    const existe = carrito.some(prod => prod.id === prodid) 
    
    if (existe) { 
        carrito.map(prod => { 
            if (prod.id === prodid) {
                prod.cantidad++ 
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodid); 
        carrito.push(item); 
    }
    console.log(carrito)
  ActulizarCarrito() 
}

//con el async hacemos una promesa
const ActulizarCarrito= async() => {
    //console.log('actualizarCarrito-userId',userId)
    //console.log('ActualizarCarrito-Carrito', carrito)
      const cancelar= await eliminarCarrito(userId)
      contadorCarrito.innerText=carrito.length;
      //if(carrito.length>0){
        crearCarrito();
      //}
     const guardar=await guardarCarrito(carrito,userId) 
}

// Eliminar del carrito
const eliminarDelCarrito=(Id)=>{

    console.log('EliminarCarrito',Id)
    console.log('carritoActualizado-inicio', carrito)
    const item=carrito.find((elemento)=> elemento.id===Id)
    const indice=carrito.indexOf(item)
    carrito.splice(indice,1)
    console.log('carritoActualizado-fin', carrito)
    ActulizarCarrito()
}
//vaciar el carrito
const vaciarCarrito=async () => {
    console.log('vaciarCarrrito',userId)
    carrito.length=0;
    contadorCarrito.innerText=0;
    contenedorCarrito.innerHTML='';
    const cancelar=await eliminarCarrito(userId);
    crearCarrito()
}