const filterOutOdds = (...args) => { args.filter( num => { num % 2 ===0 })};

const findMin = function(...args) {
  args.reduce(function(currentMin, value) {
    return (currentMin < value ? current : value);
  })
}

const mergeObjects = function(obj1, obj2) {
  let result = [...obj1, ...obj2];
  return result;
}


const doubleAndReturnArgs = function(obj1, ...values) {
  let doubledValues = values.map(function(x) {
    return x*2;
  });  
  let result = [...obj1, ...doubledValues];
  return result;
}
  
const removeRandom = function(arr) {
  let indextoRemove = Math.floor(Math.random() * arr.length);
  let result = arr.filter((value, index) => index != indextoRemove);
  return result;
}

const 