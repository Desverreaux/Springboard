
function RandomNum() { 
  let count = 0;
  let num;
  func = setInterval(function() {
    count++;
    num = Math.random();
    if(num > 0.75) {
      console.log(count);
      clearInterval(func);
    }
  }, 1000);
};

RandomNum();