let form = document.getElementById('addForm')
let itemList = document.getElementById('items')
let filter = document.getElementById('filter')


itemList.addEventListener('click',deleteEventListner);
function deleteEventListner(e){
    if(e.target.classList.contains('delete')){
        if(confirm("Are you Sure ? Batao Na")){
            var li = e.target.parentElement
            li.remove()
        }
    }
}

form.addEventListener('submit',addItem)
function addItem(e){
    e.preventDefault();
    console.log(1)
    let newItem = document.getElementById('item')

    let li = document.createElement('li')
    li.className = 'list-group-item'
    li.appendChild(document.createTextNode(newItem.value));
    var deleteBtn = document.createElement('button')
    deleteBtn.className = "btn btn-danger btn-sm float-right delete"
    deleteBtn.appendChild(document.createTextNode('X'));
    li.appendChild(deleteBtn)
    itemList.appendChild(li);

}


filter.addEventListener('keyup',filterItem)
function filterItem(e){
    let text = e.target.value.toLowerCase()
    // console.log(text);
    let items =  itemList.getElementsByTagName('li')
    Array.from(items).forEach(function (item){
        var itemName = item.firstChild.textContent
        if(itemName.toLowerCase().indexOf(text) !== -1){
            item.style.display = 'block'
        }else{
            item.style.display = 'none'
        }
    })
}