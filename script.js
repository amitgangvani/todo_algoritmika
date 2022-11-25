let todoList = [];
let currentId = 0;
newElement(currentId, "");

let createBtn = document.getElementById("createTodo");
createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    newElement(currentId, "");
})

let incSort = document.getElementById("incSort");
incSort.addEventListener('click', (e) => {

    e.preventDefault();

    todoList.sort((a, b) => {
        return a.text > b.text ? 1 : -1;
    });

    todoList.forEach(Item => {
        deleteElement("delete_" + Item.id);
        newElement(Item.id, Item.text);
    });

    incSort.classList.toggle("toggle");
    decSort.classList.toggle("toggle");

})

let decSort = document.getElementById("decSort");
decSort.addEventListener('click', (e) => {

    e.preventDefault();

    todoList.sort((a, b) => {
        return b.text > a.text ? 1 : -1;
    });

    todoList.forEach(Item => {
        deleteElement("delete_" + Item.id);
        newElement(Item.id, Item.text);
    });

    incSort.classList.toggle("toggle");
    decSort.classList.toggle("toggle");

})

//Создание новой записи ToDo
function newElement(id, text) {

    let todoObject = {id, text};
    todoList.push(todoObject)

    let todoContainer = document.createElement("div");
    todoContainer.setAttribute("class", "todoContainer");
    todoContainer.setAttribute("id", "todo_" + todoObject.id)

    let inputElem = document.createElement("input");
    inputElem.setAttribute("type", "text");
    inputElem.setAttribute("id", "change_" + todoObject.id);
    inputElem.setAttribute("value", text);

    let todoDeleteBtn = document.createElement("button");
    todoDeleteBtn.setAttribute("class", "delete");
    todoDeleteBtn.setAttribute("id", "delete_" + todoObject.id)

    todoContainer.appendChild(inputElem);
    todoContainer.appendChild(todoDeleteBtn);

    document.getElementById("todos").appendChild(todoContainer);

    todoDeleteBtn.onclick = e => {
        e.preventDefault();
        deleteElement(e.target.id);
    }

    inputElem.onchange = e => {
        let stringId = e.target.id;
        let text = e.target.value;
        let id = +stringId.split("_")[1];
        let todoListCopy = todoList.filter(item => item.id !== id);
        todoList = [...todoListCopy, {id, text}];
    }

    currentId++;
}

//Удаление существующего ToDo
function deleteElement(stringId) {

    let id = +stringId.split("_")[1];

    let updatedList = todoList.filter(Item => Item.id !== id);
    todoList = [...updatedList];
    document.getElementById("todo_" + id).remove();

}