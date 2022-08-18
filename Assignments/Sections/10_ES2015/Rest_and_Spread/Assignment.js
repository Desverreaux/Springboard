const filterOutOdds = (...args) => { args.filter( num => { num % 2 ===0 })};

const findMin = function(...args) {
  args.reduce(function(currentMin, value) {
    return (currentMin < value ? current : value);
  })
}

