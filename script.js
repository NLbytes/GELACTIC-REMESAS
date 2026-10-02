let numeroOperacion = 1;
function calcularRemesa() {
    const emisor = document.getElementById("emisor").value.trim();
    const beneficiario = document.getElementById("beneficiario").value.trim();
    const monto = Number(document.getElementById("monto").value);
    const moneda = document.getElementById("moneda").value;
    const mensaje = document.getElementById("mensaje");
    const resultado = document.getElementById("resultado");
    if (emisor === "" || beneficiario === "") {
        mensaje.textContent = "Debe ingresar los datos del emisor y beneficiario.";
        mensaje.style.color = "#8a3038";
        resultado.classList.add("oculto");
        return;
    }
    if (monto <= 0 || isNaN(monto)) {
        mensaje.textContent = "El monto debe ser mayor que cero.";
        mensaje.style.color = "#8a3038";
        resultado.classList.add("oculto");
        return;
    }
    let tipoCambio;
    let montoConvertido;
    let nombreMoneda;
    switch (moneda) {

        case "USD":
            tipoCambio = 950;
            montoConvertido = monto / tipoCambio;
            nombreMoneda = "USD";
            break;

        case "VES":
            tipoCambio = 0.026;
            montoConvertido = monto * tipoCambio;
            nombreMoneda = "VES";
            break;

        case "EUR":
            tipoCambio = 1100;
            montoConvertido = monto / tipoCambio;
            nombreMoneda = "EUR";
            break;

        default:
            mensaje.textContent = "Moneda no válida.";
            mensaje.style.color = "#8a3038";
            return;
    }
    const comision = monto * 0.001;
    const montoTotal = monto + comision;
    const operacion = "GAL-" + String(numeroOperacion).padStart(4, "0");
    numeroOperacion++;
    document.getElementById("resultadoEmisor").textContent = emisor;
    document.getElementById("resultadoBeneficiario").textContent = beneficiario;
    document.getElementById("resultadoMonto").textContent = monto.toLocaleString("es-CL");
    document.getElementById("resultadoCambio").textContent =
        tipoCambio + " CLP por unidad";
    document.getElementById("resultadoConvertido").textContent =
        montoConvertido.toFixed(2) + " " + nombreMoneda;
    document.getElementById("resultadoComision").textContent =
        comision.toLocaleString("es-CL");
    document.getElementById("resultadoTotal").textContent =
        montoTotal.toLocaleString("es-CL");
    document.getElementById("resultadoOperacion").textContent = operacion;
    const estado = document.getElementById("estado");
    estado.textContent = "Estado: PENDIENTE";
    estado.className = "estado pendiente";
    window.operacionActual = {
        numero: operacion,
        emisor: emisor,
        beneficiario: beneficiario,
        monto: monto,
        convertido: montoConvertido.toFixed(2) + " " + nombreMoneda,
        comision: comision,
        total: montoTotal,
        estado: "Pendiente"
    };
    mensaje.textContent = "Solicitud calculada correctamente.";
    mensaje.style.color = "#286b4b";
    resultado.classList.remove("oculto");
    document.getElementById("comprobante").classList.add("oculto");
}
function cambiarEstado(nuevoEstado) {
    if (!window.operacionActual) {
        alert("Primero debe calcular una solicitud.");
        return;
    }
    const estado = document.getElementById("estado");
    window.operacionActual.estado = nuevoEstado;
    if (nuevoEstado === "Aprobada") {
        estado.textContent = "Estado: APROBADA";
        estado.className = "estado aprobada";
    } else {
        estado.textContent = "Estado: RECHAZADA";
        estado.className = "estado rechazada";
    }
    document.getElementById("comprobanteEstado").textContent = nuevoEstado;
    alert("La solicitud ha sido " + nuevoEstado.toLowerCase() + ".");
}
function mostrarComprobante() {
    if (!window.operacionActual) {
        alert("Primero debe calcular una solicitud.");
        return;
    }
    const datos = window.operacionActual;
    document.getElementById("comprobanteOperacion").textContent = datos.numero;
    document.getElementById("comprobanteEmisor").textContent = datos.emisor;
    document.getElementById("comprobanteBeneficiario").textContent = datos.beneficiario;
    document.getElementById("comprobanteMonto").textContent =
        datos.monto.toLocaleString("es-CL");
    document.getElementById("comprobanteConvertido").textContent =
        datos.convertido;
    document.getElementById("comprobanteComision").textContent =
        datos.comision.toLocaleString("es-CL");
    document.getElementById("comprobanteTotal").textContent =
        datos.total.toLocaleString("es-CL");
    document.getElementById("comprobanteEstado").textContent =
        datos.estado;
    const fecha = new Date();
    document.getElementById("fecha").textContent =
        "Fecha y hora: " + fecha.toLocaleString("es-CL");
    document.getElementById("comprobante").classList.remove("oculto");
}