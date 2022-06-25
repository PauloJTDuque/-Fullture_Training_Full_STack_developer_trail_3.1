const form = document.querySelector("form")
const lista = Array()

const submissao = (evento) => {
    evento.preventDefault()
    const obj = getObj()
    if(obj){
        lista.push(obj)
        addTr(obj)
    }
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