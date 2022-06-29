

function updateDOM(){
    let lista = getSetlist()

    //remover para produção
    if(lista.size === 0){
        lista = criaAmostras()
    }

    lista.forEach( produto => addProductDOM(produto) )

}

// remover para produção. A página admin terá script para adicionar elementos no localStorage
// e a lista será atualizada pelo localStorage 
function criaAmostras(){
    let lista = new Set()
    lista.add({
        titulo: "Desenvolvimento em HTML5",
        img: "img/html5.jpg",
        href: "#html",
        tag: "HTML"
    })
    lista.add({
        titulo: "Desenvolvimento em CSS",
        img: "img/css.jpg",
        href: "#css",
        tag: "CSS"
    })
    lista.add({
        titulo: "Algoritmos",
        img: "img/fullture.jpg",
        href: "#algoritmos",
        tag: "Algoritmos"
    })
    lista.add({
        titulo: "Desenvolvimento em Vanilla JS",
        img: "img/js.jpg",
        href: "#javascript",
        tag: "Javascript"
    })
    lista.add({
        titulo: "Desenvolvimento em React",
        img: "img/react.jpg",
        href: "#react",
        tag: "React"
    })
    return lista
}

function addProductDOM(product){
    const container = document.querySelector(".container")
    
    const produto = document.createElement("div")
    produto.className = "produto"

    const span = document.createElement("span")
    span.innerHTML = product.titulo

    const img = document.createElement("img")
    img.src = product.img

    const a = document.createElement("a")
    a.href = product.href
    a.innerText = `Trilha ${product.tag}`

    produto.appendChild(span)
    produto.appendChild(img)
    produto.appendChild(a)

    container.appendChild(produto)
}

updateDOM()