//seleção de elementos

const contaninerMan = document.querySelector(".container-main");
const ListForm = document.querySelector("#list-form")
const listInput = document.querySelector("#list-input");
const listTarefas = document.querySelector("#list-tarefas");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-btn");
const searchInput = document.querySelector("#search-input") 
const filterBtn = document.querySelector("#filter-select") 
const eraseBtn = document.querySelector("#erase-button")

let oldInputTitle;



//funções

const savetodo = (text, done = 0, save = 1) => {


    const todo = document.createElement("div")
    todo.classList.add("list")

    const listTitle = document.createElement("h3")
    listTitle.innerText = text;
    todo.appendChild(listTitle)
    
    
    

    

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML =  '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)
   
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML =  '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)
   
    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn)

    // dados da localStorege

    if(done) {
       todo.classList.add("done")
    }


    if(save){
        saveListLocalStorege({text, done})
    }
    
    listTarefas.appendChild(todo)

    listInput.value = ""
    listInput.focus()


};


const toggleForm = () =>{
    editForm.classList.toggle("hide")
    ListForm.classList.toggle("hide")
    listTarefas.classList.toggle("hide")


};

const updateTodo = (text) => {


    const todos = document.querySelectorAll(".list")

    todos.forEach((list) => {
        
        let todoTitle = list.querySelector("h3")

        if(todoTitle.innerText === oldInputTitle){
            todoTitle.innerText = text   
            
            updateListLocalStorege(oldInputTitle, text)
        }
        


      
    });
};

const getSearchList = (search) => {

    const todos = document.querySelectorAll(".list")

    todos.forEach((list) => {
        
        let todoTitle = list.querySelector("h3").innerText.toLocaleLowerCase()

        const normalSearch = search.toLocaleLowerCase()

       list.style.display = "flex"

       if(!todoTitle.includes(normalSearch)) {
            list.style.display = "none";
       }
    });

};


const filterList = (filterValue) => {

    const todos = document.querySelectorAll(".list")

    switch ((filterValue)) {

        case "all":
            todos.forEach((list) => list.style.display = "flex")  
             
            break;
    
        case "done":
           todos.forEach((list) => list.classList.contains("done") 
           ? list.style.display = "flex"
           :list.style.display = "none"
           );    
           break;


           case "todo": 
           todos.forEach((list) =>  list.classList.contains("done") 
           ? list.style.display = "none"
           :list.style.display = "flex")


           default:
            break;
    }

};

// Eventos





contaninerMan.addEventListener("submit", (e) =>{
    e.preventDefault()

    const inputValue = listInput.value;


    if(inputValue){
       savetodo(inputValue) 
    }

});

document.addEventListener("click", (e) => {



 const targetEl = e.target;
 const parentEl = targetEl.closest("div")

 let todoTitle;


 if(parentEl && parentEl.querySelector("h3")){
    todoTitle = parentEl.querySelector("h3").innerText
 }

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")
        updateListStatusLocalStorege(todoTitle);

    }


    if( targetEl.classList.contains("remove-todo")){
        parentEl.remove()
        removeLIstLocalStorege(todoTitle)
    }


    if( targetEl.classList.contains("edit-todo")){
        toggleForm();

        editInput.value = todoTitle;
        oldInputTitle = todoTitle; 
 }
});


cancelEditBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    toggleForm();
    

});

editForm.addEventListener("submit" , (e) =>{
    e.preventDefault()
    

    const editInputValue = editInput.value

    if (editInputValue ) {
        updateTodo(editInputValue)
    }

    toggleForm()
});


searchInput.addEventListener("keyup", (e) =>{
    

    const search = e.target.value
    getSearchList(search);

});



eraseBtn.addEventListener("click", (e) => {
    e.preventDefault()
    searchInput.value = ""
    searchInput.dispatchEvent(new Event("keyup"))

});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value

    filterList(filterValue)
});


// Local Storage 

const getListLocalStorege = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    return todos;
};


const loadList = () => {
    const todos = getListLocalStorege();
    

    todos.forEach((todo) =>{
        savetodo(todo.text, todo.done, 0)
    });

};

const saveListLocalStorege = (todo) => {

 const todos = getListLocalStorege();

  todos.push(todo)

  localStorage.setItem("todos", JSON.stringify(todos));



};

const removeLIstLocalStorege = (todoText, done) => {


    const todos = getListLocalStorege();

    const filteredList = todos.filter((todo) => todo.text !== todoText)
    localStorage.setItem("todos", JSON.stringify(filteredList));

};

const updateListStatusLocalStorege = (todoText) => {


    const todos = getListLocalStorege();

    todos.map((todo) => todo.text === todoText ? todo.done = !todo.done : null) 
    localStorage.setItem("todos", JSON.stringify(todos));

};


const updateListLocalStorege = (todoOldText, todoNewText) => {


    const todos = getListLocalStorege();

    todos.map((todo) => 
    todo.text === todoOldText ? (todo.text = todoNewText) : null
   
    );

    localStorage.setItem("todos", JSON.stringify(todos))

};


loadList();