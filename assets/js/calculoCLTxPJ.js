// Exibe o card de comparação CLT x PJ e oculta o menu
function btnCalculadoraCLTxPJ() {
    let cardMenu = document.querySelector(".cardMenu");
    let cardCLTxPJ = document.querySelector(".cardCLTxPJ");

    cardMenu.classList.add('ocultar');
    cardCLTxPJ.classList.remove('ocultar');
}

// Volta para o card de cálculo, ocultando o resultado
function refazerCalculo() {
    let cardResultadoCLT = document.querySelector(".cardResultadoCLT");
    let cardCLTxPJ = document.querySelector(".cardCLTxPJ");

    cardResultadoCLT.classList.add('ocultar');
    cardCLTxPJ.classList.remove('ocultar');
}

// Realiza o cálculo de comparação entre CLT e PJ
function calcularCLTxPJ() {
    let cardResultadoCLT = document.querySelector(".cardResultadoCLT");
    let cardCLTxPJ = document.querySelector(".cardCLTxPJ");

    cardResultadoCLT.classList.remove('ocultar');
    cardCLTxPJ.classList.add('ocultar');

    // Pega os valores inseridos nos inputs e formata
    let salarioBruto = formatarValor(document.getElementById("salarioBruto").value) || 0;
    let valeAlimentacao = formatarValor(document.getElementById("alimentacao").value) || 0;
    let valeTransporte = formatarValor(document.getElementById("transporte").value) || 0;
    let beneficios = formatarValor(document.getElementById("beneficios").value) || 0;

    // Cálculo proporcional de férias e 13º salário
    let feriasMensal = (salarioBruto / 12) * 1.3333;
    let decimoTerceiroMensal = salarioBruto / 12;

    // Cálculo do salário final (com benefícios e adicionais)
    let salarioFinal = (salarioBruto + valeAlimentacao + valeTransporte + beneficios + feriasMensal + decimoTerceiroMensal) - calcularINSS() - calcularIRPF();

    // Cálculo do salário líquido (sem férias/13º)
    let salarioLiquido = (salarioBruto + valeAlimentacao + valeTransporte + beneficios) - calcularINSS() - calcularIRPF();

    // Simula salário PJ com base em uma alíquota de 15%
    aliquotaPJ = 0.15;
    let salarioPJ = aliquotaPJ > 0 ? (salarioFinal / (1 - aliquotaPJ)) : salarioFinal;

    // Cálculo do INSS baseado na faixa salarial
    function calcularINSS() {
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

        return inss;
    }

    // Cálculo do IRPF com base na base de cálculo após desconto do INSS
    function calcularIRPF() {
        let inss = calcularINSS();
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

        return irpf;
    }

    // Atualiza os elementos da interface com os valores calculados
    document.getElementById("vSalarioBruto").innerText = `R$ ${salarioBruto.toFixed(2)}`;
    document.getElementById("vValeAlimentacao").innerText = `R$ ${valeAlimentacao.toFixed(2)}`;
    document.getElementById("vValeTransporte").innerText = `R$ ${valeTransporte.toFixed(2)}`;
    document.getElementById("vBeneficios").innerText = `R$ ${beneficios.toFixed(2)}`;
    document.getElementById("vFeriasMensal").innerHTML = `R$ ${feriasMensal.toFixed(2)}`;
    document.getElementById("vDecimoTerceiroMensal").innerHTML = `R$ ${decimoTerceiroMensal.toFixed(2)}`;

    document.getElementById("dINSS").innerHTML = `-R$ ${calcularINSS().toFixed(2)}`;
    document.getElementById("dIRPF").innerHTML = `-R$ ${calcularIRPF().toFixed(2)}`;
    document.getElementById("dValeTransporte").innerHTML = `-R$ ${valeTransporte.toFixed(2)}`;

    document.getElementById("tSalarioFinal").innerHTML = `R$ ${salarioFinal.toFixed(2)}`;
    document.getElementById("tSalarioLiquido").innerHTML = `R$ ${salarioLiquido.toFixed(2)}`;

    document.getElementById("tSalarioPJ").innerHTML = `R$ ${salarioPJ.toFixed(2)}`;
}

/*
------------------------------------------------------
| Comentário sobre o cálculo                        |
------------------------------------------------------
O cálculo compara os ganhos de um trabalhador CLT e um PJ.

Passos:
- O valor do salário bruto é somado com os benefícios (vale alimentação, vale transporte e outros).
- São calculados os adicionais de férias proporcionais e 13º salário mensal.
- O total de ganhos é ajustado com a subtração dos descontos de INSS e IRPF.
- Para o PJ, um salário bruto equivalente é calculado, considerando uma alíquota de 15% sobre o total de ganhos CLT.
- O cálculo do INSS e IRPF leva em conta as faixas salariais e descontos correspondentes.

O resultado final exibe:
- Salário bruto
- Benefícios
- Férias e 13º proporcionais
- Descontos de INSS e IRPF
- Salário líquido (CLT)
- Salário PJ ajustado (com base na alíquota de 15%)
*/

