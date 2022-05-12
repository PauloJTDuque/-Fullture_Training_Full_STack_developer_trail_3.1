let arrayTask = []

const getInputs = (event) => {
    event.preventDefault()

    let taskName = document.getElementById('task-input').value

    if(taskName >= 0){
        validaInputs()
        return false
    }
}
arrayTask.push({taskName, status: 'Pendente'})
console.log({arrayTask})
addElementToList(arrayTask)
checkitem()

const addInput = document.getElementById('add-input-button')
addInput.addEventListener("click",getInputs)

const validaInputs = () => {
    let taskName = document.getElementById('task-input').value
    if (taskName === ' '){
        alert("Preencha a Tarefa")
    }
}

function addElementToList(array){
    let tasklist = document.querySelector('#todo-ul')
    tasklist.innerHTML = ``
    array.map((elemento, indice) => tasklist.innerHTML +=
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

function checkItem () {

    let checkBtn = document.querySelectorAll(".check-btn")

    for (let i=0; i < checkBtn.length; i++) {
        checkBtn[i].onclick = () => {
            let whatDiv = checkBtn[i].parentElement;
            whatDiv.setAttribute("class", "completed todo")
            arrayTask[i].status = "Finalizada"  
        }    
    }
}
checkBtn = document.addEventListener("click", checkItem)

// function checkButton() {

//     for (let i=0; i < checkBtn.length; i++) {
//         checkBtn[i].onclick = () => {
//             let whatDiv = checkBtn[i].parentElement;
//             whatDiv.setAttribute("class", "completed todo")
//             arrayTask[i].status = "Finalizada"  
//         }    
//     }    
// }
    
// }

const filterTasks = () => {
    let comboFilter = document.getElementById("combo-filter")
    let option = comboFilter.options[comboFilter.selectedIndex].text

    if(option === "Finalizadas") {
        let tasksFilterFinalizadas = arrayTask.filter((task) => {
            return task.status === 'Finalizada'
        })
        addElementToList(tasksFilterFinalizadas)
    } else if (option === "Não Finalizadas") {
        let tasksFilterPendentes = arrayTask.filter((task) => {
        return task.status === 'Pendente'
    })
    addElementToList(tasksFilterPendentes)     
    } else {
    addElementToList(taskArray)     
    }
}

const filterToDo = document.querySelector("#combo-filter")
filterToDo.addEventListener('click', filterTasks)