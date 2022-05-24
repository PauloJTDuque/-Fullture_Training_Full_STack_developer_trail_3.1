const login = 'fullture@fullture.com.br';
const senha = 'sucesso';

const form = document.getElementById('form');
const paragraph = document.createElement('p')

function recEventForm(evento){
    
    evento.preventDefault();

    const input_login = form.querySelector('#login');
    const input_senha = form.querySelector('#senha');

    if ( login == input_login.value && senha == input_senha.value ){

        // adicionar uma variavel na sessão que indique que o cara esta logado
        window.sessionStorage.setItem('logado', true);

        // redirecionar para a pagina index
        sessionStorage.setItem("toDoList.logado", JSON.stringify(true))
        window.location = 'index.html';

    }else{
        
        paragraph.textContent = 'Login ou senha inválido!';
        paragraph.style.color = 'red';
        const div_campos = document.getElementById('campos');
        div_campos.appendChild(paragraph);
        sessionStorage.setItem("toDoList.logado", JSON.stringify(false));
        
    }
};
form.addEventListener('submit', recEventForm)