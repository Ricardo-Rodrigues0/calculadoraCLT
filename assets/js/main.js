// Aplica máscara de dinheiro nos campos específicos
jQuery(function () {
    jQuery("#salarioBruto, #transporte, #alimentacao, #beneficios, #salarioBrutoFerias, #salarioBrutoHoraExtra, #salarioBrutoDecimoTerceiro, #salarioBrutoRescisao").maskMoney({
        prefix: '',
        thousands: '.',
        decimal: ','
    });
});

// Aplica máscara de hora no formato '00:00' nos campos de horas extras
$(document).ready(function () {
    $("#horasExtra50, #horasExtra100").mask('00:00');
});

// Formata o valor monetário removendo milhar e convertendo para float
function formatarValor(valor) {
    valor = valor.replace(/\./g, '');
    valor = valor.replace(',', '.');
    return parseFloat(valor) || 0;
}

// Converte tempo no formato 'HH:MM' para decimal
function converterHoraParaDecimal(horaStr) {
    if (!horaStr.includes(':')) return 0;
    const [horas, minutos] = horaStr.split(':').map(Number);
    if (isNaN(horas) || isNaN(minutos)) return 0;
    return horas + (minutos / 60);
}