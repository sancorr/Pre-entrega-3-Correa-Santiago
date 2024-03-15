const sectionProducts = document.querySelector("#cardsCelulares");

/* Array de objetos celulares */
const celulares = [
  {
    id: "A",
    celular: "Samsung S24 Ultra",
    precio: 500000,
    img: "../img/samsungS23.webp",
  },
  {
    id: "B",
    celular: "Iphone 15 plus",
    precio: 600000,
    img: "../img/iphonePlus15.webp",
  },
  { id: "C", celular: "Moto G31", precio: 190000, img: "../img/motoG31.webp" },
  {
    id: "D",
    celular: "Moto Edge 40",
    precio: 400000,
    img: "../img/motoEdge40.webp",
  },
  {
    id: "E",
    celular: "Xiaomi note 10",
    precio: 300000,
    img: "../img/xiaomiNote10.webp",
  },
  {
    id: "F",
    celular: "Huawei Mate 20",
    precio: 200000,
    img: "../img/huaweiMate20.jpg",
  },
  { id: "G", celular: "Moto E22", precio: 100000, img: "../img/motoE22.webp" },
];


/* Funcion que crea las cards con el array celulares */
crearHtml(celulares);


// Intentos fallidos de funciones buscar celular, las dejo a modo de ejemplo para que se entienda el razonamiento. a futuro las borro.
/* function buscarCelular(arr, filtro) {
  const encontrado = arr.find((el) => {
    return el.celular.includes(filtro);
  });
  return encontrado;
}

function buscarCelular(arr, id) {
  console.log("arreglo de celulares: ", arr);
  console.log("ID buscado: ", id);
  return arr.find((el) => {
    return arr.celular === el.id;
  });
} */


//Funcion Correcta que buscar un celular en el array y devuelve el que coincida con el Id del boton corresponiente.
function buscarCelular(arr, id) {
  // Utiliza un bucle para iterar sobre cada celular en el arry
  for (const celular of celulares) {
    // Comprueba si el ID del celular coincide con el ID que busco
    if (celular.id === id) {
      // Si se encuentra el celular, devuélvelo
      return celular;
    }
  }
  // Si no se encuentra el celular, devuelve null
  return null;
}

/* Funcion guardar en localStorage */
function guardarEnLS(arr) {
  localStorage.setItem("carritoCompras", JSON.stringify(arr));
}


// Función para pintar los elementos del carrito en la tabla
function pintarCarrito(){
  const tabla = document.querySelector('.filas');
  const totalTabla = document.querySelector('.total')
  const carritoLS = JSON.parse(localStorage.getItem('carritoCompras')) || [];
  
  if (carritoLS.length > 0){
    tabla.innerHTML = "";
    totalTabla.innerHTML = "";

    let precioTotal = 0; 
    
    /* Recorro los obj en LS, si existen, para pintar una tabla con nombre y precio en DOM */
    carritoLS.forEach((e)=>{
      const fila = document.createElement("tr"); //llamado al elemento HTML que agrega Filas dinamicamente con JS
      fila.innerHTML  = `
      <td>${e.celular}</td>
      <td>$${e.precio}</td>
    `;
    tabla.append(fila);
    precioTotal += e.precio
    })

    const totalfila = document.createElement("tr");
    totalfila.innerHTML = `
    <td><strong>Total:</strong></td>
    <td><strong>$${precioTotal}</strong></td>
   `;
   totalTabla.append(totalfila)

  } else {
    // Si no hay elementos en el carrito, limpiar la tabla
    // En el futuro este mensaje no se debera mostrar por defecto, unicamente al ejecutar el evento de limpiar el carrito o hacer una compra con el carrito vacio.
    tabla.innerHTML = "<tr><td>El carrito está vacío</td></tr>";
    totalTabla.innerHTML ="";
  }  
}


/* variable que obtiene el objeto desde LS, finalmente decidi no usarla, pero la dejo por si a futuro me sirve implementarla
let carritoLS = JSON.parse(localStorage.getItem('carritoCompras')); */ 

//Array de objetos guardados en LS u vacio si no tiene nada guardado para el carrito

let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];

/* Ejecucion de funcion que guarda el array en LS */
guardarEnLS(carrito);


/* Función que pinta las cards en el DOM */
function crearHtml(arr) {
  
  sectionProducts.innerHTML = "";

  arr.forEach((el) => {
    const html = `
      <div class="card">
        <img src="../img/${el.img}" class="card-img-top" alt="${el.celular}">
        <div class="card-body">
          <h5 class="card-title">${el.celular}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. $${el.precio}</p>
          <a class="btn btn-primary agregarCarrito" data-id="${el.id}">Agregar al carrito</a>
        </div>
      </div>`;
    sectionProducts.innerHTML += html;
  });
}

/* Ejecucion de funcion que pinta las CARDS en el DOM */
crearHtml(celulares);


/* Manejo del evento de click en los botones para agregar al carrito.
La recorro con un forof porque de otro modo devuelve una nodeList vacia y no ocurre el evento al intentar ejecutarlo */
const btns = document.querySelectorAll('.agregarCarrito');
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const celularID = btn.getAttribute("data-id");
    const encontrado = buscarCelular(celulares, celularID);
    if (encontrado) {
      let carritoLS = JSON.parse(localStorage.getItem('carritoCompras')) || [];
      carritoLS.push(encontrado);
      localStorage.setItem('carritoCompras', JSON.stringify(carritoLS));
      pintarCarrito();
    } else {
      console.log("No se encontró el celular con ID: " + celularID);
    }
  });
});

/* Selector del nodo para limpiar el carrito con un boton tipo <a> (en el futuro sera un boton individual por cada objeto almacenado en LS) */
const limpiarCarritoBtn = document.querySelector('.limpiarCarrito');

/* Manejador del evento que limpia el carrito COMPLETO */
limpiarCarritoBtn.addEventListener('click', ()=>{
  //Elimina todos los objetos del carrito de LS (a futuro sera un boton individual por cada elemento)
  localStorage.removeItem('carritoCompras');

  
  //  no entran en conflicto por el scope
  const tabla = document.querySelector('.filas');
  const totalTabla= document.querySelector('.total');
  tabla.innerHTML = "<tr><td>El carrito está vacío</td></tr>";
  totalTabla.innerHTML = "";
})

/* Ejecucion de funcion que pinta el carrito y su total en DOM */
pintarCarrito();


/* Logica para el formulario de prestamos */
const form = document.querySelector('#interesForm');

form.addEventListener('submit', (e)=>{
  e.preventDefault();

  const nombreInput = document.getElementById("nombre").value;
  const apellidoInput = document.getElementById("apellido").value;
  const emailInput = document.getElementById("email").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const interes = parseFloat(document.getElementById("interes").value);

  // Verificacion de que recibe valores validos
  if (isNaN(monto) || isNaN(interes)) {
    alert("Por favor, ingrese un monto e interés válidos.");  
  }  

  const total = monto + (monto * (interes / 100));

  //alert(`Hola ${nombre} ${apellido}, el total a pagar es: $${total.toFixed(2)}`);
  const mostrarResultado = document.getElementById('resultadoPrestamo');
  
  function pintarResultado (nombre, apellido, total){
    const mensaje = `Hola ${nombre} ${apellido}, el total a pagar es: $${total.toFixed(2)}`;
    const crearMsj = document.createElement ('p');
    
    crearMsj.innerHTML = mensaje;

    mostrarResultado.innerHTML = "";

    mostrarResultado.append(crearMsj)

  }

  pintarResultado(nombreInput, apellidoInput, total)
});




















/* Funcion que pinta las cards en el DOM */
/* function crearHtml(arr) {
  sectionProducts.innerHTML = "";
  //validar qué pasa cuando no recibo ningun array
  let html;
  for (const el of arr) {
    //aplicar Destructuring
    html = ` <div class="card">
      <img src="../img/${el.img}" class="card-img-top" alt="${el.celular}">
      <div class="card-body">
          <h5 class="card-title">${el.celular}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
              card's content. $${el.precio}</p>
          <a  class="btn btn-primary agregarCarrito" data-id="${el.id}">Agregar al carrito</a>
       </div>
     </div>`;
    //agrego las cards al contenedor
    sectionProducts.innerHTML += html;
    /* Llamado a los botones dentro del bucle, para que no devuelva "undefined" al intentar ejecutarlo */
    //const btns = document.querySelectorAll(`.agregarCarrito`);
    //console.log(btns); */

    /* Evento de los botones de las cards, dentro del bucle porque necesito acceder al atributo id del objeto el de los botones, que no existe fuera del bucle, ya que la tarjeta se genera en el bucle */
    /*btns devuelve una node list. es por eso que necesito iterar cada uno de los elementos para aplicar el evento al los botones de las cards */
    /* btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const celularID = btn.getAttribute("data-id");
        const encontrado = buscarCelular(celulares, celularID);
        //console.log(encontrado);
        carrito.push(encontrado);
        guardarEnLS(carrito)
        //console.log(carrito);
        //carrito = JSON.parse(localStorage.getItem('carritoCompras'))
        //console.log(carritoLS);
        pintarCarrito();
      });
    }); */
/*   }
} */


