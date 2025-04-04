function calcularFerias() {
    let salarioBrutoFerias = formatarValor(document.getElementById("salarioBrutoFerias").value);
    let mesesTrabalhado = parseInt(document.getElementById("mesesTrabalhado").value);

    let feriasMensal = (salarioBrutoFerias * 1.3333) / 12;
    let ferias = feriasMensal * mesesTrabalhado;

    let inss = 0;

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
    

    let baseIRPF = salarioBrutoFerias - inss;
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

    let feriasLiquida = ferias - inss - irpf;

    document.getElementById("vSalarioBrutoFerias").innerText = `R$ ${salarioBrutoFerias.toFixed(2)}`;

    document.getElementById("dINSSFerias").innerHTML = `-R$ ${inss.toFixed(2)}`;
    document.getElementById("dIRPFFerias").innerHTML = `-R$ ${irpf.toFixed(2)}`;

    document.getElementById("vMesesTrabalhados").innerText = `${mesesTrabalhado} meses`;
    document.getElementById("vStatusFerias").innerText = feriasVencida();

    document.getElementById("tFeriasLiquido").innerHTML = `R$ ${feriasLiquida.toFixed(2)}`;

}