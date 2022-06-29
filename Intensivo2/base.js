const form = document.querySelector("form")
const lista = Array()
const botaoMapTable = document.querySelector("#mapTable")

/**
 * Evento de submissão do formulário.
 */
const submissao = (evento) => {
    evento.preventDefault()
    const obj = getObj()
    if(obj){
        lista.push(obj)
        temasLength2()
        temasPorData()
        mapTable()
    }
}

/**
 * Retorna um objeto através dos inputs #tema e #dia.
 * Caso um dos inputs não tenha sido preenchido, é retornado null.
 * 
 * @returns {Object} Objeto com tema e dia, ou null. 
 */
const getObj = () => {
    let tema = form.querySelector("#tema").value
    let dia = form.querySelector("#dia").value
    if(tema && dia)
        return { tema, dia }
    return null
}

/**
 * Adiciona nova linha com tag TR à tabela no DOM.
 * 
 * @param {Object} obj com atributos `tema` e `dia`.
 */
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
/**
 * Imprime no console a lista de tarefas de cada dia.
 */
const temasPorData = () => {
    let map = new Map()
    for(let item of lista){
        if(map.get(item.dia)){
            let antigo = map.get(item.dia)
            map.set(item.dia,[antigo, item.tema].flat())
        }else{
            map.set(item.dia, [item.tema])
        }
    }
    map.forEach((valor, chave) => {
        console.log(`Dia ${chave}: ${valor.length} tema(s)`)
    })
}

// Tarefa 02
/**
 * Imprime no console a quantidade de caracteres total, de 
 * todos os temas concatenados. A função utiliza map e reduce.
 */
const temasLength2 = () => {
    let aux1 = lista.map((obj) => obj.tema.length)
    let len = aux1.reduce((str, total) => str + total)
    console.log(`temasLength versão 02: ${len} caracteres.`)
}

// Tarefa 03
/**
 * Remove todas as linhas de uma tabela no DOM.
 */
const removeTr = () => {
    var tabela = document.querySelector('table');
    while(tabela.childNodes.length>2){
        tabela.removeChild(tabela.lastChild)
    }
}

/**
 * Renderiza a tabela no DOM de acordo com a lista.
 */
const mapTable = () =>{
    removeTr() //Remove todas as linhas antes de adicionar
    lista.map((obj) => addTr(obj))
}


/**
 * Cria escutador de evento de submit para o formulário.
 */
form.addEventListener("submit", submissao)