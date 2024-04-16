document.addEventListener('DOMContentLoaded', () => {

    function calculaAreaRetangulo(comprimento, largura) {
        if(comprimento > largura)
            return comprimento * largura;
        else
            return 'O comprimento tem que ser maior do que a largura!'
    }
    
    console.log(calculaAreaRetangulo(2, 10));

});