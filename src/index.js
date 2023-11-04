console.log("supmmmmmmmm");
window.onload = () => {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
    folderarray = [];
    todoarray = [];
    savetolocalstorage(todoarray, folderarray);
    localStorage.setItem("hasCodeRunBefore", true);
  }
};
retrievefromlocalstorage();
startupfolders();
let selectedfolder = "";
const createfolderbutton = document.querySelector("#createfolderbutton");
createfolderbutton.addEventListener("click", FolderCreation);
const deletefolderbutton = document.querySelector("#deletefolderbutton");
deletefolderbutton.addEventListener("click", deletefolder);
const createtodobutton = document.querySelector("#createtodobutton");
createtodobutton.addEventListener("click", TodoCreation);
const deletetodobutton = document.querySelector("#deletetodobutton");
deletetodobutton.addEventListener("click", deletetodo);
function FolderScreenCreation() {
  foldername = document.querySelector("#foldernameinput").value;
  folderitem = document.createElement("li");
  folderitem.classList.add("list-group-item", foldername);
  folderitem.innerText = foldername;
  folderlist.appendChild(folderitem);
  folderitem.addEventListener("click", highlightfolder);

  document.querySelector("#foldernameinput").value = "";
  savetolocalstorage(todoarray, folderarray);
}
function FolderCreation() {
  foldername = document.querySelector("#foldernameinput").value;
  console.log(foldername);
  console.log(folderarray);
  if (folderarray.includes(foldername) === true) {
    alert("Folder with that name already exists");
  } else if (foldername != null) {
    folderarray.push(foldername);
    FolderScreenCreation();
  } else {
    alert("Must be at least one character");
  }
}

function highlightfolder(e) {
  oldselected = document.querySelector(".selectedfolder");
  if (oldselected != null) {
    oldselected.classList.remove("selectedfolder");
  }
  e.target.classList.add("selectedfolder");
  d = document.querySelector("#deletefolderbutton");
  d.classList.remove("hidden");
  dt = document.querySelector("#deletetodobutton");
  dt.classList.add("hidden");
  rendertodos();
}

function deletefolder(e) {
  d = document.querySelector("#deletefolderbutton");
  selected = document.querySelector(".selectedfolder");
  console.log(folderarray);
  console.log(selected.innerText);
  folderarray.forEach((element, index) => {
    if (element === selected.innerText) {
      folderarray.splice(index, 1);
    }
  });
  tododomlist = document.querySelector("#todolistgroup");
  tododomlist.innerHTML = "";
  todoarray = todoarray.filter((item) => item.folder != selected.innerText);
  folderlist = document.querySelector("#folderlistgroup");
  selected.remove();
  d.classList.add("hidden");
  todolist = document.querySelector("#todolistgroup");
  todolist.innerHTML = "";
  savetolocalstorage();
}
function TodoCreation() {
  selectedfolder = document.querySelector(".selectedfolder");
  if (selectedfolder != null) {
    function TodoObject() {
      this.description = document.querySelector("#tododescription").value;
      this.priorityvalue = document.querySelector("#priorityselect").value;
      this.priority =
        document.querySelector("#priorityselect").options[
          this.priorityvalue
        ].text;
      this.date = document.querySelector("#dateselect").value;
      this.folder = document.querySelector(".selectedfolder").textContent;
      console.log();
    }
    a = new TodoObject();
    if (todoarray.length != 0 && a.date != "") {
      for (let i = 0; i < todoarray.length; i++) {
        if (
          a.folder === todoarray[i].folder &&
          a.description === todoarray[i].description
        ) {
          alert("Todo already posted!");
          break;
        } else if (i === todoarray.length - 1) {
          todoarray.push(a);
          savetolocalstorage(todoarray, folderarray);
          break;
        }
      }
    } else if (a.date != "") {
      todoarray.push(a);
      savetolocalstorage(todoarray, folderarray);
    }

    console.log(todoarray);
  } else {
    alert("pleaseselectfolder");
  }
  rendertodos();
}
function highlighttodos(e) {
  oldselected = document.querySelector(".selectedtodo");
  if (oldselected != null) {
    oldselected.classList.remove("selectedtodo");
  }
  e.target.classList.add("selectedtodo");
  d = document.querySelector("#deletetodobutton");
  d.classList.remove("hidden");
}
function deletetodo() {
  selectedtodo = document.querySelector(".selectedtodo");
  folderarray.forEach((element, index) => {
    if (element === selectedtodo.innerText) {
      folderarray.splice(index, 1);
    }
  });
  selectedtodo.remove();
  d = document.querySelector("#deletetodobutton");
  d.classList.add("hidden");
}

function rendertodos() {
  todolist = document.querySelector("#todolistgroup");
  todolist.innerHTML = "";
  selectedvalue = document.querySelector(".selectedfolder").textContent;
  console.log(selectedvalue);
  todoarray.forEach((element) => {
    if (element.folder === selectedvalue) {
      listitem = document.createElement("li");
      listitem.classList.add("list-group-item");
      listitem.addEventListener("click", highlighttodos);
      listitem.innerText =
        element.description + " " + element.priority + " " + element.date;
      todolist.appendChild(listitem);
    }
  });
}

function savetolocalstorage(todoarray, folderarray) {
  localStorage.setItem("todoarray", JSON.stringify(todoarray));
  localStorage.setItem("folderarray", JSON.stringify(folderarray));
}
function retrievefromlocalstorage() {
  try {
    todoarray = JSON.parse(localStorage.getItem("todoarray"));
    folderarray = JSON.parse(localStorage.getItem("folderarray"));
  } catch {
    return true;
  }
}

function startupfolders() {
  folderarray.forEach((element) => {
    foldername = element;
    folderitem = document.createElement("li");
    folderitem.classList.add("list-group-item");
    folderitem.innerText = foldername;
    folderlist.appendChild(folderitem);
    folderitem.addEventListener("click", highlightfolder);
  });
}
