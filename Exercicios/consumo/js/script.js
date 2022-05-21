
const logado = window.sessionStorage.getItem('logado');
const ok = JSON.parse(logado);

if ( ok == true ){

    // Recuperando dados do armazenamento local
    const dados = localStorage.getItem('consumo');
    lista = JSON.parse(dados); 

    const formulario = document.querySelector('form');
    const tab = document.querySelector('.tabela');

    preencheListaHtml(lista);

    function preencheListaHtml(lista){

        let item;

        for(let i = 0; i < lista.length; i++){
            
            item = lista[i];
            
            adicionaNovasTags(item); 

        }

    }

    formulario.addEventListener('submit', function(evento){

        evento.preventDefault();

        // capturar os elementos com as informções digitadas pelo usuário
        let produto = formulario.querySelector('#inputproduto');
        let quantidade = formulario.querySelector('#inputquantidade');
        let valor = formulario.querySelector('#inputvalor');

        // validar informações
        let ok = validaInformacoes(produto, quantidade, valor);
        
        if ( ok ){
            
            adicionaNovoElemento(produto, quantidade, valor);
            
        }

    });
    // **********
    // Função para validar as informações digitadas pelo usuário
    // **********
    function validaInformacoes(produto, quantidade, valor){

        // validar campo a campo
        if ( produto.value == ''){
            alert('Produto não informado!');
            return false;
        }
        if (quantidade.value == ''){
            alert('Quantidade consumida não informada!');
            return false;
        }
        if ( valor.value == ''){
            alert('Valor do produto não foi informado!');
            return false;
        }

        return true;   

    }
    // **********
    // Adicionar as informações digitadas pelo usuário na lista
    // **********
    function adicionaNovoElemento(produto, quantidade, valor){
        
        let item = {
            id: lista.length + 1,
            prod:produto.value,
            quant:quantidade.value,
            val:valor.value
        };

        lista.push(item);

        // adiciona no DOM    
        adicionaNovasTags(item); 
        
        totaliza();

        // Converte em formato JSON    
        const dadosJSON = JSON.stringify(lista);

        // Armazena os Dados usando API LOCAL STORAGE
        localStorage.setItem('consumo', dadosJSON);

    }
    // **********
    // Adiciona as Tags a serem criadas com as informações digitadas pelo usuário
    // **********
    function adicionaNovasTags(item){

        /*let td1 = document.createElement('td');
        td1.innerHTML = item.quant;*/
        let td1 = criaTagTd(item.quant);
        let td2 = criaTagTd(item.prod);
        let td3 = criaTagTd(item.valor);

        let btn1 = criaTabBotao();

        let td4 = criaTagTd('');
        td4.append(btn1);

        let tr = document.createElement('tr');
        tr.id = 'tr'+lista.length;

        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);

        tab.append(tr);
    }
    // **********
    // Cria as Tags as com as informações digitadas pelo usuário
    // **********
    function criaTagTd(texto){

        let td = document.createElement('td');
        if (!texto == ''){
            td.innerHTML = texto;
        }

        return td;
    }
    // **********
    // Cria a Tag botão
    // **********
    function criaTabBotao(){

        let btn1 = document.createElement('button');
        btn1.innerHTML = ' X ';
        btn1.id = lista.length;
        
        btn1.addEventListener('click', function(b){

            let botao = b.target;

            let id = botao.id;
        
            // excluir o elemento da lista        
            for(let i = 0; i < lista.length; i++ ){
                
                if (id == lista[i].id ){
                    lista.splice(i,1);
                }

            }
            console.log(lista);

            let tr_a_ser_removido = document.querySelector('#tr'+id);
            console.log(tr_a_ser_removido);

            // excluir o elemento da tela
            tab.removeChild(tr_a_ser_removido);

        });

        return btn1;
    }
    // **********
    // Totalizando a conta
    // **********
    function totaliza(){

        let total = 0;
        let val_convertido = 0;
        let texto_convertido;

        for(let i=0; i < lista.length; i++){

            texto_convertido = lista[i].val.replace(',', '.');
            
            val_convertido = parseFloat(texto_convertido);

            total = total + val_convertido;

        }
    // **********
    // Escrevendo na tela o total da conta
    // **********
        let span_total = document.querySelector('#total');
        span_total.innerHTML = total;

    }
} else {
    window.location = 'login.html';
}