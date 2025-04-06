function btnCalculadoraDecimoTerceiro() {
    let cardMenu = document.querySelector(".cardMenu");
    let cardDecimoTerceiro = document.querySelector(".cardDecimoTerceiro");

    cardMenu.classList.add('ocultar');
    cardDecimoTerceiro.classList.remove('ocultar');
}

function refazerCalculoDecimoTerceiro() {
    let cardResultadoDecimoTerceiro = document.querySelector(".cardResultadoDecimoTerceiro");
    let cardDecimoTerceiro = document.querySelector(".cardDecimoTerceiro");

    cardResultadoDecimoTerceiro.classList.add('ocultar');
    cardDecimoTerceiro.classList.remove('ocultar');
}

function calcularDecimoTerceiro() {
    let cardResultadoDecimoTerceiro = document.querySelector(".cardResultadoDecimoTerceiro");
    let cardDecimoTerceiro = document.querySelector(".cardDecimoTerceiro");

    cardResultadoDecimoTerceiro.classList.remove('ocultar');
    cardDecimoTerceiro.classList.add('ocultar');


    let salarioBrutoDecimoTerceiro = formatarValor(document.getElementById("salarioBrutoDecimoTerceiro").value) || 0;
    let mesesTrabalhado = parseInt(document.getElementById("mesesTrabalhadoDecimoTerceiro").value) || 0;

    let decimoTerceiroMensal = salarioBrutoDecimoTerceiro / 12;
    let decimoTerceiro = decimoTerceiroMensal * mesesTrabalhado;
    let decimoTerceiroPrimeiraParcela = decimoTerceiro / 2;
    let decimoTerceiroSegundaParcela = decimoTerceiroPrimeiraParcela - calcularINSS() - calcularIRPF();

    let decimoTerceiroLiquido = decimoTerceiro - calcularINSS() - calcularIRPF();

    function calcularINSS() {

        let inss = 0;

        if (salarioBrutoDecimoTerceiro <= 1412.00) {
            inss = salarioBrutoDecimoTerceiro * 0.075;
        } else if (salarioBrutoDecimoTerceiro <= 2666.68) {
            inss = (1412 * 0.075) + ((salarioBrutoDecimoTerceiro - 1412) * 0.09);
        } else if (salarioBrutoDecimoTerceiro <= 4000.03) {
            inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((salarioBrutoDecimoTerceiro - 2666.68) * 0.12);
        } else if (salarioBrutoDecimoTerceiro <= 7786.02) {
            inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((salarioBrutoDecimoTerceiro - 4000.03) * 0.14);
        } else {
            inss = 908.86;
        }

        return inss;
    }

    function calcularIRPF() {

        let inss = calcularINSS();
        let baseIRPF = salarioBrutoDecimoTerceiro - inss;
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

    document.getElementById("vSalarioBrutoDecimoTerceiro").innerText = `R$ ${salarioBrutoDecimoTerceiro.toFixed(2)}`;
    document.getElementById("vDecimoTerceiro").innerText = `R$ ${decimoTerceiro.toFixed(2)}`;

    document.getElementById("dINSSDecimoTerceiro").innerHTML = `-R$ ${calcularINSS().toFixed(2)}`;
    document.getElementById("dIRPFDecimoTerceiro").innerHTML = `-R$ ${calcularIRPF().toFixed(2)}`;

    document.getElementById("vmesesTrabalhadoDecimoTerceiro").innerText = `${mesesTrabalhado} meses`;
    document.getElementById("vPrimeiraParcela").innerText = `R$ ${decimoTerceiroPrimeiraParcela.toFixed(2)}`;
    document.getElementById("vSegundaParcela").innerText = `R$ ${decimoTerceiroSegundaParcela.toFixed(2)}`;

    document.getElementById("tDecimoTerceiroLiquido").innerHTML = `R$ ${decimoTerceiroLiquido.toFixed(2)}`;
} 