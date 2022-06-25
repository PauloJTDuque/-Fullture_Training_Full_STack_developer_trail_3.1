const form = document.querySelector("form")
const lista = Array()
const botaoMapTable = document.querySelector("#mapTable")

const submissao = (evento) => {
    evento.preventDefault()
    const obj = getObj()
    if(obj){
        lista.push(obj)
        temasLength2()
    }
}

const temasLength = () => {
    let len = 0
    for(let obj of lista){
        len += obj.tema.length
    }
    console.log(`temasLength: ${len} caracteres.`)
}

const temasLength2 = () => {
    let aux1 = lista.map((obj) => obj.tema.length)
    console.log(aux1)
    let len = aux1.reduce((str, total) => str + total)
    console.log(len)
}

const mapTable = () =>{
    lista.map((obj) => addTr(obj))
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

form.addEventListener("submit", submissao)
botaoMapTable.addEventListener("click", mapTable)