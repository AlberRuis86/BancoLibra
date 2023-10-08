document.addEventListener("DOMContentLoaded", function () {
  // **********************MODAL*************************************
  const abrirModalRegistro = document.getElementById("abrirModalRegistro");
  const modalRegistro = document.getElementById("modalRegistro");
  abrirModalRegistro.addEventListener("click", function () {
    modalRegistro.classList.remove("hidden");
  });
  // *************************** CERRAR MODAL *****************************
  const registrarUsuarioBtn = document.getElementById("registrarUsuario");
  registrarUsuarioBtn.addEventListener("click", function () {
    modalRegistro.classList.add("hidden");
  });
  // ************* CAPTURA LOS DATOS EN EL REGISTRO ******************
  registrarUsuarioBtn.addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("emailRegistro").value;
    const contraseña = document.getElementById("passwordRegistro").value;

    console.log("Nombre:", nombre);
    console.log("Apellido:", apellido);
    console.log("Email:", email);
    console.log("Contraseña:", contraseña);

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("email", email);
    localStorage.setItem("contraseña", contraseña);

    modalRegistro.classList.add("hidden");
  });

  // ******************** SWEET ALERT **********************************
  function mostrarSweetAlert(title, text, icon, confirmButtonText, timer) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: confirmButtonText,
      timer: timer,
      showConfirmButton: true,
    });
  }
  // ******************** INICIAR SESION ********************************
  const iniciarSesionBtn = document.getElementById("iniciarSesion");

  document
    .getElementById("iniciarSesion")
    .addEventListener("click", function () {
      const email = document.getElementById("email").value;
      const contraseña = document.getElementById("password").value;
      const almacenadoEmail = localStorage.getItem("email");
      const almacenadaContraseña = localStorage.getItem("contraseña");

      if (email === almacenadoEmail && contraseña === almacenadaContraseña) {
        mostrarSweetAlert(
          "Éxito",
          "Inicio de sesión exitoso",
          "success",
          "Continuar",
          2000
        );
        setTimeout(function () {
          window.location.href = "inversiones.html";
        }, 2000);
      } else {
        mostrarSweetAlert(
          "Error",
          "Credenciales incorrectas",
          "error",
          "Entendido",
          2000
        );
      }
    });

  // ********************* Reedirección a la pagina inversiones ***************************
  document
    .getElementById("iniciarSesion")
    .addEventListener("click", function () {
      const email = document.getElementById("email").value;
      const contraseña = document.getElementById("password").value;
      const almacenadoEmail = localStorage.getItem("email");
      const almacenadaContraseña = localStorage.getItem("contraseña");

      if (email === almacenadoEmail && contraseña === almacenadaContraseña) {
        mostrarSweetAlert(
          "Éxito",
          "Inicio de sesión exitoso",
          "success",
          "Continuar",
          "2000"
        );
      } else {
        mostrarSweetAlert(
          "Error",
          "Credenciales incorrectas",
          "error",
          "Entendido",
          2000
        );
      }
    });
});
