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

//Array de objetos vacio para el carrito
const carrito = [];
/* Ejecucion que guarda el array VACIO en LS */
guardarEnLS(carrito);


// Función para pintar los elementos del carrito en la tabla
function pintarCarrito(){
  const tabla = document.querySelector('.filas');
  tabla.innerHTML = "";

  carritoLS.forEach((e)=>{
    const fila = document.createElement("tr"); //llamado al elemento HTML que agrega Filas dinamicamente con JS
    fila.innerHTML  = `
    <td>${e.celular}</td>
    <td>$${e.precio}</td>
  `;
  tabla.append(fila);
  })
}


/* variable que obtiene el objeto desde LS */
let carritoLS = JSON.parse(localStorage.getItem('carritoCompras'))

/* Funcion que pinta las cards en el DOM */
function crearHtml(arr) {
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
    const btns = document.querySelectorAll(`.agregarCarrito`);
    //console.log(btns);

    /* Evento de los botones de las cards, dentro del bucle porque necesito acceder al atributo id del objeto el de los botones, que no existe fuera del bucle, ya que la tarjeta se genera en el bucle */
    /*btns devuelve una node list. es por eso que necesito iterar cada uno de los elementos para aplicar el evento al los botones de las cards */
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const celularID = btn.getAttribute("data-id");
        const encontrado = buscarCelular(celulares, celularID);
        //console.log(encontrado);
        carrito.push(encontrado);
        guardarEnLS(carrito)
        //console.log(carrito);
        carritoLS = JSON.parse(localStorage.getItem('carritoCompras'))
        //console.log(carritoLS);
        pintarCarrito();
      });
    });
  }
}


