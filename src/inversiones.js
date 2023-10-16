document.addEventListener("DOMContentLoaded", function () {
  let todasLasInversiones = [];
  // *****************************************************************
  // ************************* FUNCIONES *****************************
  // *****************************************************************

  // CALCULAR GANANCIA
  function calcularGananciaInteres(monto, tasaMensual, duracion) {
    const montoTotal = monto * Math.pow(1 + tasaMensual, duracion);
    return montoTotal - monto;
  }
  // MOSTRAR DETALLES
  function mostrarDetallesInversion(opcion) {
    const resultadoInversion = document.getElementById("resultadoInversion");
    const tipoInversionResultado = document.getElementById("tipoInversionResultado");
    const montoInversionResultado = document.getElementById("montoInversionResultado");
    const duracionMesesResultado = document.getElementById("duracionMesesResultado");
    const tasaInteresResultado = document.getElementById("tasaInteresResultado");
    const gananciaInteresResultado = document.getElementById("gananciaInteresResultado");
    const montoTotalResultado = document.getElementById("montoTotalResultado");

    tipoInversionResultado.textContent = `Tipo de inversión: ${opcion.tipo}`;
    montoInversionResultado.textContent = `Monto de inversión: $${opcion.montoInversion}`;
    duracionMesesResultado.textContent = `Duración en meses: ${opcion.duracionMeses} meses`;
    tasaInteresResultado.textContent = `Tasa de interés: ${opcion.tasaInteres}`;
    gananciaInteresResultado.textContent = `Ganancia de interés: $${opcion.gananciaInteres}`;
    montoTotalResultado.textContent = `Monto total: $${opcion.montoTotal}`;

    resultadoInversion.classList.remove("hidden");
  }

  //************************** LISTAR TODAS LAS INVERSIONES **********************************

  // FUNCION PARA LISTAR
  function listarTodasLasInversiones() {
    const listaInversionesContainer = document.getElementById("listaInversionesContainer");
    listaInversionesContainer.innerHTML = "";
    const inversionesGuardadas = obtenerTodasLasInversiones();

    if (inversionesGuardadas.length > 0) {
      inversionesGuardadas.forEach((opcion) => {
        let tasaInteres = "";

        if (
          opcion.tipo === "Plazo Fijo Tradicional" ||
          opcion.tipo === "Plazo Fijo Renta Mensual"
        ) {
          tasaInteres = opcion.tasaInteres;
        }
        // CREAR CARD PARA MOSTRAR DATOS
        const card = document.createElement("div");
        card.classList.add("card", "m-auto");

        card.innerHTML = `
        <div class="card-body bg-white">
          <h5 class="card-title tipoDeInversion">${opcion.tipo}</h5>
          <p class="card-text montoDeInversion">${opcion.montoInversion}</p>
          <p class="card-text duracionEnMeses">${opcion.duracionMeses}</p>
          <p class="card-text">${opcion.tasaInteres}</p>
          <p class="card-text">${opcion.gananciaInteres}</p>
          <p class="card-text">${opcion.montoTotal}</p>
        </div>
      `;

        listaInversionesContainer.appendChild(card);
      });
      // MOSTRAR LA LISTA
      listaInversionesContainer.classList.remove("hidden");
      // MOSTRAR LA VENTANA EMERGENTE "listaInversiones"
      const listaInversiones = document.getElementById("listaInversiones");
      listaInversiones.classList.remove("hidden");
    } else {
      // SI NO HAY INVERSIONES SE MUESTRA ESTO
      listaInversionesContainer.innerHTML = `<p>No hay inversiones para mostrar.</p>`;
    }

    // BOTON DE CERRAR
    const cerrarBtn = document.getElementById("cerrarBtn");

    // EVENTO BOTON CERRAR
    cerrarBtn.addEventListener("click", function () {
      const listaInversiones = document.getElementById("listaInversiones");
      listaInversiones.classList.add("hidden");
    });
  }
  //************************** OBTENER LAS INVERSIONES *********************************
  function obtenerTodasLasInversiones() {
    const inversionesGuardadas =
      JSON.parse(localStorage.getItem("inversiones")) || [];
    return inversionesGuardadas;
  }
  // BUSCA Y MUESTRA RESULTADOS EN VENTANA EMERGENTE
  function buscarInversiones() {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const inversionesGuardadas = obtenerTodasLasInversiones();

    if (searchTerm === "") {
      mostrarInversiones(inversionesGuardadas);
      return;
    }

    const resultados = inversionesGuardadas.filter((opcion) => {
      const tipoInversion = opcion.tipo.toLowerCase();
      const montoInversion = opcion.montoInversion.toString().toLowerCase();
      const duracionMeses = opcion.duracionMeses.toString().toLowerCase();
      const tasaInteres = opcion.tasaInteres.toString().toLowerCase();
      const gananciaInteres = opcion.gananciaInteres.toString().toLowerCase();
      const montoTotal = opcion.montoTotal.toString().toLowerCase();

      return (
        tipoInversion.includes(searchTerm) ||
        montoInversion.includes(searchTerm) ||
        duracionMeses.includes(searchTerm) ||
        tasaInteres.includes(searchTerm) ||
        gananciaInteres.includes(searchTerm) ||
        montoTotal.includes(searchTerm)
      );
    });
    mostrarInversiones(resultados);
  }
  //*********************** MOSTRAR LAS INVERSIONES ******************************
  function mostrarInversiones(inversiones) {
    const listaInversionesContainer = document.getElementById("listaInversionesContainer");
    listaInversionesContainer.innerHTML = "";

    if (inversiones.length > 0) {
      inversiones.forEach((opcion) => {
        let tasaInteres = "";

        if (
          opcion.tipo === "Plazo Fijo Tradicional" ||
          opcion.tipo === "Plazo Fijo Renta Mensual"
        ) {
          tasaInteres = opcion.tasaInteres;
        }

        const inversionElement = document.createElement("div");
        inversionElement.classList.add(
          "bg-white",
          "p-2",
          "m-2",
          "rounded",
          "shadow-md"
        );

        inversionElement.innerHTML = `
        <p>${opcion.tipo}</p>
        <p>${opcion.montoInversion}</p>
        <p>${opcion.duracionMeses}</p>
        <p>${opcion.tasaInteres}</p>
        <p>${opcion.gananciaInteres}</p>
        <p>${opcion.montoTotal}</p>
      `;

        listaInversionesContainer.appendChild(inversionElement);
      });
    } else {
      // Muestra un mensaje si no se encuentran resultados
      listaInversionesContainer.innerHTML = `<p>No se encontraron resultados.</p>`;
    }
    // Muestra la ventana emergente de búsqueda
    const listaInversiones = document.getElementById("listaInversiones");
    listaInversiones.classList.remove("hidden");
  }
  // *****************************************************************
  // ************************* EVENTOS *******************************
  // *****************************************************************

  //BOTON "ELEGIR TIPO DE PLAZO FIJO"
  document
    .getElementById("elegirTipoBtn")
    .addEventListener("click", function () {
      const formularioInversion = document.getElementById(
        "formularioInversion"
      );
      formularioInversion.classList.remove("hidden");
    });

  // BOTON "CALCULAR INVERSION"
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

      let gananciaInteres;
      let montoTotal;
      let tasaInteres;

      const tasaInteresAnualTrad = 0.05;
      const tasaInteresMensualTrad = tasaInteresAnualTrad / 12;
      const tasaInteresMensualRenta = 0.03;

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
        tasaInteres =
          (tasaInteresMensualRenta * 100).toFixed(2) + "% (mensual)";
      }

      mostrarDetallesInversion({
        tipo: tipoInversion,
        montoInversion: montoInversion.toFixed(2),
        duracionMeses,
        tasaInteres,
        gananciaInteres: gananciaInteres.toFixed(2),
        montoTotal: montoTotal.toFixed(2),
      });

      // Detalles en la ventana emergente resultado
      const resultadoInversion = document.getElementById("resultadoInversion");
      resultadoInversion.classList.remove("hidden");

      // Oculta la ventana de formulario
      const formularioInversion = document.getElementById("formularioInversion");
      formularioInversion.classList.add("hidden");
    });
  // Evento al hacer click en el botón "Cancelar" en la ventana emergente de resultado
  document.getElementById("cancelarBtn").addEventListener("click", function () {
    const resultadoInversion = document.getElementById("resultadoInversion");
    resultadoInversion.classList.add("hidden");
  });
  //******************************** CONTRATAR *********************************************
  document
    .getElementById("contratarBtn")
    .addEventListener("click", function () {
      const tipoInversion = document.getElementById(
        "tipoInversionResultado"
      ).textContent;
      const montoInversion = document.getElementById(
        "montoInversionResultado"
      ).textContent;
      const duracionMeses = document.getElementById(
        "duracionMesesResultado"
      ).textContent;
      const tasaInteres = document.getElementById(
        "tasaInteresResultado"
      ).textContent;
      const gananciaInteres = document.getElementById(
        "gananciaInteresResultado"
      ).textContent;
      const montoTotal = document.getElementById(
        "montoTotalResultado"
      ).textContent;

      const nuevaInversion = {
        tipo: tipoInversion,
        montoInversion: montoInversion,
        duracionMeses: duracionMeses,
        tasaInteres: tasaInteres,
        gananciaInteres: gananciaInteres,
        montoTotal: montoTotal,
      };
      // Obtener las inversiones actuales del localStorage
      const inversionesGuardadas = obtenerTodasLasInversiones();
      // Agregar la nueva inversión al arreglo
      inversionesGuardadas.push(nuevaInversion);
      // Guardar el arreglo de inversiones actualizado en el localStorage
      localStorage.setItem("inversiones", JSON.stringify(inversionesGuardadas));
      // Ocultar la ventana de contratación después de guardar la inversión
      const ventanaContratar = document.getElementById("resultadoInversion");
      ventanaContratar.classList.add("hidden");
    });
  //********************* EVENTO BUSQUEDA ******************************
  // Click en el botón de búsqueda
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      buscarInversiones();
    });
  // Evento ENTER en el campo de búsqueda
  document
    .getElementById("searchInput")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        buscarInversiones();
      }
    });
  // EVENTO BOTON "LISTAR TODAS MIS INVERSIONES"
  document
    .getElementById("listarTodasBtn")
    .addEventListener("click", function () {
      listarTodasLasInversiones();
    });
  // EVENTO BOTON CERRAR EN VENTANA EMERGENTE
  const cerrarBtn = document.getElementById("cerrarBtn");
  cerrarBtn.addEventListener("click", () => {
   const listaInversiones = document.getElementById("listaInversiones");
    listaInversiones.classList.add("hidden");
  });
  // *****************************************************************
  // ************************* INICIALIZACION ************************
  // *****************************************************************

  // Ocultar las ventanas emergentes al inicio
  const formularioInversion = document.getElementById("formularioInversion");
  formularioInversion.classList.add("hidden");

  // *****************************************************************
  // ************************* API ************************
  // *****************************************************************

  // URL de la API de cotización del dólar
  const apiUrl = "https://dolarapi.com/v1/dolares";

  // Contenedor donde se mostrarán las tarjetas
  const tarjetasContainer = document.getElementById("tarjetasContainer");

  // Función para obtener los datos de la API
  async function obtenerDatosApi() {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }

      const data = await response.json();

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const cotizacion = data[key];

          const tarjeta = document.createElement("div");
          tarjeta.classList.add(
            "card",
            "bg-gray-100",
            "border-double",
            "border-4",
            "border-sky-600",
            "rounded",
            "m-2",
            "text-center",
            "p-2",
            "font-semibold"
          );

          tarjeta.innerHTML = `
          <p>${cotizacion.casa}</p>
          <p>Precio de Compra: ${cotizacion.compra}</p>
          <p>Precio de Venta: ${cotizacion.venta}</p>
        `;

          tarjetasContainer.appendChild(tarjeta);
        }
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  obtenerDatosApi();

  setInterval(obtenerDatosApi, 43200000); // 43,200,000 ms = 12 horas
});
