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
    /* Al ejecutar el evento del formulario esta depuracion demuestra que se obtienen los datos correctamente */
    console.log("Usuario ingresado:", userName.value);
    console.log("Contraseña ingresada:", passLogin.value);
    console.log("Usuarios recuperados:", usuarios);
    if (userFound){
        location.href = '/pages/products.html';
          /* "../pages/products.html" -> esta es la ruta relativa a MI root.
          en la linea de location.href la corrijo por un tema de portabilidad, las personas a las que le comparti el proyecto
          eran redirigidas a una pagina inexistente, busque info y encontre que esa es la manera correcta. si aun no funciona dejo mi ruta original en este comentario para que puedas corregirla */
    }else{
        msjDinamicoLogin.innerHTML = 'Usuario no existente'
    }
}

/* Funcion que me trae el objeto desde LS de texto a obj nuevamente */
function recLs() {
    return JSON.parse(localStorage.getItem('usuarios'));
}

const usuariosRecup = recLs();
console.log(usuariosRecup);

/* Evento del formulario */
formLogin.addEventListener('submit', (e)=>{
    e.preventDefault();
    inciarSesion(usuariosRecup);
    console.log("Usuarios recuperados:", usuariosRecup);
})