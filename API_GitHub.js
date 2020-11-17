let nomeUsuario = document.getElementById('nomeUsuario')
let input = document.getElementById('entrada')
let botao = document.getElementById('botao')
botao.addEventListener("click", request)

function request() {
    let usuario = new XMLHttpRequest();

    usuario.open("GET", `https://api.github.com/users/${input}`)
    console.log(input)
    // usuario.open("GET", `https://api.github.com/users/efernandes16`)

    usuario.addEventListener("load", function () {
        let infoUsuario = JSON.parse(this.responseText)

        nomeUsuario.innerText = infoUsuario.login
    })

    usuario.send()
}