function formatarValor(valor) {
    valor = valor.replace(/\./g, '');
    valor = valor.replace(',', '.');

    return parseFloat(valor) || 0;
};

function calcularCLTxPJ() {
    let salarioBruto = formatarValor(document.getElementById("salarioBruto").value);
    let valeAlimentacao = formatarValor(document.getElementById("alimentacao").value);
    let valeTransporte = formatarValor(document.getElementById("transporte").value);
    let beneficios = formatarValor(document.getElementById("beneficios").value);
    let dependentes = formatarValor(document.getElementById("dependentes").value);

    salarioCLT = salarioBruto + valeAlimentacao + valeTransporte + beneficios;
    feriasMensal = (salarioBruto / 12) * 1.3333;
    decimoTerceiroMensal = salarioBruto / 12;

    document.getElementById("vSalarioBruto").innerText = `Salário Bruto: ${salarioBruto}`;
    document.getElementById("vValeAlimentacao").innerText = `Vale Alimentação: ${valeAlimentacao}`;
    document.getElementById("vValeTransporte").innerText = `Vale Transporte: ${valeTransporte}`;
    document.getElementById("vBeneficios").innerText = `Outros Benefícios: ${beneficios}`;
    document.getElementById("vFeriasMensal").innerHTML = `Valor Ferias Mensal: ${feriasMensal}`;
    document.getElementById("vDecimoTerceiroMensal").innerHTML = `Valor 13° Mensal: ${decimoTerceiroMensal}`;
};