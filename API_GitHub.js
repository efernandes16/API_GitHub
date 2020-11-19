let usuarioNaTela = document.getElementById('usuarioNaTela')
let ipt = document.getElementById('input')
let botao = document.getElementById('botao')
botao.addEventListener("click", requestUsuario)
botao.addEventListener("click", requestRepositorio)

let tituloRepositorios = document.getElementById('tituloRepositorios')
let tituloLinks = document.getElementById('tituloLinks')
let repositorios = document.getElementById('repositorios')
// let linkRepositorios = document.getElementById('linkRepositorios')

let body = document.querySelector("body")
let linkRepositorios = document.createElement("a")
body.appendChild(linkRepositorios)

function requestUsuario() {
    let usuario = new XMLHttpRequest();

    usuario.addEventListener("load", function () {
            if (this.status == 404){
                usuarioNaTela.innerText = "Usuário não encontrado"
            } else {
                let infoUsuario = JSON.parse(this.responseText)
                usuarioNaTela.innerText = infoUsuario.login
            }
     })

    usuario.open("GET", `https://api.github.com/users/${ipt.value}`, false)
    usuario.send()
}

// Descobrir uma forma de carregar o API do usuario e mostrar na tela o que falta

function requestRepositorio() {
    let repos = new XMLHttpRequest();

    repos.addEventListener("load", function () {
            if (this.status == 404){
                repositorios.innerText = "Usuário não encontrado"
            } else {
                let infoRepos = JSON.parse(this.responseText);

                let arrayDeRepos = []
                for (let i = 0; i < infoRepos.length; i++) {
                    arrayDeRepos.push("<li>" + infoRepos[i].name + "</li>")
                }
                tituloRepositorios.textContent = "Repositórios do usuário:"
                repositorios.innerHTML = arrayDeRepos.join("")
                
            }
     })

     repos.addEventListener("load", function(){
        if (this.status == 404){
            repositorios.innerText = "Usuário não encontrado"
        } else {
            let infoRepos = JSON.parse(this.responseText);

            let arrayDeRepos = []
            for (let i = 0; i < infoRepos.length; i++) {
                arrayDeRepos.push(`${infoRepos[i].clone_url}`).toString()
            }
            tituloLinks.textContent = "Link para os Repositórios do usuário:"
            linkRepositorios.innerHTML = arrayDeRepos
            
        }
     })

    repos.open("GET", `https://api.github.com/users/${ipt.value}/repos`, false)
    repos.send()
}