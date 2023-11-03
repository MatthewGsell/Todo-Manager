console.log("supmmmmmmmm");
let todoarray = []
let selectedfolder = ''
const createfolderbutton = document.querySelector('#createfolderbutton')
createfolderbutton.addEventListener('click', FolderScreenCreation)
const deletefolderbutton = document.querySelector('#deletefolderbutton')
deletefolderbutton.addEventListener('click', deletefolder)
const createTodoButton = document.querySelector('#createtodobutton')
createTodoButton.addEventListener('click', TodoCreation)
function FolderScreenCreation() {
    foldername = document.querySelector('#foldernameinput').value
    folderlist = document.querySelector('#folderlistgroup')
    folderitem = document.createElement('li')
    folderitem.classList.add('list-group-item', foldername)
    folderitem.innerText = foldername
    folderlist.appendChild(folderitem)
    document.querySelector('#foldernameinput').value = ''
    folderitem.addEventListener('click', highlightfolder)
} 

function highlightfolder(e) {
    oldselected = document.querySelector('.selectedfolder')
    if (oldselected != null) {
    oldselected.classList.remove('selectedfolder') }
    e.target.classList.add('selectedfolder')
    d = document.querySelector('#deletefolderbutton')
    d.classList.remove('hidden')
    rendertodos()
}

function deletefolder(e) {
d = document.querySelector('#deletefolderbutton')
selected = document.querySelector('.selectedfolder')
tododomlist = document.querySelector('#todolistgroup')
tododomlist.innerHTML = ''
todoarray.forEach((item, index) => {
    if (item.folder === selected.textContent) {
        todoarray.splice(index, 1)
    }
})
folderlist = document.querySelector('#folderlistgroup')
folderlist.removeChild(selected)
d.classList.add('hidden')
todolist = document.querySelector('#todolistgroup')
    todolist.innerHTML = ''

}
function TodoCreation() {
    selectedfolder = document.querySelector('.selectedfolder')
    if (selectedfolder != null) {
function TodoObject() {
    this.description = document.querySelector('#tododescription').value;
    this.priorityvalue = document.querySelector('#priorityselect').value;
    this.priority = document.querySelector('#priorityselect').options[this.priorityvalue].innerText
    this.date = document.querySelector('#dateselect').value;
    this.folder = document.querySelector('.selectedfolder').textContent
}
a = new TodoObject()
todoarray.push(a)
console.log(todoarray)
    }
    else {
        alert('pleaseselectfolder')
    }
    rendertodos()
}


function rendertodos() {
    todolist = document.querySelector('#todolistgroup')
    todolist.innerHTML = ''
    selectedvalue = document.querySelector('.selectedfolder').textContent;
    console.log(selectedvalue)
    todoarray.forEach((element) => {
        if (element.folder === selectedvalue) {
            listitem = document.createElement('li')
            listitem.classList.add('list-group-item')
            listitem.innerText = element.description + ' ' + element.priority + ' ' + element.date
            todolist.appendChild(listitem)


        }  
    })

}