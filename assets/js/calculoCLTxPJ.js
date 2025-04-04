function btnCalculadoraCLTxPJ() {
    let cardMenu = document.querySelector(".cardMenu");
    let cardCLTxPJ = document.querySelector(".cardCLTxPJ");

    cardMenu.classList.add('ocultar');
    cardCLTxPJ.classList.remove('ocultar');
}

function refazerCalculo() {
    let cardResultadoCLT = document.querySelector(".cardResultadoCLT");
    let cardCLTxPJ = document.querySelector(".cardCLTxPJ");

    cardResultadoCLT.classList.add('ocultar');
    cardCLTxPJ.classList.remove('ocultar');
}

function formatarValor(valor) {
    valor = valor.replace(/\./g, '');
    valor = valor.replace(',', '.');

    return parseFloat(valor) || 0;
};

function calcularCLTxPJ() {
    let cardResultadoCLT = document.querySelector(".cardResultadoCLT");
    let cardCLTxPJ = document.querySelector(".cardCLTxPJ");

    cardResultadoCLT.classList.remove('ocultar');
    cardCLTxPJ.classList.add('ocultar');

    let salarioBruto = formatarValor(document.getElementById("salarioBruto").value);
    let valeAlimentacao = formatarValor(document.getElementById("alimentacao").value);
    let valeTransporte = formatarValor(document.getElementById("transporte").value);
    let beneficios = formatarValor(document.getElementById("beneficios").value);
    let dependentes = formatarValor(document.getElementById("dependentes").value);

    let feriasMensal = (salarioBruto / 12) * 1.3333;
    let decimoTerceiroMensal = salarioBruto / 12;

    let inss = 0;

    if (salarioBruto <= 1412.00) {
        inss = salarioBruto * 0.075;
    } else if (salarioBruto <= 2666.68) {
        inss = (1412 * 0.075) + ((salarioBruto - 1412) * 0.09);
    } else if (salarioBruto <= 4000.03) {
        inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((salarioBruto - 2666.68) * 0.12);
    } else if (salarioBruto <= 7786.02) {
        inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((salarioBruto - 4000.03) * 0.14);
    } else {
        inss = 908.86;
    }

    let baseIRPF = salarioBruto - inss;
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

    let salarioFinal = (salarioBruto + valeAlimentacao + valeTransporte + beneficios + feriasMensal + decimoTerceiroMensal) - inss - irpf;
    let salarioLiquido = (salarioBruto + valeAlimentacao + valeTransporte + beneficios) - inss - irpf;

    aliquotaPJ = 0.15;
    let salarioPJ = aliquotaPJ > 0 ? (salarioFinal / (1 - aliquotaPJ)) : salarioFinal;

    document.getElementById("vSalarioBruto").innerText = `R$ ${salarioBruto.toFixed(2)}`;
    document.getElementById("vValeAlimentacao").innerText = `R$ ${valeAlimentacao.toFixed(2)}`;
    document.getElementById("vValeTransporte").innerText = `R$ ${valeTransporte.toFixed(2)}`;
    document.getElementById("vBeneficios").innerText = `R$ ${beneficios.toFixed(2)}`;
    document.getElementById("vFeriasMensal").innerHTML = `R$ ${feriasMensal.toFixed(2)}`;
    document.getElementById("vDecimoTerceiroMensal").innerHTML = `R$ ${decimoTerceiroMensal.toFixed(2)}`;

    document.getElementById("dINSS").innerHTML = `-R$ ${inss.toFixed(2)}`;
    document.getElementById("dIRPF").innerHTML = `-R$ ${irpf.toFixed(2)}`;
    document.getElementById("dValeTransporte").innerHTML = `-R$ ${valeTransporte.toFixed(2)}`;

    document.getElementById("tSalarioFinal").innerHTML = `R$ ${salarioFinal.toFixed(2)}`;
    document.getElementById("tSalarioLiquido").innerHTML = `R$ ${salarioLiquido.toFixed(2)}`;

    document.getElementById("tSalarioPJ").innerHTML = `R$ ${salarioPJ.toFixed(2)}`;
};
