// grab all elements 
const form = document.querySelector(".form");
const lists = document.querySelector(".lists");
const input = document.querySelector(".form input");

//local Storage
class Storage {
    static addToStorage(todoArr){
        localStorage.setItem("todo", JSON.stringify(todoArr));
    }

    static getFromStorage(){
        let storage = localStorage.getItem("todo") === null ? 
        [] : JSON.parse(localStorage.getItem("todo"));
        return storage
    }
}

// empty array 
let todoArr = Storage.getFromStorage();

// form part 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 100;
    const todo = new Todo(id, input.value);
    todoArr = [...todoArr, todo];
    UI.displayData();
    UI.clearInput();
    // //add to storage
    Storage.addToStorage(todoArr);
});

// make object instance 
class Todo {
    constructor(id, todo){
        this.id = id;
        this.todo = todo;
    }
}

// display the todo in the DOM;
class UI{
    static displayData(){
        let displayData = todoArr.map((item) => {
            return `
                <div class="todo">
                <p>${item.todo}</p>
                <i class="fa-sharp fa-solid fa-trash fa-lg remove" data-id = ${item.id}></i>
                </div>
            `
        });
        lists.innerHTML = displayData.join("");
    }
    static clearInput(){
        input.value = "";
    }

    static removeTodo(){
        lists.addEventListener("click", (e) => {
            console.log(e)
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
            }
            let removeTodoId = e.target.dataset.id;
            //remove from array.
            UI.removeArrayTodo(removeTodoId);
        });
    }
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addToStorage(todoArr);
    }
}

//once the browser is loaded
window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    //remove from the dom
    UI.removeTodo();
});