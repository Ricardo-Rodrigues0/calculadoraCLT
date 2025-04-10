// Função da bilbioteca jquery.maskMoney onde adiciona uma máscara de dinheiro em um elemento do formulário com o ID recipient-price.
jQuery(function () {

    jQuery("#salarioBruto, #transporte, #alimentacao, #beneficios, #salarioBrutoFerias, #salarioBrutoHoraExtra, #salarioBrutoDecimoTerceiro, #salarioBrutoRescisao").maskMoney({
        prefix: '',
        thousands: '.',
        decimal: ','
    })

});


$(document).ready(function () {
    $("#horasExtra50, #horasExtra100").mask('00:00');
});

function formatarValor(valor) {
    valor = valor.replace(/\./g, '');
    valor = valor.replace(',', '.');

    return parseFloat(valor) || 0;
};

function converterHoraParaDecimal(horaStr) {
    if (!horaStr.includes(':')) return 0;

    const [horas, minutos] = horaStr.split(':').map(Number);
    if (isNaN(horas) || isNaN(minutos)) return 0;

    return horas + (minutos / 60);
}
