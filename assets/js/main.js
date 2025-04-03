        // Função da bilbioteca jquery.maskMoney onde adiciona uma máscara de dinheiro em um elemento do formulário com o ID recipient-price.
        jQuery(function () {

            jQuery("#salarioBruto, #transporte, #alimentacao, #beneficios").maskMoney({
                prefix: '',
                thousands: '.',
                decimal: ','
            })

        });