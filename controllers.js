//todas las llamadas a las apis
//vamos a crear las funciones de promesas para hacer peticiones a las apis de operaciones en catalogo de carrito
//siempre que hay un async(es la funcion que invoca) el await(es la funcion que regresa el valor, es el que espera la promesa)
//async(asincrono) es una promesa
/*const leerCatalogo = async () => {
    //concatenamos la url que necesitamos para productos del catalogo
    //solo funciona para el carrito
    let urlProducts = urlCatalogo+'?apikey='+apiKey;  
    // fetch=esta funcion es para llamar apis, hay otras pero aqui vamos a utilizar esta, le debes de pasar la url  
    const response = await fetch(urlProducts, {
        //le pasamos url,metodo,headers y body
        method: 'GET',
        headers: { 
            //es para el que produce la api y no para el que la consume 
            //le decimos que lo queremos en JSON
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //le dices a la api que te reciba desde cualquier origen
            'Access-Control-Request-Headers': '*'
        }
    });
    //lo convrtimos a JSON el response para que retorne un JSON
    const myJson = await response.json(); 
    
    console.log('Api de Catalogo',myJson);
    return myJson;
}*/
    
const leerCatalogo = async () => {
    let urlProducts = urlCatalogo+'?apikey='+apiKey;    
    const response = await fetch(urlProducts, {
        method: 'GET'
    });
    const myJson = await response.json(); 
    // console.log(myJson);
    return myJson;
}
//guardar carrito,leercarrito y eliminar carrito es por el i
const leerCarrito = async (userId) => {
    let urlProducts = urlCarrito + userId +'?apikey='+apiKey;    
    const response = await fetch(urlProducts, {
        method: 'GET'
    });
    const myJson = await response.json(); 
    console.log('leer carrito',myJson[0]['carrito']);
    return myJson[0]['carrito'];
}

const guardarCarrito = async (carrito, userId) => {
    let url = urlCarrito + userId +'?apikey='+apiKey;    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
           "id" : userId,
           "carrito" : carrito
        })
     });
    const myJson = await response.json(); 
    // console.log(myJson);
    return myJson;
}

const eliminarCarrito = async (userId) => {
    let urlProducts = urlCarrito + userId +'?apikey='+apiKey;    
    const response = await fetch(urlProducts, {
        method: 'DELETE'
    });
    const myJson = await response.json(); 
    // console.log(myJson);
    return myJson;
}