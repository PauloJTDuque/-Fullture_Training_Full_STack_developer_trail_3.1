/**
 * Remove o elemento do Set e atualiza localStorage. (Delete do CRUD)
 * @param {Object} produto 
 */
function removerLinhaLocalStorage(produto){
    const set = getSetlist()
    const newSet = [...set].filter(p => JSON.stringify(p) !== JSON.stringify(produto))
    localStorage.setItem("intensivo03_produtos", JSON.stringify([...newSet]))
}

/**
 * Obtém o Set de produtos. (Retrieve do CRUD)
 * @returns Set com produtos armazenados em localStorage ou novo Set
 */
function getSetlist(){
    let ls = JSON.parse(localStorage.getItem("intensivo03_produtos"))
    if(ls){
        return new Set(ls)
    }
    return new Set()
}

/**
 * Cria e atualiza (Create e Update do CRUD)
 * @param {Object} produto 
 * @returns 
 */
function adicionaProdutoStorage(produto){
    const set = getSetlist()
    let existe = [...set].filter( prod => JSON.stringify(prod) === JSON.stringify(produto))
    if(existe.length === 0){
        set.add(produto)
        localStorage.setItem("intensivo03_produtos", JSON.stringify([...set]))
        return true
    }
    return false
}