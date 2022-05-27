const logado = JSON.parse(sessionStorage.getItem("toDoList.logado"))

if (!logado) {
    window.location = "login.html"
}
let arrayTask = []

const tasks = localStorage.getItem("toDoList.tasks")
let tasksList = document.querySelector("#todo-ul")

if (tasks) {
    arrayTask = JSON.parse(tasks)
    addElementToList(arrayTask)
}

const getInputs = (event) => {

    event.preventDefault()

    let taskName = document.getElementById('task-input').value
    if (taskName >= 0) {
        validaInputs()
        return false
    }
    arrayTask.push({ taskName, status: 'Pendente' });
    console.log(arrayTask)

    localStorage.setItem("toDoList.tasks", JSON.stringify(arrayTask))

    //console.log({arrayTask})
    addElementToList(arrayTask)

    // checkItem()

}

const addInput = document.getElementById('add-input-button')
addInput.addEventListener("click", getInputs)

const validaInputs = () => {
    let taskName = document.getElementById('task-input').value
    if (taskName === ' ') {
        alert("Preencha a Tarefa")
    }
}

function addElementToList(array) {
    tasksList.innerHTML = ``
    array.map((elemento, indice) =>
        {if (elemento.status === "Finalizada") {
                tasksList.innerHTML +=
                    `
                <div class="todo completed">
                                <li class="todo-item">${elemento.taskName}</li>
                                <button class="check-btn" id='${indice}'><i class="fas fa-check" aria-hidden="true"></i></button>
                                <button class="trash-btn" id='${indice}'><i class="fas fa-trash" aria-hidden="true"></i></button>
                            </div>
                                     
            `
            } else {
                tasksList.innerHTML +=
                    `
                <div class="todo">
                    <li class="todo-item">${elemento.taskName}</li>
                        <button class="check-btn" id='${indice}'><i class="fas fa-check" aria-hidden="true"></i></button>
                        <button class="trash-btn" id='${indice}'><i class="fas fa-trash" aria-hidden="true"></i></button>           
                </div>
                                     
            `
            }
        }
    )
    console.log(arrayTask)
    document.querySelector('#task-input').value = " "
}

const checkAndDeleteItem = (event) => {

    const item = event.target;
    console.log(item)
    console.log(arrayTask)
    const itemId = item.id;
    const todoList = item.parentElement;

    if (item.classList.value === 'check-btn') {

        todoList.classList.add('completed');
        arrayTask[itemId].status = "Finalizada";
        atualizaStorage();
    }
    if (item.classList.value === 'trash-btn') {

        arrayTask.splice(itemId, 1);
        addElementToList(arrayTask);
        atualizaStorage();
    }
}

tasksList.addEventListener('click', checkAndDeleteItem);

// Fazendo a leitura do combo filter no elemento select 
const comboFilter = document.getElementById("combo-filter")

const filterTasks = () => {  

    // Carregando em "option" o texto da opção selecionada pelo usuário usando o método Option
    let option = comboFilter.options[comboFilter.selectedIndex].text

   // Verificando a opção selecionada e ajustando a tela
    if (option === "Finalizadas") {
        let tasksFilterFinalizadas = arrayTask.filter((task) => {
            return task.status === 'Finalizada'
        })
        localStorage.setItem("toDoList.tasksFinalizadas", JSON.stringify(tasksFilterFinalizadas))
        addElementToList(tasksFilterFinalizadas)
    } else if (option === "Não Finalizadas") {
            let tasksFilterPendentes = arrayTask.filter((task) => {
            return task.status === 'Pendente'
        })
        localStorage.setItem("toDoList.tasksPendentes", JSON.stringify(tasksFilterPendentes))
        addElementToList(tasksFilterPendentes)
    } else {
        addElementToList(arrayTask)
    }
}

comboFilter.addEventListener('click', filterTasks)

const atualizaStorage = () => {
    localStorage.setItem("toDoList.tasks", JSON.stringify(arrayTask))
}