var element = document.querySelector("#centerElement");
var text = document.querySelector('h1');

var r,g,b = 0;

function func(element) {

  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);

  element.style.color = `rgb(${r},${g},${b})`;
}

// func();

setInterval(func, 1000);


// text.style.color ;
