function countdown(num) {
  func = setInterval(function() {
    num--;
    console.log(num);
    if(num <= 1) {
      console.log("\"Done!\"")
      clearInterval(func);
    }
  }, 1000);
};

countdown(4);