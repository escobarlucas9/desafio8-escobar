// Declaro un array de objetos con los servicios que ofrezco

const servicios = [
    {id:1,nombre: "Fade clasico",precio: "$1000", img: "./img/modelo3.jpg" },
{
    id: 2,
    nombre: "Fade con barba",
    precio: "$1200",
    img: "./img/modelo2.jpg",
  },
  {
    id: 3,
    nombre: "Fade con color",
    precio: "$1500",
    img: "./img/modelo4.jpg",
  },
  { id: 4, nombre: "Solo barba", precio: "$800", img: "./img/modelo1.jpg" },
]

let {codigo_secreto: id,nombre,precio,img} = servicios
//capturo los nodos del html
const contenedor_servicios = document.querySelector("#contenedor_servicios");
const contenedor_elegido = document.querySelector(".contenedor_elegido");
const contenedor_input = document.querySelector(".contenedor_input");
//Declaro un array vacio para despues pushearlo
const lista_servicios = [];

document.addEventListener("DOMContentLoaded", function () {
    mostrar_servicio();

})

//funcion que muestra los servicios donde dentro creo los card con sus clases estilos e imagenes respectivas
function mostrar_servicio() {
    servicios.forEach(function(servicio) {

        const div_servicio = document.createElement("div");
        div_servicio.classList.add("card");

        const img_servicio = document.createElement("img");
        img_servicio.src = servicio.img
        img_servicio.classList.add("img_servicio");

        const titulo_servicio = document.createElement("h3");
        titulo_servicio.textContent = servicio.nombre
        titulo_servicio.classList.add("titulo");

        const precio_servicio = document.createElement("p");
        precio_servicio.textContent = servicio.precio
        precio_servicio.classList.add("precio");

        const btn_servicio = document.createElement("button");
        btn_servicio.textContent = "Elegir servicio";
        btn_servicio.classList.add("boton");
        btn_servicio.onclick = function () {
            agregar_servicio(servicio.id)
        }
        
        div_servicio.appendChild(img_servicio);
        div_servicio.appendChild(titulo_servicio);
        div_servicio.appendChild(precio_servicio)
        div_servicio.appendChild(btn_servicio);

        contenedor_servicios.appendChild(div_servicio);
}  )
}

//funcion que atraves del buton btn_servicio se agregue al contenedor elegido 
function agregar_servicio(id) {
    const servicio_elegido = servicios.find(function (servicio) {
        return servicio.id === id;
    })
    lista_servicios.push(servicio_elegido);
    carrito(lista_servicios);
}

//funcion donde creo el servicio que desea el cliente que haya apretado con  el boton 
function carrito (elegido) {

    contenedor_elegido.innerHTML = "";
    elegido.forEach(function(servicio) {

        const div_servicio = document.createElement("div");
        div_servicio.classList.add("card");

        const img_servicio = document.createElement("img");
        img_servicio.src = servicio.img
        img_servicio.classList.add("img_servicio");

        const titulo_servicio = document.createElement("h3");
        titulo_servicio.textContent = servicio.nombre
        titulo_servicio.classList.add("titulo");

        const precio_servicio = document.createElement("p");
        precio_servicio.textContent = servicio.precio
        precio_servicio.classList.add("precio");

        const btn_final = document.createElement("button");
        btn_final.textContent = "Finalizar";
        btn_final.classList.add("boton");
        btn_final.onclick = function () {
            agregar_form()
        }

        const btn_eliminar = document.createElement("button");
        btn_eliminar.textContent = "Borrar servicio";
        btn_eliminar.classList.add("boton");
        btn_eliminar.onclick = function () {
            eliminar_servicio(servicio.id)
        }
//el cliente elige el servicio que desee y se manda al json
     
        
        div_servicio.appendChild(img_servicio);
        div_servicio.appendChild(titulo_servicio);
        div_servicio.appendChild(precio_servicio);
       div_servicio.appendChild(btn_eliminar);
       div_servicio.appendChild(btn_final);

        contenedor_elegido.appendChild(div_servicio);
}  )
}
//funcion donde atraves del btn_eliminar, el cliente pueda eliminar el servicio que eligio
function eliminar_servicio(id) {
    const eliminar_carrito = lista_servicios.find(function (servicio) {
        return servicio.id === id;
       
    })
    const indice = lista_servicios.indexOf(eliminar_carrito);
    lista_servicios.splice(indice, 1)
    carrito(lista_servicios)
    }

//funcion que cuando el cliente este seguro del servicio que eligio se muestre un formulario donde ponga sus datos
function agregar_form() {

 document.getElementById("formulario").style.display = "block";
 let arreglo_JSON = JSON.stringify(lista_servicios);
 localStorage.setItem("lista_servicios" , arreglo_JSON);

}
//declaro un usuario registrado
const usuario_registrado = [];
//capturo el boton eliminar y el input del html
const boton_terminar = document.getElementById("terminar");
const input_nombre = document.getElementById("nombre_usuario");
const input_email = document.getElementById("email_usuario");
const input_telefono = document.getElementById("numero_usuario");
const error = document.getElementById("error");
error.style.color = "rgb(129, 4, 4)" ;

const btn_validar = document.getElementById("terminar").addEventListener("click", informacion);

const btn_ser_final = document.getElementById("terminar").addEventListener("click", usuario_final);

//funcion donde muestro atraves de la consola el turno del cliente con sus datos
function informacion() {
    
    const mensaje_error = [];

    
if ((input_nombre.value === null) || (input_nombre.value === "")) {
        mensaje_error.push("Ingresa tu nombre");
    }
    else if ((input_email.value === null) || (input_email.value === "")) {
        mensaje_error.push("Ingresa tu mail");
    }
    else if ((input_telefono.value === null) || (input_telefono.value === "")) {
        mensaje_error.push("Ingresa tu numero de celular");
    } 

    error.innerHTML = mensaje_error.join("")
   return false;
} 

function registrar_usuario(p_usuario,p_email,p_celular) {
    const newUsuario = {
        usuario : p_usuario,
        email : p_email,
        celular : p_celular
};
console.log(newUsuario);
usuario_registrado.push(newUsuario);

let usuario_JSON = JSON.stringify(newUsuario);
localStorage.setItem("newUsuario" , usuario_JSON);
}

function usuario_final() {
    const sUsuario = input_nombre.value;
    const sEmail = input_email.value;
    const sCelular = input_telefono.value;

    registrar_usuario(sUsuario,sEmail,sCelular)
}

const usuario_servicio = {
    ...usuario_registrado,
    ... lista_servicios,

}
console.log(usuario_servicio);
