const logado = JSON.parse(sessionStorage.getItem("toDoList.logado"))

if(logado) {

    let arrayTask = []

    const tasks = localStorage.getitem("toDoList.tasks")
    let tasksList = document.querySelector("#todo-ul")

    if (tasks){
        arrayTask = JSON.parse(tasks)
        addElementToList(arrayTask)
    }

    const getInputs = (event) => {

        event.preventDefault()

        let taskName = document.getElementById('task-input').value
        if(taskName >= 0){
            validaInputs()
            return false
        }
        arrayTask.push({taskName, status: 'Pendente'})

        localStorage.setItem("toDoList.tasks", JSON.stringify(arrayTask))

        //console.log({arrayTask})
        addElementToList(arrayTask)

        checkItem()

    }

    const addInput = document.getElementById('add-input-button')
    addInput.addEventListener("click",getInputs)

    const validaInputs = () => {
        let taskName = document.getElementById('task-input').value
        if (taskName === ' '){
            alert("Preencha a Tarefa")
        }
    }
    function addElementToList(array){
        // let taskslist = document.querySelector('#todo-ul')
        tasksList.innerHTML = ``
        array.map((elemento, indice) => 
        
            {if(elemento.status === "FInalizada") {
                tasksList.innerHTML +=
            `
                <div class="todo">
                                <li class="todo-item">${elemento.taskName}</li>
                                <button class="check-btn" id='${indice}'><i class="fas fa-check" aria-hidden="true"></i></button>
                                <button class="trash-btn" id='${indice}'><i class="fas fa-trash" aria-hidden="true"></i></button>
                            </div>
                                     
            `
            } else{
                tasksList.innerHTML +=
                `
                <div class="todo">
                    <li class="todo-item">${elemento.taskName}</li>
                        <button class="check-btn" id='${indice}'><i class="fas fa-check" aria-hidden="true"></i></button>
                        <button class="trash-btn" id='${indice}'><i class="fas fa-trash" aria-hidden="true"></i></button>           
                </div>
                                     
            ` 
            }}
        )
        document.querySelector('#task-input').value=" "
    }

    const checkAndDeleteItem = (event)  => {
        const item = event.target;
        const itemId = itemId;
        const todoList = item.parentElement;

        if(item.classList.value === 'check-btn') {

            todoList.classList.add('completed');
            arrayTask[itemId].status = "Finalizada";
            atualizaStorage()
        }
        if(item.classList.value === 'trash-btn') {

            arrayTask.splice(itemId, 1);
            addElementToList(arrayTask);
            atualizaStorage();
        }
    }    
    tasksList.addEventListener("click", checkAndDeleteItem)

        // let checkBtn = document.querySelectorAll(".check-btn")

        // for (let i=0; i < checkBtn.length; i++) {
        //     checkBtn[i].onclick = () => {
        //         let whatDiv = checkBtn[i].parentElement;
        //         whatDiv.setAttribute("class", "completed todo")
        //         arrayTask[i].status = "Finalizada"  
        //     }    
        // }
    // }

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

}