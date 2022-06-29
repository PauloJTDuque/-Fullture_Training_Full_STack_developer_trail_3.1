const form = document.querySelector("form")
const botaoMapTable = document.querySelector("#mapTable")

/**
 * Retorna um novo Map ou obtém o Map armazenado
 * no localStorage.
 * 
 * @returns {Map} map novo ou com valores do localStorage.
 */
function getMapFromLocalStorage(){
    const ls = localStorage.getItem("temasPorData")
    let map = new Map()
    if(ls){
        map = new Map(JSON.parse(ls))
    }
    return map
}

/**
 * Função para inicializar o DOM com valores
 * previamente armazenados
 */
function init(){
    const map = getMapFromLocalStorage()
    mapTable(map)
}

/**
 * Evento de submissão do formulário.
 */
const submissao = (evento) => {
    evento.preventDefault()
    const obj = getObj()
    const map = getMapFromLocalStorage()

    if(obj){
        map = temasPorData(map, obj)
        mapTable(map)
        localStorage.setItem("temasPorData", JSON.stringify([...map]))
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

// Intensivo - Aula 01 - Tarefa 01
/**
 * Imprime no console o mapa de tarefas de cada dia.
 * 
 * @param {Map} map - tarefas mapeadas por data, onde 
 * a data é a chave e a tarefa é o valor.
 * 
 * @param {Object} obj - objeto com `tema` e dia, a ser
 * adicionado no map.
 */
const temasPorData = (map, obj) => {
    const antigo = map.get(obj.dia) ?? []
    antigo.push(obj.tema)
    map.set(obj.dia, antigo.flat())
    return map
}


// Intensivo - Aula 01 - Tarefa 03
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
 * Renderiza a tabela no DOM de acordo com o map.
 * 
 * @param {Map} mapObj - map com lista de temas por dia.
 */
const mapTable = (mapObj) =>{
    removeTr() //Remove todas as linhas antes de adicionar
    mapObj.forEach((valor, chave) => addTr({ "tema": (valor.toString()).replaceAll(",", ", "), "dia": chave}))
}


/**
 * Cria escutador de evento de submit para o formulário.
 */
form.addEventListener("submit", submissao)

init()