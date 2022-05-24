let arrayTask = []

const taskInput = document.querySelector('form');

taskInput.addEventListener('submit', function(evento){
    
    // Cancelando o comportamento padrão  para não enviar o submit e não atualizar a página
    evento.preventDefault();

    // capturar os elementos com as informções digitadas pelo usuário
    let task = taskInput.querySelector('#task-input');

    // validar informações
    let ok = validaTarefa(task);
    
    if ( ok ){
        adicionaNovaTarefa(task); 
    }
});
// Validando a Tarefa Digitada
function validaTarefa(task){
    if (task.value == ' '){
        alert('Tarefa não Informada!');
        return false;
    }
    return true;
}
function adicionaNovaTarefa(task){

    let item = {
        id: arrayTask.length + 1,
        taskName: task.value,
        status: 'Pendente'
    }
    arrayTask.push(item);

    addElementToList(arrayTask)

    // Armazenando no Local Storage
    localStorage.setItem('todoListStorage',  arrayTask)
}
function addElementToList(arrayTask){

    // Pegando elemento UL do HTML 
    let tasklist = document.querySelector('#todo-ul')

    // Limpando os elementos da tela
    tasklist.innerHTML = ``

    //Percorrendo o array e adicionando no HTML uma div com LI e botoes para 
    //  cada elemento do array (cada objeto).
    //O primeiro parametro "task" representa cada elemento/objeto do array e 
    //  o segundo parametro "indice" representa um identificador de cada elemento.
    arrayTask.map((task, indice) => tasklist.innerHTML +=
        `
        <div class="todo">
                        <li class="todo-item">${task.taskName}</li>
                        <button class="check-btn">${indice}<i class="fas fa-check" aria-hidden="true"></i></button>
                        <button class="trash-btn">${indice}<i class="fas fa-trash" aria-hidden="true"></i></button>
                    </div>
        `
    )
    // Limpando o Input
    document.querySelector('#task-input').value=" "
}




const checkItem = (e) => {
    const item = e.target
    const itemid = item.id
    const todoList = item.parentElement

    
//     document.querySelectorAll('.check-btn').forEach(() =>{
//         addEventListener('click', (event) => {
//             event.target.previousElementSibling.className = 'todo-item checked'
//         })
//     })


// }


// API WEB Storage


console.log(taskInput)