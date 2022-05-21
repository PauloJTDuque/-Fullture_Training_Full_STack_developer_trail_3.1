let arrayTask = []

const taskInput = document.querySelector('form');

taskInput.addEventListener('submit', function(evento){

    evento.preventDefault();

    // capturar os elementos com as informções digitadas pelo usuário
    let task = taskInput.querySelector('#task-input');


    // validar informações
    let ok = validaTarefa(task);
    
    if ( ok ){
        adicionaNovaTarefa(task); 

    }

});

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
        tarefa: task.value
    }
    arrayTask.push(item);

    console.log(arrayTask)

    addElementToList(arrayTask)
}

function addElementToList(arrayTask){
    let tasklist = document.querySelector('#todo-ul')
    tasklist.innerHTML = ``
    arrayTask.map((elemento, indice) => tasklist.innerHTML +=
        `
        <div class="todo">
                        <li class="todo-item">${elemento.taskName}</li>
                        <button class="check-btn">${indice}<i class="fas fa-check" aria-hidden="true"></i></button>
                        <button class="trash-btn">${indice}<i class="fas fa-trash" aria-hidden="true"></i></button>
                    </div>
        `
    )
    document.querySelector('#task-input').value=" "
}




console.log(taskInput)