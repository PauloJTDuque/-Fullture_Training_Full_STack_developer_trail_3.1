const login = 'admin';
const senha = '123456';

const form = document.querySelector('form');

form.addEventListener('submit', function(event){
    
    event.preventDefault();

    const input_login = form.querySelector('#login');
    const input_senha = form.querySelector('#senha');

    if ( login == input_login.value && senha == input_senha.value ){
        // adicionar uma variavel na sessão que indique que o cara esta logado
        window.sessionStorage.setItem('logado', true);

        // redirecionar para a pagina index
        window.location = 'index.html';
    }else{
        window.sessionStorage.setItem('logado', false);
        alert('Login ou senha inválido!');
    }
});