function criarDataLocal(dateStr) {
    let [ano, mes, dia] = dateStr.split("-").map(Number);
    return new Date(ano, mes - 1, dia);
}

function calcularRescisao() {
    let salarioBrutoRescisao = formatarValor(document.getElementById("salarioBrutoRescisao").value) || 0;

    let avisoSelect = document.getElementById("avisoPrevio");
    let avisoTexto = avisoSelect.options[avisoSelect.selectedIndex].text;
    let motivoSelect = document.getElementById("motivoSaida");
    let motivoTexto = motivoSelect.options[motivoSelect.selectedIndex].text;

    let dataContratacaoStr = document.getElementById("dataContratacao").value || '2025-01-01';
    let dataContratacao = criarDataLocal(dataContratacaoStr);
    let dataDemissaoStr = document.getElementById("dataDemissao").value || '2025-01-31';
    let dataDemissao = criarDataLocal(dataDemissaoStr);

    let diferencaMs = dataDemissao - dataContratacao;
    let diasTrabalhado = Math.floor(diferencaMs / (1000 * 60 * 60 * 24)) + 1;
    let anosTrabalhado = dataDemissao.getFullYear() - dataContratacao.getFullYear();
    let meses = dataDemissao.getMonth() - dataContratacao.getMonth();
    let mesesTrabalhado = (anosTrabalhado * 12) + meses;


    if (dataDemissao.getDate() < dataContratacao.getDate()) {
        mesesTrabalhado -= 1;
    }

    let feriasVencidas = Math.floor(mesesTrabalhado / 12);
    let resultadoFerias = "NÃO";

    if (feriasVencidas > 0) {
        resultadoFerias = `${feriasVencidas} Férias`;
    }

    let direitoSeguro = false;
    let parcelasSeguro = 0;

    if (mesesTrabalhado >= 24) {
        direitoSeguro = true;
        parcelasSeguro = 5;
    } else if (mesesTrabalhado >= 12) {
        direitoSeguro = true;
        parcelasSeguro = 4;
    }


    let resultadoSeguro = "NÃO";
    if (direitoSeguro) {
        resultadoSeguro = `${parcelasSeguro} parcelas de R$ 1.512,00`;
    }


    document.getElementById("vPeriodoTrabalhado").innerText = `${diasTrabalhado} dias, ${mesesTrabalhado} meses, ${anosTrabalhado} anos`;
    document.getElementById("vFeriasVencida").innerText = resultadoFerias;
    document.getElementById("vAvisoPrevio").innerText = avisoTexto;
    document.getElementById("vMotivoSaida").innerText = motivoTexto;
    document.getElementById("vSeguroDesemprego").innerText = resultadoSeguro;
}
