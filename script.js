const todoInput = document.getElementById("todo");
const dateInput = document.getElementById("date");
const priorityInput = document.getElementById("priority");


let allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];


document.addEventListener("DOMContentLoaded", () => {
    displayTodos("today", "todo-list");
    displayTodos("future", "future-list");
    displayTodos("completed", "completed-list");
})

document.getElementById("add-todo").addEventListener("click", () => {
    addTask();
})

let count = Math.floor(Math.random() * 1000);

function addTask(){
    const todoText = todoInput.value.trim();
    const dateValue = dateInput.value;
    const priorityLevel = priorityInput.value;

    if(!todoText || !dateValue || priorityLevel == "priority"){
        alert("Plz fill all the inputs!");
        return;
    }

    const today = new Date().toISOString().split("T")[0];
    const status = dateValue === today ? "today" : "future";


    const newTodo = {
        id: count,
        todo: todoText,
        date: dateValue,
        priority: priorityLevel,
        status: status,
        completed: false,
    };
    count++;

    allTodos.push(newTodo);
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
    

    displayTodos(status, status === "today" ? "todo-list" : "future-list");
}

function displayTodos(filterstatus, containerId){
    const todoList = document.getElementById(containerId);

    if (!todoList) {
        console.error(`Element with ID ${containerId} not found in the document.`);
        return;
    }

    todoList.innerHTML = "";

    const filterTodos = allTodos.filter((todo) => todo.status === filterstatus);


    filterTodos.forEach((todo) => {
        let list = document.createElement("li");

        list.innerHTML = `
            <p>${todo.id}. ${todo.todo}</p>
            <p>${todo.date}</p>
            <p>${todo.priority}</p>
            <div class="check-dlt-btns">
                ${todo.status !== "completed" ? `<p class="complete-btn"><i class="fa-solid fa-square-check"></i></p>` : ""}
                <p class="dlt-btn"><i class="fa-solid fa-trash"></i></p>
            </div>
        `;

        todoList.appendChild(list);

        const completeBtn = list.querySelector(".complete-btn");
        const dltBtn = list.querySelector(".dlt-btn");

        if(completeBtn){
            completeBtn.addEventListener("click", () => {
                completeTodos(todo.id);
            })
        }

        if(dltBtn){
            dltBtn.addEventListener("click", () => {
                deleteTodos(todo.id);
            })
        }
 
    })
}

function completeTodos(id){
    console.log("clicked")
    allTodos = allTodos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, status: 'completed', completed: true };
        }
        return todo;
    })

    localStorage.setItem("allTodos", JSON.stringify(allTodos));
    displayTodos("today", "todo-list");
    displayTodos("future", "future-list");
    displayTodos("completed", "completed-list");
}

function deleteTodos(id){
    console.log("clicked")

    allTodos = allTodos.filter((todo) => todo.id !== id);
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
    displayTodos("today", "todo-list");
    displayTodos("future", "future-list");
    displayTodos("completed", "completed-list");
}

