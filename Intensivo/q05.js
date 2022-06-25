const form = document.querySelector("form")
const tema = form.querySelector("#tema")

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const tema = form.querySelector("#tema")
    console.log(tema.value)
})

console.log(tema.value)