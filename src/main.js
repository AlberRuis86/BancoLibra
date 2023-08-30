// Ejemplo de ciclo for
for (let i = 0; i < 5; i++) {
    console.log(`Iteración ${i}`);
  }
  
  // Ejemplo de ciclo while
  let contador = 0;
  while (contador < 3) {
    console.log(`Contador: ${contador}`);
    contador++;
  }
  
  // Ejemplo de ciclo do while
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