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

const carritoLink = document.getElementById("carritoLink");
const carritoMenu = document.getElementById("carritoMenu");

// Actualizar el contador en el ícono de carrito
function actualizarContadorCarrito() {

  const carritoLS = JSON.parse(localStorage.getItem("carritoCompras")) || [];
  const cantidadTotal = carritoLS.length;
  const contadorCarrito = carritoLink.querySelector("span");

  if (cantidadTotal > 0) {
    
    contadorCarrito.textContent = cantidadTotal;
    contadorCarrito.style.display = "inline"; 
  } else {
    contadorCarrito.style.display = "none";
  }
}

/* Llamo a la funcion antes de que se cargue por primera vez en el DOM para evitar que se pinte el contador por defecto en el DOM */
actualizarContadorCarrito()

/* Variable para controlar si el menú lateral está visible o no */
let carritoMenuVisible = false;

/*  Función para mostrar u ocultar el menú lateral del carrito */
function toggleMenuCarrito() {
  if (carritoMenu.classList.contains("mostrar")) {
    // Si el menú del carrito está visible, ocultarlo
    carritoMenu.classList.remove("mostrar");
  } else {
    // Si el menú del carrito está oculto, mostrarlo
    carritoMenu.classList.add("mostrar");
    // Pintar el carrito cuando se muestre el menú lateral
    pintarCarrito();
  }
}



// Función para pintar los elementos del carrito en la tabla
function pintarCarrito() {

  const carritoMenu = document.getElementById("carritoMenu");
  const carritoLS = JSON.parse(localStorage.getItem("carritoCompras")) || [];
  
  // Limpiar el contenido anterior del carrito lateral
  carritoMenu.innerHTML = "";

  if (carritoLS.length > 0) {

    let precioTotal = 0;

    /* Recorro los obj en LS, si existen, para pintar el carrito */
    carritoLS.forEach((e) => {
      const itemCarrito = document.createElement("div");
      itemCarrito.classList.add("item-carrito");
      itemCarrito.innerHTML = `
        <img src="../img/${e.img}" alt="${e.celular}">
        <div class="detalle-carrito">
          <p>${e.celular}</p>
          <p>Precio: $${e.precio}</p>
        </div>
        <button class="btn-quitar" data-id="${e.id}">Quitar</button>
      `;
      carritoMenu.appendChild(itemCarrito);

      /* Calcular el precio total del carrito */
      precioTotal += e.precio;
    });

    // Mostrar el precio total del carrito
    const totalCarrito = document.createElement("div");
    totalCarrito.classList.add("total-carrito");
    totalCarrito.innerHTML = `<p>Total: $${precioTotal}</p>`;
    carritoMenu.appendChild(totalCarrito);

    const botonesQuitar = document.querySelectorAll(".btn-quitar");
    botonesQuitar.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        const celularID = e.target.getAttribute("data-id");
        const nuevoCarrito = carritoLS.filter(
          (producto) => producto.id !== celularID
        );
         /* Actualizar el carrito en el localStorage */
        localStorage.setItem("carritoCompras", JSON.stringify(nuevoCarrito));
         /* Volver a pintar el carrito */
        pintarCarrito();
        actualizarContadorCarrito();
      });
    });
  } else {
    
    // En el futuro este mensaje no se debera mostrar por defecto, unicamente al ejecutar el evento de limpiar el carrito o hacer una compra con el carrito vacio.
    carritoMenu.innerHTML = "<p>El carrito está vacío</p>";
    actualizarContadorCarrito();
  }
}

/*  Evento de clic en el ícono de carrito para mostrar/ocultar el menú lateral */
carritoLink.addEventListener("click", () => {
  // Llama a la función toggleMenuCarrito para mostrar u ocultar el menú lateral
  toggleMenuCarrito();
});

/* variable que obtiene el objeto desde LS, finalmente decidi no usarla, pero la dejo por si a futuro me sirve implementarla
let carritoLS = JSON.parse(localStorage.getItem('carritoCompras')); */

//Array de objetos guardados en LS o vacio si no tiene nada guardado para el carrito

let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];

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

/* Manejo del evento de click en los botones para agregar al carrito. */
const btns = document.querySelectorAll(".agregarCarrito");
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const celularID = btn.getAttribute("data-id");
    const encontrado = buscarCelular(celulares, celularID);
    if (encontrado) {
      let carritoLS = JSON.parse(localStorage.getItem("carritoCompras")) || [];
      carritoLS.push(encontrado);
      localStorage.setItem("carritoCompras", JSON.stringify(carritoLS));
      actualizarContadorCarrito();
    } else {
      console.log("No se encontró el celular con ID: " + celularID);
    }
  });
});


/* Funcion para filtrar celulares por barra de busqueda */
function filtrarPorNombre(nombre) {
  return celulares.filter((celular) =>
    celular.celular.toLowerCase().includes(nombre.toLowerCase())
  );
}

/* Obtener referencia al botón de búsqueda y asignarlo a una const */
const searchButton = document.getElementById("searchButton");

/* Obtener referencia a la barra de búsqueda y asignarlo a una const */
const searchInput = document.getElementById("searchInput");

/* Función para pintar el resultado de la búsqueda y agregar evento de clic a los botones "Agregar al carrito" */
function pintarResultadoBusquedaYAgregarEvento(resultado) {
  const sectionCards = document.querySelector("#cardsCelulares");
  sectionCards.innerHTML = ""; // Limpiar el contenido anterior

  if (resultado.length > 0) {
    // Si se encuentra al menos un resultado, pintar todas las tarjetas
    resultado.forEach((celular) => {
      const html = `
                <div class="card">
                    <img src="../img/${celular.img}" class="card-img-top" alt="${celular.celular}">
                    <div class="card-body">
                        <h5 class="card-title">${celular.celular}</h5>
                        <p class="card-text">Precio: $${celular.precio}</p>
                        <a href="#" class="btn btn-primary agregarCarrito" data-id="${celular.id}">Agregar al carrito</a>
                    </div>
                </div>`;
      sectionCards.innerHTML += html;
    });
    // Después de pintar los resultados de búsqueda, agregar evento de clic a los botones "Agregar al carrito"
    agregarEventoAgregarAlCarrito();
  } else {
    // Si no se encuentra ningún resultado, mostrar un mensaje
    sectionCards.innerHTML = "<p>Ningún elemento coincide con la búsqueda.</p>";
  }
}

/* Función para mostrar el botón de limpiar búsqueda */
function mostrarBotonLimpiar() {
  limpiarBusqueda.style.display = "inline-block";
}

/* Función para ocultar el botón de limpiar búsqueda */
function ocultarBotonLimpiar() {
  limpiarBusqueda.style.display = "none";
}

/* Manejar el evento de click en el botón de búsqueda */
searchButton.addEventListener("click", function (e) {
  e.preventDefault();

  /* Obtener la barra de búsqueda y eliminar espacios en blanco al principio y al final, para evitar ingresos vacios por el usuario */
  const nombreBusqueda = searchInput.value.trim();

  // Validar si la barra de búsqueda está vacía
  if (nombreBusqueda === "") {
    // Mostrar un mensaje al usuario indicándole que debe ingresar un nombre
    searchInput.placeholder = "¡Ingrese un nombre!";
    // Detener la ejecución de la función
    return;
  }
  
  // Limpiar el mensaje de advertencia si se había mostrado previamente
  searchInput.placeholder = "";

  /* Filtrar los resultados por nombre de búsqueda */
  const resultadoBusqueda = filtrarPorNombre(nombreBusqueda);

  /* Mostrar los resultados de la búsqueda */
  pintarResultadoBusquedaYAgregarEvento(resultadoBusqueda);

  /* Mostrar el botón de limpiar búsqueda */
  mostrarBotonLimpiar();
});

/* Función para agregar evento de clic a los botones "Agregar al carrito" desde la busqueda por nombre */
function agregarEventoAgregarAlCarrito() {
  const btnsAgregarCarrito = document.querySelectorAll(".agregarCarrito");
  btnsAgregarCarrito.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const celularID = btn.getAttribute("data-id");
      const encontrado = buscarCelular(celulares, celularID);
      if (encontrado) {
        let carritoLS =
          JSON.parse(localStorage.getItem("carritoCompras")) || [];
        carritoLS.push(encontrado);
        localStorage.setItem("carritoCompras", JSON.stringify(carritoLS));
        actualizarContadorCarrito();
      } else {
        console.log("No se encontró el celular con ID: " + celularID);
      }
    });
  });
}

/* Funcion para VOLVER a pintar las cards originales en el DOM y poder seguir agrenando eventos al carrito */
function pintarTodasLasTarjetas() {
  crearHtml(celulares);
  agregarEventoAgregarAlCarrito(); // Si la quito no voy a poner agregar celulares al carrito al ejecutar el evento del botón.
}

/* Acceder al boton de limpiar busqueda */
const limpiarBusqueda = document.getElementById("cleanButton");

// Ocultar el botón de limpiar búsqueda al cargar el DOM
limpiarBusqueda.style.display = "none";

/* Manejador del evento de limpiar búsqueda */
limpiarBusqueda.addEventListener("click", (e) => {
  e.preventDefault();
  pintarTodasLasTarjetas();
  /* Ocultar el botón de limpiar búsqueda */
  ocultarBotonLimpiar();
});

pintarTodasLasTarjetas();


/*********************************** FORMULARIO DE PRESTAMOS ***********************************/

/* Logica para el formulario de prestamos */
const form = document.querySelector('#interesForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombreInput = document.getElementById("nombre").value;
  const apellidoInput = document.getElementById("apellido").value;
  const emailInput = document.getElementById("email").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const interes = parseFloat(document.getElementById("interes").value);

  // Verificacion de que recibe valores validos
  if (isNaN(monto) || isNaN(interes)) {
      // Mostrar mensaje de error con SweetAlert
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, ingrese un monto e interés válidos.'
      });
      return;
  }

  const total = monto + (monto * (interes / 100));

  // Mostrar resultado con SweetAlert
  Swal.fire({
      icon: 'success',
      title: '¡Cálculo exitoso!',
      html: `Hola ${nombreInput} ${apellidoInput}, el total a pagar es: $${total.toFixed(2)}`
  });
});