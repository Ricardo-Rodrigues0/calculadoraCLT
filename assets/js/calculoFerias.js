// Função para exibir a tela do cálculo de férias e ocultar o menu
function btnCalculadoraFerias() {
    let cardMenu = document.querySelector(".cardMenu");
    let cardFerias = document.querySelector(".cardFerias");

    cardMenu.classList.add('ocultar');
    cardFerias.classList.remove('ocultar');
}

// Função para refazer o cálculo e voltar à tela inicial
function refazerCalculoFerias() {
    let cardResultadoFerias = document.querySelector(".cardResultadoFerias");
    let cardFerias = document.querySelector(".cardFerias");

    cardResultadoFerias.classList.add('ocultar');
    cardFerias.classList.remove('ocultar');
}

// Função principal para calcular o valor das férias
function calcularFerias() {
    let cardResultadoFerias = document.querySelector(".cardResultadoFerias");
    let cardFerias = document.querySelector(".cardFerias");

    cardResultadoFerias.classList.remove('ocultar');
    cardFerias.classList.add('ocultar');

    // Coleta os valores do salário bruto e meses trabalhados
    let salarioBrutoFerias = formatarValor(document.getElementById("salarioBrutoFerias").value) || 0;
    let mesesTrabalhado = parseInt(document.getElementById("mesesTrabalhado").value) || 0;

    // Calcula o valor das férias com base no salário bruto e no acréscimo de 1/3
    let feriasMensal = (salarioBrutoFerias * 1.3333) / 12;
    let ferias = feriasMensal * mesesTrabalhado;

    // Calcula o valor líquido das férias subtraindo INSS e IRPF
    let feriasLiquida = ferias - calcularINSS() - calcularIRPF();

    // Função para calcular o INSS com base no salário bruto
    function calcularINSS() {
        let inss = 0;

        // Aplica a tabela de alíquotas do INSS
        if (salarioBrutoFerias <= 1412.00) {
            inss = salarioBrutoFerias * 0.075;
        } else if (salarioBrutoFerias <= 2666.68) {
            inss = (1412 * 0.075) + ((salarioBrutoFerias - 1412) * 0.09);
        } else if (salarioBrutoFerias <= 4000.03) {
            inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((salarioBrutoFerias - 2666.68) * 0.12);
        } else if (salarioBrutoFerias <= 7786.02) {
            inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((salarioBrutoFerias - 4000.03) * 0.14);
        } else {
            inss = 908.86;
        }

        return inss;
    }

    // Função para calcular o IRPF com base no salário após INSS
    function calcularIRPF() {
        let inss = calcularINSS();
        let baseIRPF = salarioBrutoFerias - inss;
        let irpf = 0;

        // Aplica a tabela de faixas do IRPF
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

    // Função para determinar o status das férias (vencidas ou não)
    function feriasVencida() {
        if (mesesTrabalhado < 12) {
            return "Você não tem férias vencida";
        } if (mesesTrabalhado >= 12) {
            return "Você tem 1 férias vencida";
        } if (mesesTrabalhado >= 24) {
            return "Você tem 2 férias vencidas";
        } else {
            return "Você tem mais de 2 férias vencidas";
        };
    }

    // Atualiza os valores na interface com o resultado dos cálculos
    document.getElementById("vSalarioBrutoFerias").innerText = `R$ ${salarioBrutoFerias.toFixed(2)}`;
    document.getElementById("vFerias").innerText = `R$ ${ferias.toFixed(2)}`;

    document.getElementById("dINSSFerias").innerHTML = `-R$ ${calcularINSS().toFixed(2)}`;
    document.getElementById("dIRPFFerias").innerHTML = `-R$ ${calcularIRPF().toFixed(2)}`;

    document.getElementById("vMesesTrabalhados").innerText = `${mesesTrabalhado} meses`;
    document.getElementById("vStatusFerias").innerText = feriasVencida();

    document.getElementById("tFeriasLiquido").innerHTML = `R$ ${feriasLiquida.toFixed(2)}`;
}

/*
------------------------------------------------------
| Comentário sobre o cálculo                        |
------------------------------------------------------
O cálculo de férias é realizado com base no salário bruto do trabalhador e nos meses trabalhados.

Passos:
- O valor das férias foi calculado aplicando o adicional de 1/3 ao salário bruto mensal.
- O valor mensal das férias foi multiplicado pelos meses trabalhados para obter o total das férias.
- O valor do INSS foi calculado com base na tabela progressiva de alíquotas.
- O valor do IRPF foi calculado considerando a base de cálculo após o desconto do INSS, de acordo com as faixas de alíquotas do imposto de renda.

O status das férias vencidas é determinado pela quantidade de meses trabalhados:
- Menos de 12 meses: sem férias vencidas.
- A partir de 12 meses: 1 férias vencida.
- A partir de 24 meses: 2 férias vencidas.
- Mais de 24 meses: mais de 2 férias vencidas.

O resultado final exibe o salário bruto, o valor total das férias, os descontos de INSS e IRPF, o número de meses trabalhados e o status das férias vencidas, além do valor líquido das férias.
*/