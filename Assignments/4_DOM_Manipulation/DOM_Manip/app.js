//ill just make function to do each of the requested asked so it can be called from the console, func1 for question 1 and so on 


const func1 = function() {
  return document.getElementById("container");
}

const func2 = function() {
  return document.querySelector("#container");
}

const func3 = function() {
  return document.querySelectorAll(".second");
}

const func4 = function() {
  return document.querySelector("ol > .third ");
}

const func5 = function() {
  var newElement = document.querySelector("#container");
  newElement.textContent = "Hello!";
  return newElement;   
}

const func6 = function() {
  var element = document.querySelector("div.footer");
  element.classList.add("main");
  return element;
}

const func7 = function() {
  var element = document.querySelector("div.footer");
  element.classList.remove("main");
  return element;
}

const func8 = function() {
  var element = document.createElement("li");
  return element;
}

const func9 = function() {
  var element = document.createElement("li");
  element.innerText = "four";
  return element;
}

const func10 = function() {
  var parent = document.querySelector("ul");
  var element = document.createElement("li");
  element.innerText = "four";
  parent.append(element);
  return parent;
}

const func11 = function() {
  var liElements = document.querySelectorAll("ol>li");
  liElements.forEach(function (element){
    element.style.backgroundColor = "green";
  });
  return liElements;
}

const func12 = function() {
  var element = document.querySelector(".footer");
  try {
    element.remove();
  } catch (error) {
      body.removeChild(element);
  }
  return "its gone now"
}
