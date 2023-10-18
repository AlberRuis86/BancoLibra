// ENUNCIADO 1
// Elemento del checkbox
const checkbox = document.getElementById("toggleTwo");
const dot = document.getElementById("dotTwo");

// Evento de escucha para el cambio de estado del checkbox
checkbox.addEventListener("change", function () {
  if (this.checked) {
    dot.style.backgroundColor = "#10B981";
    dot.style.transform = "translateX(24px)";
  } else {
    dot.style.backgroundColor = "white";
    dot.style.transform = "translateX(0)";
  }
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// ENUNCIADO 2 ////////////////////////////////////
// Elementos del DOM
const valueSquare = document.getElementById("valueSquare");
const loanAmountInput = document.getElementById("loan-amount");

loanAmountInput.addEventListener("input", function () {
  const currentValue = this.value;
  valueSquare.querySelector("div").textContent = currentValue;
});

valueSquare.querySelector("div").textContent = loanAmountInput.value;

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// ENUNCIADO 3 ///////////////////////////////////

// Elementos del DOM por la clase "cuota-button"
const cuotaButtons = document.querySelectorAll(".cuota-button");
let botonSeleccionado = null;

// Evento de escucha a los botones de cuotas
cuotaButtons.forEach((buttonCuota) => {
  buttonCuota.addEventListener("click", function () {
    if (botonSeleccionado) {
      botonSeleccionado.style.backgroundColor = "transparent";
      botonSeleccionado.style.color = "black";
      botonSeleccionado.style.fontWeight = "normal";
    }

    this.style.backgroundColor = "#A783F8";
    this.style.color = "black";             
    this.style.fontWeight = "bold";          

    botonSeleccionado = this;

    const selectedCuotas = this.getAttribute("data-cuotas");
  });
});

///////////////////////////// CALCULAR PRESTAMO ////////////////////////////////////

// Elementos del DOM por la clase "cuota-button"
const cuotasButtons = document.querySelectorAll(".cuota-button");
let selectedCuotas = null;

// Evento de escucha a los botones de cuotas
cuotasButtons.forEach((buttonCuota) => {
  buttonCuota.addEventListener("click", function () {
    cuotasButtons.forEach((btn) => {
      btn.classList.remove("selected");
    });

    this.classList.add("selected");

    selectedCuotas = this.getAttribute("data-cuotas");
  });
});

// Elementos del DOM
const calculateButton = document.querySelector("#calcularButton");

// Tasa de interes base
let tna = 0.127; // Tasa Nominal Anual

// Evento de escucha al botón "CALCULAR"
calculateButton.addEventListener("click", function () {
  // ENUNCIADO 1
  const enunciado1Checkbox = document.querySelector("#toggleTwo");
  const enunciado1Respuesta = enunciado1Checkbox.checked ? "Sí" : "No";

  // ENUNCIADO 2
  const enunciado2Monto = parseFloat(document.querySelector("#loan-amount").value);

  // ENUNCIADO 3
  const selectedCuotasButton = document.querySelector(".cuota-button.selected");
  const enunciado3Cuotas = selectedCuotasButton ? parseInt(selectedCuotasButton.getAttribute("data-cuotas")) : null;

  const tea = 0.23441; // Tasa Efectiva Anual

  if (enunciado1Respuesta === "Sí") {
    tna = 0.1; // Tasa de interés reducida para clientes del banco
  } else {
    // Si no eres cliente del banco, se utiliza la TNA base (0.127)
    tna = 0.127;
  }

  if (enunciado2Monto && enunciado3Cuotas) {
    const prestamo = enunciado2Monto;
    const tasaInteres = tna / 12; // Tasa de interés mensual (dividida por 12 meses)
    const cuotas = enunciado3Cuotas;

  // Calculo de cuota mensual
  const cuotaMensual = (prestamo * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -cuotas));

  // SweetAlert
  Swal.fire({
    title: "Resumen del Préstamo",
    html: `
      <p><strong>Préstamo:</strong> $${prestamo.toFixed(2)}</p>
      <p><strong>Tasa de Interés Anual (TNA):</strong> ${(tna * 100).toFixed(2)}%</p>
      <p><strong>Tasa de Interés Efectiva Anual (TEA):</strong> ${(tea * 100).toFixed(2)}%</p>
      <p><strong>Número de Cuotas:</strong> ${cuotas}</p>
      <p><strong>Cuota Mensual:</strong> $${cuotaMensual.toFixed(2)}</p>
    `,
    showCancelButton: true,
    confirmButtonText: "Confirmar Préstamo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {

      const prestamoGuardado = {
        monto: prestamo,
        tna: tna,
        tea: tea,
        cuotas: cuotas,
        cuotaMensual: cuotaMensual,
      };

      const prestamosGuardados = JSON.parse(localStorage.getItem("prestamo")) || [];

      prestamosGuardados.push(prestamoGuardado);

      localStorage.setItem("prestamo", JSON.stringify(prestamosGuardados));

      Swal.fire("¡Préstamo Confirmado!", "El préstamo ha sido confirmado.", "success");
    } else {
      Swal.fire("Préstamo Cancelado", "El préstamo ha sido cancelado.", "error");
    }
  });
} else {
  Swal.fire("Error", "Por favor, completa todos los enunciados para calcular el préstamo.", "error");
}
});

// Recupero los datos del préstamo desde localStorage, si existen
const prestamoGuardado = JSON.parse(localStorage.getItem("prestamo"));

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// LOCAL STORAGE //////////////////////////////////////////

function mostrarPrestamosGuardados() {
  const prestamoGuardado = JSON.parse(localStorage.getItem("prestamo")) || [];

  if (prestamoGuardado.length > 0) {
    // Crear un contenedor para las tarjetas de préstamos
    const container = document.createElement('div');
    container.className = 'prestamo-container';

    prestamoGuardado.forEach((prestamo, index) => {
      // Crear una tarjeta para cada préstamo
      const card = document.createElement('div');
      card.className = 'prestamo-card';

      // Contenido de la tarjeta
      card.innerHTML = `
        <hr>
        <div class="card-header font-bold">
          PRESTAMO #${index + 1}
        </div>
        <div class="card-body">
          <p><strong>Préstamo:</strong> $${prestamo.monto.toFixed(2)}</p>
          <p><strong>TNA (%):</strong> ${(prestamo.tna * 100).toFixed(2)}</p>
          <p><strong>TEA (%):</strong> ${(prestamo.tea * 100).toFixed(2)}</p>
          <p><strong>Número de Cuotas:</strong> ${prestamo.cuotas}</p>
          <p><strong>Cuota Mensual:</strong> $${prestamo.cuotaMensual.toFixed(2)}</p>
        </div>
        <hr>
      `;

      // Agregar la tarjeta al contenedor
      container.appendChild(card);
    });

    // Mostrar el contenedor con las tarjetas en la ventana emergente
    Swal.fire({
      title: "Préstamos Guardados",
      html: container,
      customClass: {
        popup: "custom-popup-class",
      },
    });
  } else {
    Swal.fire("No hay préstamos guardados", "No se encontraron préstamos guardados en el local storage.", "info");
  }
}

const prestamosButton = document.getElementById("prestamosButton");

// Evento de escucha al botón "prestamosButton"
prestamosButton.addEventListener("click", mostrarPrestamosGuardados);