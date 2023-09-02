
// *************************PRESTAMOS******************************************

// Obtener si el usuario es cliente del banco
const clienteRespuesta = prompt("¿Es usted cliente del banco? (Si/No)");
const esCliente = clienteRespuesta.toLowerCase() === 'si';

// Obtener el monto del préstamo
let montoPrestamo = parseInt(prompt("Ingrese el monto del préstamo:"));

// Verificar si el monto es válido
while (isNaN(montoPrestamo) || montoPrestamo <= 0) {
    montoPrestamo = parseInt(prompt("Monto inválido. Ingrese el monto del préstamo:"));
}

// Obtener la cantidad de cuotas
const cuotasRespuesta = parseInt(prompt("Seleccione la cantidad de cuotas:\n\n1. 12 meses\n2. 24 meses\n3. 36 meses\n4. 48 meses"));

let cuotas;

switch (cuotasRespuesta) {
    case 1:
        cuotas = 12;
        break;
    case 2:
        cuotas = 24;
        break;
    case 3:
        cuotas = 36;
        break;
    case 4:
        cuotas = 48;
        break;
    default:
        cuotas = 0; // Valor inválido
        break;
}

if (cuotas === 0) {
    alert("Cantidad de cuotas inválida.");
} else {
    // Interés según si es cliente o no
    let interes = 0.1; // Tasa de interés No Cliente
    if (esCliente) {
        interes = 0.08; // Tasa de interés para Clientes
    }

    // Calculo para el monto total a pagar
    const tasaMensual = interes / 12;
    const cuotaMensual = (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -cuotas));
    const totalAPagar = cuotaMensual * cuotas;

    // Mostrar el resultado
    alert(`Detalles del préstamo:
    Cliente del banco: ${esCliente ? 'Sí' : 'No'}
    Monto del préstamo: $${montoPrestamo}
    Cuotas: ${cuotas} meses
    Cuota mensual: $${cuotaMensual}
    Total a pagar: $${totalAPagar}`);
}

// ************************INVERSIONES************************************

// Ciclo do while
let intentos = 0;
do {
  const contraseña = prompt("Ingrese la contraseña:");
  if (contraseña === "secreto") {
    alert("Contraseña correcta. Acceso permitido.");
    break;
  } else {
    intentos++;
    alert(`Contraseña incorrecta. Intentos restantes: ${3 - intentos}`);
  }
} while (intentos < 3);

// Ciclo for
for (let i = 0; i < 5; i++) {
  console.log(`Iteración ${i}`);
}
  
  // Ciclo while
let contador = 0;
while (contador < 3) {
  console.log(`Contador: ${contador}`);
  contador++;
}

// Variables usando let
let nombreCliente = prompt("Ingrese su nombre:");
let saldoInicial = parseFloat(prompt("Ingrese su saldo inicial:"));
let cuentaActiva = true;

// Función para mostrar información de la cuenta
function mostrarInformacionCuenta(nombre, saldo, activa) {
    console.log(`Cliente: ${nombre}`);
    console.log(`Saldo: $${saldo}`);
    console.log(`Cuenta activa: ${activa ? 'Sí' : 'No'}`);
}

// Mostrar información de la cuenta
mostrarInformacionCuenta(nombreCliente, saldoInicial, cuentaActiva);

// Función para depositar dinero en una cuenta
function depositar(cuenta, monto) {
  cuenta.saldo += monto;
  return `Se depositaron $${monto} en la cuenta ${cuenta.numero}. Saldo actual: $${cuenta.saldo}`;
}

// Función para retirar dinero de una cuenta
function retirar(cuenta, monto) {
  if (monto <= cuenta.saldo) {
    cuenta.saldo -= monto;
    return `Se retiraron $${monto} de la cuenta ${cuenta.numero}. Saldo actual: $${cuenta.saldo}`;
  } else {
    return `Fondos insuficientes en la cuenta ${cuenta.numero}. Saldo actual: $${cuenta.saldo}`;
  }
}

// Crear una cuenta de ejemplo
const cuentaEjemplo = {
  numero: "123456",
  saldo: saldoInicial,
};

// Uso de prompt para interactuar con el usuario
const operacion = prompt("Ingrese 'deposito' o 'retiro':");

if (operacion === "deposito") {
  const monto = parseFloat(prompt("Ingrese el monto a depositar:"));
  alert(depositar(cuentaEjemplo, monto));
} else if (operacion === "retiro") {
  const monto = parseFloat(prompt("Ingrese el monto a retirar:"));
  alert(retirar(cuentaEjemplo, monto));
} else {
  alert("Operación no válida");
}
