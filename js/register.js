/* Logica para registro de usuario y guardado en local storage */

const inputRegName = document.querySelector('#name');
const inputRegUser = document.querySelector('#userName');
const inputRegEmail = document.querySelector('#email');
const inputRegPass = document.querySelector('#pass');
const btnReg = document.querySelector('#btnReg');
const formReg = document. querySelector('.formReg');
const msjDinamico = document.querySelector('.dinamicContent')

/* Clase para construir nuevo objeto usuario */
class Usuario {
    constructor(nombre, usuario, email, pass){
        this.nombre = nombre;
        this.usuario = usuario;
        this.email = email;
        this.pass = pass;
    }
}

/* Variable para inicializar un usuario en LS */
let usuarios;

usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
console.log(usuarios); 

/* Funcion que guarda en LS cada vez que resgistro un usuario */
function guardarEnLocalStorage(arr){
    return localStorage.setItem('usuarios', JSON.stringify(arr))
}

/* Evento del fomulario que construye un usuario, citando a la clase constructora */
formReg.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log('formulario enviado');
    //Validacion para que el evento no cree un objeto con valores vacios
    if (inputRegName.value.trim() !== "" && inputRegUser.value.trim() !== "" && inputRegEmail.value.trim() !== "" && inputRegPass.value.trim() !== ""){
        const nuevoUsuario = new Usuario(inputRegName.value, inputRegUser.value, inputRegEmail.value, inputRegPass.value);
        usuarios.push(nuevoUsuario);
        guardarEnLocalStorage(usuarios);
        // Restablecer el formulario
        formReg.reset();

        // Mostrar mensaje de éxito
        msjDinamico.innerText = 'Usuario creado con éxito';
    } else {
        msjDinamico.innerText = 'Es necesario que completes todos los campos para crear tu usuario'
    }
});