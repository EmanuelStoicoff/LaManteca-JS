//clase para crear los productos
class Producto{
    constructor(id, nombre, precio, cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

//donde van a estar almacenados los productos
const productos = [];

//funcion para agregar productos al array
function subirProducto(id, nombre, precio, cantidad) {
    const producto = new Producto(id, nombre, precio, cantidad);
    productos.push(producto);
}


subirProducto(1, "Baguettes", 400, 1);
subirProducto(2, "Facturas surtidas", 125, 0);
subirProducto(3, "Medialunas de grasa", 125, 0);
subirProducto(4, "Medialunas de manteca", 125, 0);
subirProducto(5, "Cremona", 300, 1);
subirProducto(6, "Bizcochitos", 500, 1);
subirProducto(7, "Pan de molde salvado", 500, 1);
subirProducto(8, "Pan de molde blanco", 500, 1);
subirProducto(9, "Grisines", 500, 1);
subirProducto(10, "Pan de campo", 600, 1);
subirProducto(11, "Prepizzas", 300, 1);
subirProducto(12, "Empanadas", 200, 0);
subirProducto(13, "Tarta de jamon y queso", 2000, 1);
subirProducto(14, "Tarta de verduras", 2000, 1);


const divProductosCarrito = document.querySelector(".divProductosCarrito")
const cantidadResumenCompra = document.querySelector(".cantidadResumenCompra")
const totalProductos = document.querySelector(".totalProductos");
const envio = document.querySelector(".envio");
const totalConEnvio = document.querySelector(".totalConEnvio");
const formBuscar = document.querySelector("#formBuscar");
const inputBuscar = document.querySelector("#inputBuscar");


//botones
const btnAgregar = document.querySelectorAll(".btnAgregar");
for (const boton of btnAgregar) {
    boton.addEventListener("click", function(){
        const id = parseInt(boton.dataset.id);
        const producto = productos.find((producto) => producto.id === id);
        carrito.agregarProducto(producto);
    });
}

const btnInput = document.querySelectorAll(".btnInput");
for (const boton of btnInput) {
  boton.addEventListener("click", function() {
    const id = parseInt(boton.dataset.id);
    const producto = productos.find((producto) => producto.id === id);

    // Obtener el input correspondiente al botón actual
    const input = boton.parentElement.querySelector(".input");
    const cantidad = Number(input.value);
    //me aseguro de que el input no este vacio
    if(cantidad > 0){
      carrito.agregarProductoInput(producto, cantidad);
    }
    // Restablecer el valor del input a vacío
    input.value = "";
  });
}

//buscador // no supe como hacer, lo dejo para la proxima

// function buscarProductos(palabra) {
//   const productosFiltrados = buscarPalabra(palabra);
//   mostrarProductos(productosFiltrados);
// }

// function mostrarProductos(productos) {
//   const divResultados = document.querySelector("#divResultados");
//   divResultados.innerHTML = "";
//   for (const producto of productos) {
//     const productoHTML = `
//       <div>
//         <h3>${producto.nombre}</h3>
//         <p>Precio: $${producto.precio}</p>
//       </div>
//     `;
//     divResultados.innerHTML += productoHTML;
//   }
// }

// inputBuscar.addEventListener("input", function() {
//   const palabra = inputBuscar.value.toLowerCase();
//   buscarProductos(palabra);
// });

// formBuscar.addEventListener("submit", (e)=>{
//   e.preventDefault();
//   const palabra = inputBuscar.value;

// })


//clase carrito donde se van a almacenar despues del evento click
class Carrito{
    constructor(){
      const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
      this.productosEnCarrito = carritoStorage || [];
      this.cantidadProductos = 0;
      this.total = 0;
      this.mostrarProductos();
    }
    //para fijarse si el producto ya esta en el carrito
    buscarProducto(producto){
        return this.productosEnCarrito.find((item) => item.id === producto.id);
    }
    //para agregar los productos seleccionados 
    agregarProducto(producto) {
        const estaEnCarrito = this.buscarProducto(producto);
    
        if (estaEnCarrito) {
          estaEnCarrito.cantidad++;
        }else {
          // const nuevoProducto = new Producto(
          //   producto.id,
          //   producto.nombre,
          //   producto.precio,
          //   1
          // );
          // this.productosEnCarrito.push(nuevoProducto);
          this.productosEnCarrito.push({...producto})
        }
        localStorage.setItem("carrito", JSON.stringify(this.productosEnCarrito));
        this.mostrarProductos();
      }
      //para agregar los productos seleccionados que tienen input
      agregarProductoInput(producto, cantidad) {
        const estaEnCarrito = this.buscarProducto(producto);

        if (estaEnCarrito) {
          estaEnCarrito.cantidad += cantidad;
        } else {
          this.productosEnCarrito.push({...producto, cantidad: cantidad});
        }
        localStorage.setItem("carrito", JSON.stringify(this.productosEnCarrito))
        this.mostrarProductos();
      }
      //para que se muestren los productos en carrito
      mostrarProductos(){
        if(!divProductosCarrito){
          return;
        }
        this.cantidadProductos = 0;
        this.total = 0;
        divProductosCarrito.innerHTML = "";
          for(const producto of this.productosEnCarrito){
            const totalProducto = producto.precio * producto.cantidad;
            divProductosCarrito.innerHTML +=`
            <div class="d-flex justify-content-between border border-dark rounded ps-2 pe-2 pb-2 m-2">
              <div>
                <img src="../img/productos/${producto.nombre}.jpg" alt="${producto.nombre}" class="mt-2 img-productos">
              </div> 
              <div class="d-flex flex-column justify-content-evenly"> 
                <div class="nombreProducto">
                  <h2>${producto.nombre}</h2>
                </div>
                <div class="d-flex justify-content-between">
                  <div>  
                    <button class="btn btnEliminar" data-id="${producto.id}">Eliminar</button>
                  </div>
                  <br>
                  <div class="d-flex">  
                    <button class="btn btnRestar" data-id="${producto.id}">-</button>
                    <p class="cantidadEnCarrito"<strong>${producto.cantidad}</strong></p>
                    <button class="btn btnSumar" data-id="${producto.id}">+</button>
                  </div>
                </div>  
              </div>  
              <div class="d-flex align-items-center me-3">  
                <h4>$${totalProducto}</h4>
              </div> 
            </div>`;
            this.total += totalProducto;
            this.cantidadProductos += producto.cantidad;
        }
        //
        const btnEliminar = document.querySelectorAll(".btnEliminar");
        for (const boton of btnEliminar) {
          boton.addEventListener("click", () => {
            carrito.eliminar(boton.dataset.id);
          });
        }
        const btnRestar = document.querySelectorAll(".btnRestar");
        for (const boton of btnRestar) {
          boton.addEventListener("click", () => {
            carrito.restarCantidad(boton.dataset.id);
          });
        }
        const btnSumar = document.querySelectorAll(".btnSumar");
        for (const boton of btnSumar) {
          boton.addEventListener("click", () => {
            carrito.sumarCantidad(boton.dataset.id);
          });
        }
        cantidadResumenCompra.innerText = this.cantidadProductos;
        totalProductos.innerText = this.total;
        let valorEnvio;
        if (this.productosEnCarrito.length === 0) {
          // No hay productos en el carrito, establecer valor de envío y total a cero
          envio.innerHTML = `<span>-</span>`;
          totalConEnvio.innerText = "0";
        }else if(this.total >= 5000){
          envio.innerHTML = `<span class="textoGratis">Gratis</span>`;
          totalConEnvio.innerText = this.total;

        }else{
          valorEnvio = 800;
          envio.innerText = ("$"+valorEnvio);
          totalConEnvio.innerText = this.total + valorEnvio;
        }
        localStorage.setItem("carrito", JSON.stringify(this.productosEnCarrito));
      }
      //para eliminar el proucto completo
      eliminar(id){
        const indice = this.productosEnCarrito.findIndex((producto) => producto.id === parseInt(id));
        this.productosEnCarrito.splice(indice, 1);
        localStorage.setItem("carrito", JSON.stringify(this.productosEnCarrito));
        this.mostrarProductos();
      }
      restarCantidad(id){
        const indice = this.productosEnCarrito.findIndex((producto) => producto.id === parseInt(id));
        if(this.productosEnCarrito[indice].cantidad > 1){
          this.productosEnCarrito[indice].cantidad--;
        } else{
          this.productosEnCarrito.splice(indice, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(this.productosEnCarrito));
        this.mostrarProductos();
      }
      sumarCantidad(id){
        const indice = this.productosEnCarrito.findIndex((producto) => producto.id === parseInt(id));
        if(this.productosEnCarrito[indice].cantidad >= 1){
          this.productosEnCarrito[indice].cantidad++;
        } else{
          this.productosEnCarrito.splice(indice, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(this.productosEnCarrito));
        this.mostrarProductos();
      }
}

const carrito = new Carrito();

