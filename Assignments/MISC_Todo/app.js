//init some element selections
var todoList = document.querySelector("#todo");
var newTaskbutton = document.querySelector("form");


var createDeleteButton = function() {
  var deleteButton = document.createElement("div");
  deleteButton.classList = "deleteButton";
  deleteButton.innerHTML = `<img class=\"center\" src=\"delete.png\" height=\"20px\">`
  return deleteButton;
}

var addNewTask = function(content, doAppend) {
  var newTask = document.createElement("LI");
  var taskContent = document.createElement("DIV");

  newTask.classList = "item";
  taskContent.classList = "test";
  taskContent.textContent = content;
  newTask.append(taskContent);
  newTask.append(createDeleteButton());

  if(doAppend == true) {
    todoList.append(newTask);
  }
  else {
    todoList.prepend(newTask);
  }
}

//functions to save/load from local storage--------------------
var saveNewTask = function(content) {
  var arr = JSON.parse(localStorage.getItem("tasks"));
  arr.push(content);
  localStorage.setItem("tasks", JSON.stringify(arr));
}

var setExampleTasks = function() {  
  var tasks = ["profit","???","pet dog","get dog"];
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

var populateTasks = function() {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(entry => addNewTask(entry));
}
//-------------------------------------------------------------


//functions to add event listeners-----------------------------
newTaskbutton.addEventListener("submit", function(event){
  event.preventDefault();
  var newTask = event.target.firstElementChild.value;
  addNewTask(newTask);
  saveNewTask(newTask);
  event.target.firstElementChild.value = "";
});


// todoList.addEventListener("mouseover", function(event){
// if (event.target.tagName === "LI" && event.target.id != "newItem") {
//   event.target.classList.add("hover");
// }
// if (event.target.tagName === "DIV") {
//   event.target.parent.classList.add("hover");
// }
// });

// todoList.addEventListener("mouseout", function(event){
//   if (event.target.tagName === "LI" && event.target.id != "newItem") {
//     event.target.classList.remove("hover");
//   }
// }); 

todoList.addEventListener("click", function(event){
  if (event.target.tagName === "LI") {
    var target = event.target.querySelector('.test');
    target.classList.toggle("done"); 
    target.nextSibling.classList.toggle("visable");
  }
  else if (event.target.parentElement.tagName === "LI") {
    var target = event.target.querySelector('.test');
    event.target.classList.toggle("done"); 
    event.target.nextSibling.classList.toggle("visable");
  }
  else if (event.target.tagName === "IMG") {

    event.target.closest('.item').remove();
  }

}); 
//-------------------------------------------------------------

setExampleTasks();
populateTasks();