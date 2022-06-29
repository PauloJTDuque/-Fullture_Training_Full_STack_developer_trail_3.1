const usuario = "admin"
const senha = "123456"

const formulario = document.querySelector("form")

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const input_usuario = formulario.querySelector("#usuario").value
    const input_senha = formulario.querySelector("#senha").value

    if(usuarioValido(input_usuario, input_senha)){
        sessionStorage.setItem("intensivo03_login", JSON.stringify(true))
        window.location = "admin.html"
    }else{
        sessionStorage.setItem("intensivo03_login", JSON.stringify(false))
        alert("Usuário ou senha inválidos")
    }
})

function usuarioValido(input_usuario, input_senha){
    return input_usuario === usuario && input_senha === senha
}