//initalizing variavle

const items = document.getElementById('tasks')
const enter = document.querySelector('.input');
//function to delete from array
function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
}
// Deleting a Item
items.addEventListener('click', removeItem);
function removeItem(event) {
    if (event.target.classList.contains('delete')) {
        if (confirm('Are u sure?')) {
            let itm = event.target.parentElement.parentElement
            let hr = event.target.parentElement.parentElement.nextElementSibling
            let data = event.target.parentElement.previousElementSibling.firstElementChild.value
            itm.remove();
            hr.remove();
            array = arrayRemove(array, data);
            localStorage.setItem("todoList", JSON.stringify(array))
        }
    }
}


//loading element from local storage
let array = []
let todos = localStorage.getItem("todoList")
if (todos) {
    todos = JSON.parse(todos)
    array = todos
    todos.forEach(addToList)
}

// Taking input

enter.addEventListener('keyup', addItems);

function addItems(event) {
    if (!event.target.value) {
        enter.placeholder = "Please Enter Value"
        return;
    }
    if (event.key === "Enter") {
        let val = event.target.value
        array.push(val);
        localStorage.setItem("todoList", JSON.stringify(array))
        addToList(val)
    }
}

//creating a node
function addToList(val) {
    let div = document.createElement('div');
    div.className = 'task';
    let div2 = document.createElement('div')
    div2.className = 'content'
    let input = document.createElement("input");
    input.type = "text";
    input.className = "text";
    input.setAttribute('value', val)
    input.setAttribute('readonly', true)
    div2.appendChild(input)
    div.appendChild(div2);
    let div3 = document.createElement('div')
    div3.className = 'actions'
    let input1 = document.createElement("input");
    input1.className = 'checkbox'
    input1.setAttribute('type', 'checkbox')
    let button = document.createElement("button");
    button.className = 'delete'
    let x = document.createTextNode('X');
    button.appendChild(x)
    div3.appendChild(input1)
    div3.appendChild(button)
    div.appendChild(div3)
    items.appendChild(div)
    let hr = document.createElement('hr')
    items.appendChild(hr)
    enter.value = ''
    enter.placeholder = "I need to..."
}

// marking a Item
items.addEventListener('change', markItems)

function markItems(event) {
    let itm = event.target.parentElement.previousElementSibling.firstElementChild
    if (event.target.checked) {
        itm.classList.add('strike')
    } else {
        itm.classList.remove('strike')
    }
}
