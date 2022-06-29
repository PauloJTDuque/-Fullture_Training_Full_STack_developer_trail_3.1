const form = document.querySelector("form")
const lista = Array()
const botaoMapTable = document.querySelector("#mapTable")

const submissao = (evento) => {
    evento.preventDefault()
    const obj = getObj()
    if(obj){
        lista.push(obj)
        temasLength2()
        // temasPorData()
    }
}

const temasLength = () => {
    let len = 0
    for(let obj of lista){
        len += obj.tema.length
    }
    console.log(`temasLength: ${len} caracteres.`)
}

const getObj = () => {
    let tema = form.querySelector("#tema").value
    let dia = form.querySelector("#dia").value
    if(tema && dia)
        return { tema, dia }
    return null
}

const addTr = (obj) => {
    const table = document.querySelector("table")
    let linha = document.createElement("tr")
    let temaTd = document.createElement("td")
    let diaTd = document.createElement("td")

    linha.appendChild(temaTd)
    linha.appendChild(diaTd)

    temaTd.innerHTML = obj.tema
    diaTd.innerHTML = obj.dia

    table.appendChild(linha)
}

// Tarefa 01
const temasPorData = () => {
    const totaisTema = document.getElementById('totais-tema')
    let map = new Map()
    for(let item of lista){
        if(map.get(item.dia)){
            let antigo = map.get(item.dia)
            map.set(item.dia,[antigo, item.tema].flat())
          }else{
            map.set(item.dia, [item.tema])
          }
          console.log("map", map)
    }
    map.forEach((valor, chave) => {
        totaisTema.innerHTML += `Dia ${chave}: ${valor.length} tema(s) </br>`
    })
}

// Tarefa 02
const temasLength2 = () => {
    let aux1 = lista.map((obj) => obj.tema.length)
    let len = aux1.reduce((str, total) => str + total)
    console.log(`temasLength versão 02: ${len} caracteres.`)
}

// Tarefa 03
const removeTr = () => {
    let tabela = document.querySelector('table');
    while(tabela.childNodes.length>2){
        tabela.removeChild(tabela.lastChild)
    }

    document.getElementById('totais-tema').innerHTML = ''
}

const mapTable = () =>{
    //Remover todas linhas antes de adicionar
    removeTr()

    lista.map((obj) => addTr(obj))
    temasPorData()
}



form.addEventListener("submit", submissao)
botaoMapTable.addEventListener("click", mapTable)