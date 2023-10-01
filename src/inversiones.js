// Calcular la ganancia de interés
function calcularGananciaInteres(monto, tasaMensual, duracion) {
  const montoTotal = monto * Math.pow(1 + tasaMensual, duracion);
  return montoTotal - monto;
}

// Mostrar detalles de la inversión
function mostrarDetallesInversion(opcion) {
  let tasaInteres = "";

  if (
    opcion.tipo === "Plazo Fijo Tradicional" ||
    opcion.tipo === "Plazo Fijo Renta Mensual"
  ) {
    tasaInteres = opcion.tasaInteres + "% (mensual)";
  }

  alert(`Detalles de la inversión:
      Tipo de inversión: ${opcion.tipo}
      Monto de inversión: $${opcion.montoInversion}
      Duración en meses: ${opcion.duracionMeses} meses
      Tasa de interés: ${tasaInteres}
      Ganancia de interés: $${opcion.gananciaInteres}
      Monto total: $${opcion.montoTotal}`);

  window.close();
}

function listarTodasLasInversiones() {
  const listaInversiones = document.getElementById("listaInversiones");
  listaInversiones.innerHTML = ""; // Limpia cualquier contenido previo

  const inversionesGuardadas =
    JSON.parse(localStorage.getItem("inversiones")) || [];

  inversionesGuardadas.forEach((opcion) => {
    let tasaInteres = "";

    if (opcion.tipo === "Plazo Fijo Tradicional" || opcion.tipo === "Plazo Fijo Renta Mensual") {
      tasaInteres = opcion.tasaInteres + "% (mensual)";
    }

    // Crear elementos HTML para mostrar la información
    const inversionElement = document.createElement("div");
    inversionElement.classList.add("bg-white", "p-2", "rounded", "shadow-md");

    inversionElement.innerHTML = `
      <p>Tipo de inversión: ${opcion.tipo}</p>
      <p>Monto de inversión: $${opcion.montoInversion}</p>
      <p>Duración en meses: ${opcion.duracionMeses} meses</p>
      <p>Tasa de interés: ${tasaInteres}</p>
      <p>Ganancia de interés: $${opcion.gananciaInteres}</p>
      <p>Monto total: $${opcion.montoTotal}</p>
    `;

    listaInversiones.appendChild(inversionElement);
  });

  // Después de agregar la lista, asegúrate de crear y agregar el botón de cerrar
  const cerrarBtn = document.createElement("button");
  cerrarBtn.id = "cerrarBtn";
  cerrarBtn.textContent = "Cerrar";
  cerrarBtn.classList.add("bg-gray-300");
  cerrarBtn.addEventListener("click", function () {
    listaInversiones.classList.add("hidden"); // Ocultar la lista
  });

  listaInversiones.appendChild(cerrarBtn);

  listaInversiones.classList.remove("hidden"); // Mostrar la lista
}


// Clic en el botón "Elegir Tipo de Plazo Fijo"
document.getElementById("elegirTipoBtn").addEventListener("click", function () {
  const formularioInversion = document.getElementById("formularioInversion");
  formularioInversion.classList.remove("hidden");
});

// Clic en el botón "Calcular Inversión"
document
  .getElementById("calcularInversionBtn")
  .addEventListener("click", function () {
    const tipoInversion = document.getElementById("tipoInversion").value;
    const montoInversion = parseFloat(
      document.getElementById("montoInversion").value
    );
    const duracionMeses = parseInt(
      document.getElementById("duracionMeses").value
    );

    // Calcular la inversión y mostrar detalles
    const tasaInteresAnualTrad = 0.05;
    const tasaInteresMensualTrad = tasaInteresAnualTrad / 12;

    const tasaInteresMensualRenta = 0.03;
    let gananciaInteres;
    let montoTotal;
    let tasaInteres;

    if (tipoInversion === "Plazo Fijo Tradicional") {
      gananciaInteres = calcularGananciaInteres(
        montoInversion,
        tasaInteresMensualTrad,
        duracionMeses
      );
      montoTotal = montoInversion + gananciaInteres;
      tasaInteres = (tasaInteresAnualTrad * 100).toFixed(2) + "% (anual)";
    } else if (tipoInversion === "Plazo Fijo Renta Mensual") {
      gananciaInteres = calcularGananciaInteres(
        montoInversion,
        tasaInteresMensualRenta,
        duracionMeses
      );
      montoTotal = montoInversion + gananciaInteres;
      tasaInteres = (tasaInteresMensualRenta * 100).toFixed(2) + "% (mensual)";
    }

    mostrarDetallesInversion({
      tipo: tipoInversion,
      montoInversion: montoInversion.toFixed(2),
      duracionMeses,
      tasaInteres,
      gananciaInteres: gananciaInteres.toFixed(2),
      montoTotal: montoTotal.toFixed(2),
    });

    // Representar la inversión actual
    const inversionActual = {
      tipo: tipoInversion,
      montoInversion: montoInversion.toFixed(2),
      duracionMeses,
      tasaInteres,
      gananciaInteres: gananciaInteres.toFixed(2),
      montoTotal: montoTotal.toFixed(2),
    };

    // Array de inversiones existente en localStorage
    const inversionesGuardadas =
      JSON.parse(localStorage.getItem("inversiones")) || [];

    // Agrega la nueva inversión al array
    inversionesGuardadas.push(inversionActual);

    // Guarda el array de inversiones actualizado en localStorage
    localStorage.setItem("inversiones", JSON.stringify(inversionesGuardadas));

    // Limpia los campos del form
    document.getElementById("tipoInversion").value = "Plazo Fijo Tradicional";
    document.getElementById("montoInversion").value = "";
    document.getElementById("duracionMeses").value = "";

    // Oculta el form nuevamente
    const formularioInversion = document.getElementById("formularioInversion");
    formularioInversion.classList.add("hidden");
  });

// Evento al hacer clic en el botón "Listar Todas mis Inversiones"
document.getElementById("listarTodasBtn").addEventListener("click", function () {
  const listaInversiones = document.getElementById("listaInversiones");
  const cerrarBtn = document.getElementById("cerrarBtn");
  listaInversiones.classList.remove("hidden");
});

// Evento al hacer clic en el botón "Cerrar"
document.getElementById("cerrarBtn").addEventListener("click", function () {
  const listaInversiones = document.getElementById("listaInversiones");
  const cerrarBtn = document.getElementById("cerrarBtn");
  listaInversiones.classList.add("hidden");
});




