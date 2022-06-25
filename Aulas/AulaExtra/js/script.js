// const logadoArmazenado = JSON.parse(sessionStorage.getItem("controleAtividade.logado"))
// if (!logadoArmazenado) {
//     window.location = "login.html"
// }

const formulario = document.querySelector("#formulario")
const btnDeslogar = document.querySelector("#BtnLogout")

let atividadeArmazenada = localStorage.getItem("controleAtividades.atividade")

//alert("Verifique o console para ver os testes das funcionalidades de versões recentes ECMAScript")

let mapAtividades = new Map() //requer a palavra-chave "new"
let setAtividades = new Set() //requer a palavra-chave "new"

let listaAtividades = Array()
if (atividadeArmazenada != null) {
    //let //se atribuir com let, será criada nova variavel, com mesmo nome da global e não afetará a global
    listaAtividades = JSON.parse(atividadeArmazenada)

    // listaAtividades.forEach((obj) => {
    //     insereNoDOM(obj)
    // })

    for (let obj of listaAtividades) { // for/of
        insereNoDOM(obj)
        mapAtividades.set(obj.minutos, obj) //cada chave é única
        setAtividades.add(obj)
        setAtividades.add(obj) //cada elemento só pode ser inserido uma vez
    }
}
console.log(listaAtividades)
console.log(mapAtividades)
console.log(setAtividades)

//classe criada no arquivo atividade.js
const atv = new Atividade("12:00", "13:00", "Almoço")
//atv.calculaTempo() //pode chamar a função do objeto aqui, mas o construtor já a chama
console.log("classe Atividade", atv)

//esconde a tabela do DOM para em seguida exibir novamente após 2 segundos
const tabelaDOM = document.querySelector("#listaAtividades")
tabelaDOM.style.display = "none"

//a função async indica que a princípio sua execução não precisa "travar" a execução
//mas em algum ponto deve ser indicado onde haverá sincronização das threads
async function apresentaTabela() {
    let myPromise = new Promise(function (resolve) {
        setTimeout(() => {
            tabelaDOM.style.display = "block"
            resolve()
        }, 2000);
    });
    await myPromise
}
apresentaTabela()

// função de exponenciação onde será retornado x^y, e se y não for informado, 
// será assumido o valor 2
const exponenciacao = (x, y = 2) => x ** y
//é o mesmo que:
//const exponenciacao = (x, y = 2) => { return x ** y }
console.log("exponenciacao(3, 2) = ", exponenciacao(3, 2))
console.log("exponenciacao(3, 3) = ", exponenciacao(3, 3))
console.log("exponenciacao(4) = ", exponenciacao(4))

// função com número dinâmico de parâmetros
const concatenacao = (a, ...b) => {
    let retorno = a
    for(let param of b){
        retorno += param
    }
    return retorno
}
const professor = concatenacao('Harison', ' ', 'Herman', ' ', 'Silva')
console.log("concatenacao('Harison', ' ', 'Herman', ' ', 'Silva') = ", professor)

// verificação de substrings
console.log("professor possui 'Silva'? ", professor.includes('Silva'))
console.log("professor possui 'Oliveira'? ", professor.includes('Oliveira'))
console.log("professor começa com 'Silva'? ", professor.startsWith('Silva'))
console.log("professor começa com 'H'? ", professor.startsWith('H'))
console.log("professor termina com 'Silva'? ", professor.endsWith('Silva'))
console.log("professor termina com 'H'? ", professor.endsWith('H'))

// cria um array a partir de um elemento que pode ser iterado
const arrayProfessor = Array.from(professor)
console.log({arrayProfessor})

console.log("Chaves da listaAtividades = ")
for(let key of listaAtividades.keys()){
    console.log(key)
}

console.log("Chaves da mapAtividades = ")
for(let key of mapAtividades.keys()){
    console.log(key)
}

console.log("Valores da listaAtividades = ")
for(let key of listaAtividades.values()){
    console.log(key)
}

console.log("Valores da mapAtividades = ")
for(let key of mapAtividades.values()){
    console.log(key)
}

//ao definir uma função que filtre valores, é possível usar na função find
const longaAtividade = (atividade) => {
    return atividade.minutos > 120
}
let atvLonga = listaAtividades.find(longaAtividade)
console.log({atvLonga})

// destruição de objeto
// let {inicio, fim, ...demais} = listaAtividades[0]
// console.log("listaAtividades[0] = ", listaAtividades[0])
// console.log({inicio})
// console.log({fim})
// console.log({demais})

// transformação de matrix em array
let matriz = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
console.log("matriz = ", matriz)
console.log("matriz.flat() = ", matriz.flat())

// tenta executar um trecho, se houver erro, o código segue para o catch
// além disso, atribui valor se listaAtividades[x] existir, senão recebe 
// string "valor padrão"
try{
    let v = listaAtividades[100] ?? "valor padrão"
    console.log({v})
}catch{
    console.log("Deu ruim no variavelInexistente")
}

// é possível usar o underscore como separação visual em números grandes
let numeroGrande = 1_000_000
console.log({numeroGrande})


btnDeslogar.addEventListener('click', function () {
    sessionStorage.setItem("controleAtividade.logado", false)
    window.location = "login.html"
})

const calculaMinutos = (hora) => {
    let string_separada = hora.split(':') // '06:00' => ['06']['00']
    return parseInt(string_separada[0]) * 60 + parseInt(string_separada[1])
}

const calculaTempo = (inicio, fim) => {
    return calculaMinutos(fim) - calculaMinutos(inicio)
}

formulario.addEventListener('submit', function (evt) {
    evt.preventDefault()
    const inicio = formulario.querySelector("#inicio").value
    const fim = document.getElementById("fim").value
    const atividade = document.getElementById("atividade").value
    let minutos = calculaTempo(inicio, fim)
    let obj = {
        inicio,
        fim,
        atividade,
        minutos
    }

    if (valida(obj)) {
        if (insereEmLista(obj, listaAtividades)) {
            atualizaStorage()
            insereNoDOM(obj)
            formulario.reset()
            document.getElementById("inicio").focus()
        } else {
            alert('Atividade já existe')
        }
    }
})

function atualizaStorage() {
    localStorage.setItem("controleAtividades.atividade", JSON.stringify(listaAtividades))
}

const saoIguais = (obj1, obj2) => {
    let inicio = obj1.inicio === obj2.inicio
    let fim = obj1.fim === obj2.fim
    let atividade = obj1.atividade === obj2.atividade
    let minutos = obj1.minutos === obj2.minutos
    return inicio && fim && atividade && minutos
}

function insereEmLista(obj, lista) {
    let previamenteNaLista = lista.filter((item) => {
        if (saoIguais(item, obj)) {
            return item
        }
    })
    if (previamenteNaLista.length == 0) {
        lista.push(obj)
        return true
    }
    return false
}

function insereNoDOM(obj) {
    //tabela previamente existente no HTML
    const tabela = document.querySelector("#listaAtividades")

    //elementos a serem criados
    let linha = document.createElement('tr')
    let inicio = document.createElement('td')
    let fim = document.createElement('td')
    let minutos = document.createElement('td')
    let atividade = document.createElement('td')
    let acoes = document.createElement('td')
    let botaoExcluir = document.createElement('button')

    //criar laços entre elementos
    acoes.appendChild(botaoExcluir)
    linha.appendChild(inicio)
    linha.appendChild(fim)
    linha.appendChild(minutos)
    linha.appendChild(atividade)
    linha.appendChild(acoes)
    tabela.appendChild(linha)

    //adicionar valores
    botaoExcluir.innerHTML = 'X'
    inicio.innerHTML = obj.inicio
    fim.innerHTML = obj.fim
    minutos.innerHTML = obj.minutos
    atividade.innerHTML = obj.atividade.padEnd(9,'!')

    botaoExcluir.addEventListener('click', (evento) => {
        removerDaLista(obj, listaAtividades)
        removerDoDOM("listaAtividades", evento.target)
        atualizaStorage()
    })

}

const removerDaLista = (obj, lista) => {
    let posicao = lista.indexOf(obj)
    if (posicao >= 0) {
        lista.splice(posicao, 1)
    } else {
        alert('A lista não possui o objeto')
    }
}

const removerDoDOM = (ID_tabela, botao) => {
    const tabela = document.querySelector("#" + ID_tabela)
    let td = botao.parentNode
    let linha = td.parentNode
    tabela.removeChild(linha)
}

// Verifica se a entrada é valida
function entradaValida(entrada, nomeCampo) {
    if (entrada == '') {
        alert("Preencha o campo " + nomeCampo)
        return false
    } else {
        return true
    }
}

function valida(obj) {
    let validas = entradaValida(obj.inicio, "inicio")
        && entradaValida(obj.fim, "fim")
        && entradaValida(obj.atividade, "atividade")
    let minutos = calculaTempo(obj.inicio, obj.fim)
    if (minutos < 0) {
        alert('O fim deve ser maior que o início')
    }
    return validas && minutos >= 0
}