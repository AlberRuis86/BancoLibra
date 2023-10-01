// **********************MODAL*************************************

// Obtén el elemento que se hace clic para abrir el modal
const abrirModalRegistro = document.getElementById("abrirModalRegistro");

// Obtén el modal de registro
const modalRegistro = document.getElementById("modalRegistro");

// Agrega un evento de clic al elemento para abrir el modal
abrirModalRegistro.addEventListener("click", function () {
    modalRegistro.classList.remove("hidden"); // Muestra el modal
});

// *************************** CERRAR MODAL *****************************

// Obtén el elemento del botón "Registrarse" dentro del modal
const registrarUsuarioBtn = document.getElementById("registrarUsuario");

// Agrega un evento de clic al botón "Registrarse"
registrarUsuarioBtn.addEventListener("click", function () {
    // Realiza las acciones necesarias para el registro aquí

    // Oculta el modal después de completar el registro
    modalRegistro.classList.add("hidden");
});

// ************* CAPTURA LOS DATOS EN EL REGISTRO ******************

registrarUsuarioBtn.addEventListener("click", function() {
  // Obtén los valores del formulario
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("emailRegistro").value;
  const contraseña = document.getElementById("passwordRegistro").value;

  console.log("Nombre:", nombre);
  console.log("Apellido:", apellido);
  console.log("Email:", email);
  console.log("Contraseña:", contraseña);

  // Guarda los datos en el localStorage
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("email", email);
  localStorage.setItem("contraseña", contraseña);

  // Cierra el modal (puedes ocultarlo como lo hacías antes)
  modalRegistro.classList.add("hidden");
});

// *****************************************************************

// Obtén el botón "Iniciar Sesión" y agrega un evento de clic
const iniciarSesionBtn = document.getElementById("iniciarSesion");

// Event listener para el botón de inicio de sesión
document.getElementById("iniciarSesion").addEventListener("click", function() {
  console.log("Evento de inicio de sesión activado"); // Agrega este console.log
  // Obtén los valores del formulario de inicio de sesión
  const email = document.getElementById("email").value;
  const contraseña = document.getElementById("password").value;

  // Obtén los datos almacenados en el localStorage
  const almacenadoEmail = localStorage.getItem("email");
  const almacenadaContraseña = localStorage.getItem("contraseña");

  // Compara las credenciales
  if (email === almacenadoEmail && contraseña === almacenadaContraseña) {
      // Credenciales correctas, redirige al usuario o realiza acciones necesarias
      alert("Inicio de sesión exitoso");
  } else {
      alert("Credenciales incorrectas");
  }
});

// ********************* Reedirección a la pagina inversiones ***************************

// Event listener para el botón de inicio de sesión
document.getElementById("iniciarSesion").addEventListener("click", function() {
  // Obtén los valores del formulario de inicio de sesión
  const email = document.getElementById("email").value;
  const contraseña = document.getElementById("password").value;

  // Obtén los datos almacenados en el localStorage
  const almacenadoEmail = localStorage.getItem("email");
  const almacenadaContraseña = localStorage.getItem("contraseña");

  // Compara las credenciales
  if (email === almacenadoEmail && contraseña === almacenadaContraseña) {
    // Credenciales correctas, redirige al usuario a inversiones.html
    window.location.href = "inversiones.html";
  } else {
    alert("Credenciales incorrectas");
  }
});
