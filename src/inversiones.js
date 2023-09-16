// Array para almacenar opciones de inversión
const opcionesInversion = [];

// Elegir el tipo de inversión
function elegirTipoInversion() {
    const tipoInversion = prompt("Elija el tipo de inversión:\n1. Plazo Fijo Tradicional\n2. Plazo Fijo Renta Mensual");

    if (tipoInversion === "1") {
        crearPlazoFijoTradicional();
    } else if (tipoInversion === "2") {
        crearPlazoFijoRentaMensual();
    } else {
        alert("Opción inválida.");
    }
}

// Crear un plazo fijo tradicional
function crearPlazoFijoTradicional() {
    const montoInversion = parseFloat(prompt("Ingrese el monto de inversión:"));
    const duracionMeses = parseInt(prompt("Ingrese la duración en meses:"));

    if (isNaN(montoInversion) || isNaN(duracionMeses) || montoInversion <= 0 || duracionMeses <= 0) {
        alert("Monto o duración inválidos.");
        return;
    }

    const tasaInteresAnual = 0.05;
    const tasaInteresMensual = tasaInteresAnual / 12; // Tasa de interés mensual segun plazo fijo tradicional
    const gananciaInteres = calcularGananciaInteres(montoInversion, tasaInteresMensual, duracionMeses);
    const montoTotal = montoInversion + gananciaInteres;

    console.log("Tasa de interés anual:", tasaInteresAnual);
    console.log("Tasa de interés mensual:", tasaInteresMensual);

    const opcionInversion = {
        tipo: "Plazo Fijo Tradicional",
        montoInversion: montoInversion.toFixed(2),
        duracionMeses,
        tasaInteresAnual: (tasaInteresAnual * 100).toFixed(2),
        tasaInteresMensual: (tasaInteresMensual * 100).toFixed(2),
        gananciaInteres: gananciaInteres.toFixed(2),
        montoTotal: montoTotal.toFixed(2),
    };

    opcionesInversion.push(opcionInversion);

    mostrarDetallesInversion(opcionInversion);
}

// Calcular la ganancia de interés
// Aqui iba a utilizar un bucle for, pero encontre que se puede utilizar math.pow
function calcularGananciaInteres(monto, tasaMensual, duracion) {
    const montoTotal = monto * Math.pow(1 + tasaMensual, duracion);
    return montoTotal - monto;
}

// Crear un plazo fijo de renta mensual
function crearPlazoFijoRentaMensual() {
    const montoInversion = parseFloat(prompt("Ingrese el monto de inversión:"));
    const duracionMeses = parseInt(prompt("Ingrese la duración en meses:"));

    if (isNaN(montoInversion) || isNaN(duracionMeses) || montoInversion <= 0 || duracionMeses <= 0) {
        alert("Monto o duración inválidos.");
        return;
    }

    const tasaInteresMensual = 0.03; // Tasa de interés mensual
    const gananciaInteresMensual = calcularGananciaInteres(montoInversion, tasaInteresMensual, duracionMeses);
    const montoTotal = montoInversion + gananciaInteresMensual;

    const opcionInversion = {
        tipo: "Plazo Fijo Renta Mensual",
        montoInversion: montoInversion.toFixed(2),
        duracionMeses,
        tasaInteres: (tasaInteresMensual * 100).toFixed(2),
        gananciaInteres: gananciaInteresMensual.toFixed(2),
        montoTotal: montoTotal.toFixed(2),
    };

    opcionesInversion.push(opcionInversion);

    mostrarDetallesInversion(opcionInversion);
}


// Función para mostrar detalles de la inversión
function mostrarDetallesInversion(opcion) {
    let tasaInteres = "";

    if (opcion.tipo === "Plazo Fijo Tradicional") {
        tasaInteres = opcion.tasaInteresAnual + "% (anual)";
    } else if (opcion.tipo === "Plazo Fijo Renta Mensual") {
        tasaInteres = opcion.tasaInteres + "% (mensual)";
    }

    alert(`Detalles de la inversión:
    Tipo de inversión: ${opcion.tipo}
    Monto de inversión: $${opcion.montoInversion}
    Duración en meses: ${opcion.duracionMeses} meses
    Tasa de interés: ${tasaInteres}
    Ganancia de interés: $${opcion.gananciaInteres}
    Monto total: $${opcion.montoTotal}`);
}



// Función para buscar una inversión
function buscarInversionPorTipo(tipo) {
    const inversionEncontrada = opcionesInversion.find(opcion => opcion.tipo === tipo);

    if (inversionEncontrada) {
        mostrarDetallesInversion(inversionEncontrada);
    } else {
        alert(`No se encontró una inversión de tipo: ${tipo}`);
    }
}

// Función para listar todas las inversiones
function listarTodasLasInversiones() {
    alert("Tus inversiones =>");

    opcionesInversion.forEach(opcion => {
        let tasaInteres = "";
        
        if (opcion.tipo === "Plazo Fijo Tradicional") {
            tasaInteres = opcion.tasaInteresAnual + "% (anual)";
        } else if (opcion.tipo === "Plazo Fijo Renta Mensual") {
            tasaInteres = opcion.tasaInteres + "% (mensual)";
        }

        alert(`Tipo de inversión: ${opcion.tipo}
        Monto de inversión: $${opcion.montoInversion}
        Duración en meses: ${opcion.duracionMeses} meses
        Tasa de interés: ${tasaInteres}
        Ganancia de interés: $${opcion.gananciaInteres}
        Monto total: $${opcion.montoTotal}`);
    });
}


// Vincular funciones a eventos de clic de los botones en inversiones.html
document.getElementById("elegirTipoBtn").addEventListener("click", elegirTipoInversion);
document.getElementById("listarTodasBtn").addEventListener("click", listarTodasLasInversiones);