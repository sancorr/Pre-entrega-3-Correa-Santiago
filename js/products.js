const sectionProducts = document.querySelector("#cardsCelulares");
const btnCards = document.querySelectorAll (".agregarCarrito");

const celulares = [
    { id: "A", celular: "Samsung S24 Ultra", precio: 500000, img: "../img/samsungS23.webp" },
    { id: "B", celular: "Iphone 15 plus", precio: 600000, img: "../img/iphonePlus15.webp" },
    { id: "C", celular: "Moto G31", precio: 190000, img: "../img/motoG31.webp" },
    { id: "D", celular: "Moto Edge 40", precio: 400000, img: "../img/motoEdge40.webp" },
    { id: "E", celular: "Xiaomi note 10", precio: 300000, img: "../img/xiaomiNote10.webp" },
    { id: "F", celular: "Huawei Mate 20", precio: 200000, img: "../img/huaweiMate20.jpg" },
    { id: "G", celular: "Moto E22", precio: 100000, img: "../img/motoE22.webp" },
    ];

//Array de objetos vacio para el carrito
const carrito = [];

let inventarioCompras = JSON.parse(localStorage.getItem('carritoCompras')) || [];

function buscarServicio(arr, filtro) {
    const encontrado = arr.find((el) => {
      return el.celular.includes(filtro);
    });
    return encontrado;
  }


/* Funcion guardar en localStorage */
function guardarEnLS(arr) {
    localStorage.setItem('carritoCompras', JSON.stringify(arr))
}

function crearHtml(arr) {
  sectionProducts.innerHTML = "";
  //validar qué pasa cuando no recibo ningun array
  let html;
  for (const el of arr) {
    html = ` <div class="card">
      <img src="../img/${el.img}" class="card-img-top" alt="${el.celular}">
      <div class="card-body">
          <h5 class="card-title">${el.celular}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
              card's content. $${el.precio}</p>
          <a  class="btn btn-primary agregarCarrito">Agregar al carrito</a>
      </div>
  </div>`;
    //se la agrego al contenedor
    sectionProducts.innerHTML = sectionProducts.innerHTML + html;
  }
}
guardarEnLS(celulares)

/* Evento de los botones de las cards */
/*btnCards devuelve una node list. es por eso que necesito iterar cada uno de los elementos para aplicar el evento al los botones de las cards */
btnCards.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        //e.preventDefault();
        
    } )
})


crearHtml(celulares)