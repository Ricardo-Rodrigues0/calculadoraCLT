// Função da bilbioteca jquery.maskMoney onde adiciona uma máscara de dinheiro em um elemento do formulário com o ID recipient-price.
jQuery(function () {

    jQuery("#salarioBruto, #transporte, #alimentacao, #beneficios, #salarioBrutoFerias").maskMoney({
        prefix: '',
        thousands: '.',
        decimal: ','
    })

});

function formatarValor(valor) {
    valor = valor.replace(/\./g, '');
    valor = valor.replace(',', '.');

    return parseFloat(valor) || 0;
};