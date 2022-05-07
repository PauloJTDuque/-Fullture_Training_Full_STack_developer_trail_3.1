const formulario = document.querySelector("#formulario")
const exemplo = document.querySelector("#exemplo")

console.log({exemplo})

const listaAtividades = Array()

formulario.addEventListener('submit', function(evt){
    evt.preventDefault()
    const inicio = document.getElementById("inicio").value
    const fim = document.getElementById("fim").value
    const atividade = document.getElementById("atividade").value
    let obj = {
        inicio, 
        fim, 
        atividade
    }
    if(valida(obj)){
        console.log("Todas entradas válidas")
        insereEmLista(obj)
        console.log({listaAtividades})
        insereNoDOM(obj)
    }
})

function insereEmLista(obj){
    listaAtividades.push(obj)
}

function insereNoDOM(obj){
    let paragrafo = document.createElement('p')
    paragrafo.innerHTML = "Início: " + obj.inicio + 
                            "Fim: " + obj.fim + 
                            "Atividade: " + obj.atividade
    document.body.appendChild(paragrafo)
}

// Verifica se a entrada é valida
function entradaValida(entrada, nomeCampo){
    if(entrada == ''){
        alert("Preencha o campo " + nomeCampo)
        return false
    }else{
        return true
    }
}

function valida(obj){
    let retorno = entradaValida(obj.inicio, "inicio") 
                   && entradaValida(obj.fim, "fim")
                   && entradaValida(obj.atividade, "atividade")
    console.log({retorno})
    return retorno
}