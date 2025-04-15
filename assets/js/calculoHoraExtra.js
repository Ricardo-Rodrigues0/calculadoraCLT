// Função para exibir a tela de hora extra e ocultar o menu
function btnCalculadoraHoraExtra() {
    let cardMenu = document.querySelector(".cardMenu");
    let cardHoraExtra = document.querySelector(".cardHoraExtra");

    cardMenu.classList.add('ocultar');
    cardHoraExtra.classList.remove('ocultar');
}

// Função para refazer o cálculo e voltar à tela inicial
function refazerCalculoHoraExtra() {
    let cardResultadoHoraExtra = document.querySelector(".cardResultadoHoraExtra");
    let cardHoraExtra = document.querySelector(".cardHoraExtra");

    cardResultadoHoraExtra.classList.add('ocultar');
    cardHoraExtra.classList.remove('ocultar');
}

// Função principal para calcular o valor das horas extras
function calcularHoraExtra() {
    let cardResultadoHoraExtra = document.querySelector(".cardResultadoHoraExtra");
    let cardHoraExtra = document.querySelector(".cardHoraExtra");

    cardResultadoHoraExtra.classList.remove('ocultar');
    cardHoraExtra.classList.add('ocultar');

    // Coleta os valores de entrada
    let salarioBrutoHoraExtra = formatarValor(document.getElementById("salarioBrutoHoraExtra").value) || 0;
    let horaExtra50 = converterHoraParaDecimal(document.getElementById("horasExtra50").value) || 0;
    let horaExtra100 = converterHoraParaDecimal(document.getElementById("horasExtra100").value) || 0;

    // Calcula o valor do salário diário e o valor por hora
    let valorDia = (salarioBrutoHoraExtra / 30);
    let valorHora = (valorDia / 8);

    // Calcula o valor das horas extras de 50% e 100%
    let valorHoraExtra50 = (valorHora * horaExtra50 * 1.5);
    let valorHoraExtra100 = (valorHora * horaExtra100 * 2);

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
        // Calcula o total de horas extras
    
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

    // Calcula o total de horas extras
    let totalHoraExtra = parseFloat(valorHoraExtra50) + parseFloat(valorHoraExtra100);

    // Calcula o salário total com as horas extras e o valor líquido após descontos
    let salarioBrutoHoraExtraTotal = salarioBrutoHoraExtra + totalHoraExtra;
    let salarioLiquido = salarioBrutoHoraExtraTotal - calcularINSS() - calcularIRPF();

    // Atualiza os valores na interface com o resultado dos cálculos
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

/*
------------------------------------------------------
| Comentário sobre o cálculo                        |
------------------------------------------------------
O cálculo das horas extras é realizado com base no salário bruto mensal e nas horas extras de 50% e 100%.

Passos:
- O valor do salário diário e por hora é calculado a partir do salário bruto.
- As horas extras de 50% e 100% são multiplicadas pelo valor por hora e ajustadas conforme a taxa de adicional.
- O total de horas extras é somado ao salário bruto para calcular o salário total com as horas extras.
- Os descontos de INSS e IRPF são aplicados para calcular o salário líquido final.

O resultado final exibe:
- Salário bruto
- Total de horas extras
- Valor do salário diário e por hora
- Total de horas extras de 50% e 100%
- Descontos de INSS e IRPF
- Salário líquido após os descontos
*/
