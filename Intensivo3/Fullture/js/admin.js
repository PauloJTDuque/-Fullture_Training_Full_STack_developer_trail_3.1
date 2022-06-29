const _logado = JSON.parse(sessionStorage.getItem("intensivo03_login"))
if(!_logado){
    sessionStorage.setItem("intensivo03_login", JSON.stringify(false))
    window.location = "login.html"
    throw Error("Usuário não está logado")
}

const formulario = document.querySelector("form")

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const produto = getObj()
    if(produto){
        if(adicionaProdutoStorage(produto))
            adcionaTabDOM(produto)
    }else{
        alert("Preencha todos os campos")
    }
})

function getObj(){
    const titulo = formulario.querySelector("#input_titulo").value
    const img = formulario.querySelector("#input_img").value
    const href = formulario.querySelector("#input_link").value
    const tag = formulario.querySelector("#input_tag").value
    if(titulo && img && href && tag)
        return {titulo, img, href, tag}
    return null
}

function removeLinesDOMtable(){
    const tbody = document.querySelector("#tabelaProdutosBody")
    while(tbody.childNodes.length > 1){
        tbody.removeChild(tbody.lastChild)
    }
}

function updateDOMadmin(){
    const set = getSetlist()
    removeLinesDOMtable();
    [...set].map(produto => adcionaTabDOM(produto))
}

function adcionaTabDOM(produto){
    const tbody = document.querySelector("#tabelaProdutosBody")

    const linha = document.createElement("tr")
    const td_titulo = document.createElement("td") 
    const td_img = document.createElement("td") 
    const td_link = document.createElement("td") 
    const td_tag = document.createElement("td") 
    const td_acoes = document.createElement("td") 

    const img = document.createElement("img")
    const a = document.createElement("a")
    const btn_excluir = document.createElement("button")

    td_titulo.innerHTML = produto.titulo
    img.src = produto.img
    img.style = "max-height: 100px"
    a.innerText = a.href = produto.href
    td_tag.innerHTML = produto.tag;
    btn_excluir.innerHTML = "X"

    btn_excluir.addEventListener("click", () => {
        removerLinhaLocalStorage(produto)
        updateDOMadmin()
    })

    td_link.appendChild(a)
    td_img.appendChild(img)
    td_acoes.appendChild(btn_excluir)
    linha.appendChild(td_titulo)
    linha.appendChild(td_img)
    linha.appendChild(td_link)
    linha.appendChild(td_tag)
    linha.appendChild(td_acoes)
    tbody.appendChild(linha)
}

updateDOMadmin()