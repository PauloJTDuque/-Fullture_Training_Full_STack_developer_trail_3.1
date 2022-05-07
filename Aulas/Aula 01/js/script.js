
function entradaValida(entrada){
    return new Promise((resolve, reject) => {
        //funcao demorada vem aqui
        //geralmente vai ser algo externo
        //que pode demorar muito para terminar
        if(entrada == ''){
            reject()
        }else{
            resolve()
        }
    })
}

function validaAsync(){
    const inicio = document.getElementById("inicio").value
    const fim = document.getElementById("fim").value
    const atividade = document.getElementById("atividade").value
    entradaValida(inicio).then( () => { //resolve
        console.log("Inicio " + inicio)
    }).catch( () => {
        alert("Preencha o inicio")
    } )
    console.log("depois da validacao do inicio")
    entradaValida(fim).then( () => { //resolve
        console.log("Fim " + fim)
    }).catch( () => {
        alert("Preencha o fim")
    } )
    console.log("depois da validacao do fim")
    entradaValida(atividade).then( () => { //resolve
        console.log("Atividade " + atividade)
    }).catch( () => {
        alert("Preencha a atividade")
    } )
    console.log("depois da validacao da atividade")

}