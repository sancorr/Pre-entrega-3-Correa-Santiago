/* Array de imagenes (rutas) */
const imagenes = [
  "../img/bcgLogin/finanzasStockUno.jpg",
  "../img/bcgLogin/finanzasStockDos.webp",
  "../img/bcgLogin/finanzasStockTres.webp",
  "../img/bcgLogin/finanzasStockCuatro.jpg",
  "../img/bcgLogin/finanzasStockCinco.jpg",
];

// Funcion para recorrer el array de imagenes y obtener una de manera aleatoria
function obtenerImagenAleatoria (){
  // 1. Obtener un número aleatorio entre 0 y la longitud del array de imágenes
  const indiceAleatorio = Math.floor(Math.random()* imagenes.length);
  // 2. Obtener la ruta de la imagen generada aleatoriamente
  const imagenAleatoria = imagenes[indiceAleatorio];
  return imagenAleatoria

}


// Función para añadir una imagen aleatoria al HTML
function agregarImagenAleatoria() {
  // Obtener el contenedor de imágenes en el HTML
  const contenedorImagenes = document.querySelectorAll('.imgJsStyle, #imgJsReg');
  // Iterar sobre cada contenedor de imágenes
  contenedorImagenes.forEach(contenedor => {
    // Crear un elemento de imagen
    const imagen = document.createElement('img');
    // Asignar la ruta de la imagen aleatoria al atributo src del elemento img
    imagen.src = obtenerImagenAleatoria();
    imagen.classList.add('imagen-dinamica');
    // Agregar la imagen al contenedor en el HTML
    contenedor.appendChild(imagen);
  });

}

/* Llamado a la funcion en el objeto window */
window.onload = function() {
  agregarImagenAleatoria();
};


































































/* const celulares = [
{ id: "A", celular: "Samsung S24 Ultra", precio: 500000 },
{ id: "B", celular: "Iphone 15 plus", precio: 600000 },
{ id: "C", celular: "Moto G31", precio: 190000 },
{ id: "D", celular: "Moto Edge", precio: 400000 },
{ id: "E", celular: "Huawei note 10", precio: 300000 },
{ id: "F", celular: "Huawei note 20", precio: 200000 },
{ id: "G", celular: "Moto E22", precio: 100000 },
]; */


/* const carrito = []; */

/*Funcion que busca el objeto en el array celulares[]; segun la letra ingresada por el usuario
mediante prompt, que coincide con el id del objeto */
/* function buscarCelular(arr, letra) {
  return arr.find((el) => {
    return el.id.toLowerCase()=== letra.toLowerCase();
  });
} */

//Decidi no usarla y hacer el .push dentro del codigo de la funcion, pero la dejo comentada por si en algun momento la necesito.
/*function celularComprado(arr, celu) {
  arr.push(celu);
}*/

/*Funcion que recorre el array, recibe un valor inicial de 0 y suma el precio de los objetos del array */
/* function comprarCelular(arr, recargo) {
  return arr.reduce((acc, el) => {
    return acc = acc + el.precio;
  }, recargo);
}
 */

/*Decidi agregar una opcion en el menu desplegable que permita consultar sobre el contenido del carrito y este arroje los valores correctos sumando strings y numeros
esta funcion recorre el array carrito y me devuelve un mensaje con lo que le ha sido agregado ó un mensaje si está vacio.
Tambien me permite usar la funcion comprarCelular() para calcular el total del carrito, en la linea 47 dejo comentada la forma de calcular el total del carrito que habia razonado antes */
/* function verCarrito() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
  } else {
    let mensaje = "Contenido del carrito:\n";
    let total = comprarCelular(carrito,0);

    for (let i = 0; i < carrito.length; i++) {
      mensaje += carrito[i].celular + ": $" + carrito[i].precio + "\n";
      //total += carrito[i].precio;
    }
    mensaje += "Total: $" + total;
    alert(mensaje);
  }
} */

/* let usuario = "Tutor/a";
let inicioCorrecto = false;
let saldo = 250000; */


//Funcion que ejecuta el incio de sesion y determina si es true o false
/* function iniciarSesion() {
  let ingresoUsuario = prompt("Ingresa tu nombre de usuario/a");

  if (ingresoUsuario == usuario) {
    alert("Hey, bienvenida/o: " + usuario);

    for (let i = 1; i <= 3; i++) {
      let pass = "53920";
      let ingresoPass = prompt("Muy bien " + usuario + ", ahora ingresa tu contraseña. Tenés 3 intentos");
      
      if (ingresoPass == pass) {
        alert("Hey, bienvenida/o: " + usuario + " ahora vas a poder operar");
        inicioCorrecto = true;
        break;
      } else {
        alert("Contraseña incorrecta. ¿No leiste la documentación?");
      }
    }
  } else {
    alert("Usuario no encontrado, volvé a intentarlo con otro nombre");
  }
} */

//Funcion que despliega el primer menu de opciones si la funcion anterior se evalua como true.
/* function realizarOperaciones() {
  if (inicioCorrecto) {
    let opciones = prompt("Selecciona alguna de las siguientes opciones: \n1 - Saldo en tu cuenta \n2 - Equipos disponibles \n3 - Préstamos con interés  \n4 - Ver carrito \nPresiona X para salir");
    while (opciones != "x" && opciones != "X") {      

      switch (opciones) {
        case "1":
          alert("Tu dinero disponible en cuenta es: $" + saldo);
          break;
        case "2":
          comprarEquipo();
          break;
        case "3":
          realizarPrestamo();
          break;
        case "4": 
        verCarrito();
        break;
        default:
          alert("Opción no válida");
      }
      opciones = prompt("Selecciona alguna de las siguientes opciones: \n1 - Saldo en tu cuenta \n2 - Equipos disponibles \n3 - Préstamos con interés  \n4 - Ver carrito \nPresiona X para salir");
    }
  }
} */

/*funcion que ejecuta un bloque de codigo que permite elegir un equipo y en funcion a tu saldo disponible acepta la compra y descuenta el precio de tu saldo
ó te recomienda pedir un prestamo (funcion siguiente a ésta) en caso de que tu saldo no te alcance.
A su vez incorpora la funcion buscarCelular() guardada en la variable celularElegido y devuelve el objeto del array celulares correspondiente al id ingresado por prompt
el .log comentado debajo de la variable lo verifica. Tambien agregué dos condicionales if: uno verifica que el contenido del array sea distinto a undefined para ejecutar el codigo(de esta manera si el usuario ingresa una opcion no valida sale por el condicional else, tambien podria haber usado null), y el otro garantiza hacer el push al array vacio carrito=[] sólo si el saldo es suficiente */
/* function comprarEquipo() {
  let equipos = prompt("Éste es nuestro stock, seleccioná el que quieras para comprarlo: \nA - Samsung S24 Ultra $500,000 \nB - Iphone 15 $600,000 \nC - Moto G31 $190,000 \nD - Moto Edge $400000 \nE - Huawei note 10 $300,000 \nF - Huawei note 20 $200,000 \nG - Moto E22 $100,000 ");
  let celularElegido = buscarCelular(celulares,equipos.toLowerCase());
  //console.log(celularElegido);
  if (celularElegido !== undefined){
    if(saldo >= celularElegido.precio){
      carrito.push(celularElegido)
    }
    
    switch (celularElegido.id[0]) {
    case "A":
      comprar(celularElegido.celular, celularElegido.precio);
      break;
    case "B":
      comprar(celularElegido.celular, celularElegido.precio);
      break;
    case "C":
      comprar(celularElegido.celular, celularElegido.precio);
      break;
    case "D":
      comprar(celularElegido.celular, celularElegido.precio);
      break;
    case "E":
      comprar(celularElegido.celular, celularElegido.precio);
      break;
    case "F":
      comprar(celularElegido.celular, celularElegido.precio);
      break;
    case "G":
      comprar(celularElegido.celular, celularElegido.precio);
      break;
    }    
  }else {alert("Opción no válida");}
} */  

//console.log(carrito);

/*Funcion que se ejecuta dentro de la funcion realizarOperaciones y permite la compra de un equipo si el saldo es suficiente o da un mensaje de saldo insuficiente */
/* function comprar(nombre, precio) {
  if (saldo < precio) {
    alert("No tenes dinero suficiente. Pedí un préstamo.");
  } else {
    saldo -= precio;
    alert("Felicidades! Pudiste comprar tu " + nombre + ", tu saldo ahora es: $" + saldo);
  }
} */

/*funcion que calcula el prestamo segun el valor ingresado por paramentro, calcula un interes sobre ese valor y suma el prestamo solicitado a el saldo.
Tambien verifica si el valor ingresado es un numero valido o no */
/* function realizarPrestamo() {
  let prestamo = parseFloat(prompt("Ingresa el monto que queres recibir y se acreditará a tu saldo. Recordá que nos vas a devolver ese monto más un 10% de interés"));
  if (!isNaN(prestamo) && prestamo > 0){
    let interes = prestamo * 0.1;
    let totalDevolucion = prestamo + interes;

    alert("Nos vas a devolver $" + totalDevolucion);
    saldo += prestamo;
    alert("Tu saldo ahora es: $" + saldo);
  }else {
    alert("Debes ingresar la cantidad que deseas en números")
  }
} */

/* iniciarSesion()
realizarOperaciones() */
























































