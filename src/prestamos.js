// Obtén el elemento del checkbox y el punto (dot)
const checkbox = document.getElementById("toggleTwo");
const dot = document.getElementById("dotTwo");

// Agrega un evento de escucha para el cambio de estado del checkbox
checkbox.addEventListener("change", function () {
  // Si el checkbox está marcado, mueve el punto hacia la derecha
  if (this.checked) {
    dot.style.transform = "translateX(24px)";
  } else {
    // Si el checkbox no está marcado, devuelve el punto a su posición original
    dot.style.transform = "translateX(0)";
  }
});

