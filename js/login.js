/* Logica para inicio de sesion */
const userName = document.querySelector('#userNameLogin');
const passLogin = document.querySelector('#passLogin');
const formLogin = document.querySelector('.login');
const btnInicio = document.querySelector('.btnInicio');
const msjDinamicoLogin = document.querySelector('.dinamicContentLogin');


/* funcion de inicio de sesion */
/* Valida que los ingresos sean equivalentes al objeto de la clase constructora Usuario.
Por eso utilizo usuario.usuario y no usuario.nombre => Si uso ese ultimo deberia usar el valor del campo 'nombre y apellido'
en lugar de el nombre de usuario para que la valicion sea true*/
function inciarSesion(usuarios){
    let userFound = usuarios.find((usuario)=>{
        return usuario.usuario === userName.value && usuario.pass === passLogin.value;
    });
    if (userFound){
        location.href = '../pages/products.html'; //Cambiar a HTML correcto cuando lo tenga listo
    }else{
        msjDinamicoLogin.innerHTML = 'Usuario no existente'
    }
}


/* Funcion que me trae el objeto desde LS de texto a obj nuevamente */
function recLs() {
    return JSON.parse(localStorage.getItem('usuarios'));
}

const usuariosRecup = recLs();


/* Evento del formulario */
formLogin.addEventListener('submit', (e)=>{
    e.preventDefault();
    inciarSesion(usuariosRecup);
})