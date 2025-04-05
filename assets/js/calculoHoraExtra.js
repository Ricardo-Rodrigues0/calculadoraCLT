function btnCalculadoraHoraExtra() {
    let cardMenu = document.querySelector(".cardMenu");
    let cardHoraExtra = document.querySelector(".cardHoraExtra");

    cardMenu.classList.add('ocultar');
    cardHoraExtra.classList.remove('ocultar');
}

function refazerCalculoHoraExtra() {
    let cardResultadoHoraExtra = document.querySelector(".cardResultadoHoraExtra");
    let cardHoraExtra = document.querySelector(".cardHoraExtra");

    cardResultadoHoraExtra.classList.add('ocultar');
    cardHoraExtra.classList.remove('ocultar');
}

function calcularHoraExtra() {
    let cardResultadoHoraExtra = document.querySelector(".cardResultadoHoraExtra");
    let cardHoraExtra = document.querySelector(".cardHoraExtra");

    cardResultadoHoraExtra.classList.remove('ocultar');
    cardHoraExtra.classList.add('ocultar');

    let salarioBrutoHoraExtra = formatarValor(document.getElementById("salarioBrutoHoraExtra").value) || 0;
    let horaExtra50 = converterHoraParaDecimal(document.getElementById("horasExtra50").value) || 0;
    let horaExtra100 = converterHoraParaDecimal(document.getElementById("horasExtra100").value) || 0;

    let valorDia = Math.floor((salarioBrutoHoraExtra / 30) * 100) / 100;
    let valorHora = Math.floor ((valorDia / 8) * 100) / 100;
    let valorHoraExtra50 = Math.floor((valorHora * horaExtra50 * 1.5) * 100) / 100;
    let valorHoraExtra100 = Math.floor((valorHora * horaExtra100 * 2) * 100) / 100;
    let totalHoraExtra = valorHoraExtra50 + valorHoraExtra100;
    let salarioBrutoHoraExtraTotal = salarioBrutoHoraExtra + totalHoraExtra;
    let salarioLiquido = salarioBrutoHoraExtraTotal - calcularINSS() - calcularIRPF();


    function calcularINSS() {

        let inss = 0;

        if (salarioBrutoHoraExtraTotal <= 1412.00) {
            inss = salarioBrutoHoraExtraTotal * 0.075;
        } else if (salarioBrutoHoraExtraTotal <= 2666.68) {
            inss = (1412 * 0.075) + ((salarioBrutoHoraExtraTotal - 1412) * 0.09);
        } else if (salarioBrutoHoraExtraTotal <= 4000.03) {
            inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((salarioBrutoHoraExtraTotal - 2666.68) * 0.12);
        } else if (salarioBrutoHoraExtraTotal <= 7786.02) {
            inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((salarioBrutoHoraExtraTotal - 4000.03) * 0.14);
        } else {
            inss = 908.86;
        }

        return inss;
    }

    function calcularIRPF() {

        let inss = calcularINSS();    
        let baseIRPF = salarioBrutoHoraExtraTotal - inss;
        let irpf = 0;

        if (baseIRPF <= 2259.20) {
            irpf = 0;
        } else if (baseIRPF <= 2826.65) {
            irpf = (baseIRPF * 0.075) - 169.44;
        } else if (baseIRPF <= 3751.05) {
            irpf = (baseIRPF * 0.15) - 381.44;
        } else if (baseIRPF <= 4664.68) {
            irpf = (baseIRPF * 0.225) - 662.77;
        } else {
            irpf = (baseIRPF * 0.275) - 896.00;
        }

        return irpf;
    }

    document.getElementById("vSalarioBrutoHoraExtra").innerText = `R$ ${salarioBrutoHoraExtra.toFixed(2)}`;
    document.getElementById("vHoraExtra").innerText = `R$ ${totalHoraExtra.toFixed(2)}`;

    document.getElementById("vValorDia").innerText = `R$ ${valorDia.toFixed(2)}`;
    document.getElementById("vValorHora").innerText = `R$ ${valorHora.toFixed(2)}`;
    document.getElementById("vHorasTrabalhada50").innerText = document.getElementById("horasExtra50").value || '00:00';
    document.getElementById("vHorasTrabalhada100").innerText = document.getElementById("horasExtra100").value || '00:00';

    document.getElementById("dINSSHoraExtra").innerHTML = `-R$ ${calcularINSS().toFixed(2)}`;
    document.getElementById("dIRPFHoraExtra").innerHTML = `-R$ ${calcularIRPF().toFixed(2)}`;

    document.getElementById("tHoraExtra").innerHTML = `R$ ${salarioLiquido.toFixed(2)}`;
}