function MouseMapping() {
  var body = document.querySelector("body");  
  var red,green = "";
  document.addEventListener('mousemove', function(event) {
    red = (Math.abs(event.screenX)/window.innerWidth) * 255;
    green = (Math.abs(event.screenY)/window.innerHeight) * 255;


    body.style.backgroundColor = `rgb(${red}, 0 ,${green})`;
    console.log(event.screenX);
  });
}








function RandomColors() {
  var element = document.querySelector("#centerElement");
  var text = document.querySelector('h1');

  var r,g,b = 0;

  function func(element) {

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    element.style.color = `rgb(${r},${g},${b})`;
  }


  setInterval(func, 1000);
}



MouseMapping();