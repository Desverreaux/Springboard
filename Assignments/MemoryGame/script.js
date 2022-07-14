// const gameContainer = document.getElementById("game");

const game = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "grey",
  "brown",
  "gold",
  "cyan",
  "pink"
];


const justWin = [
  "red",
  "red",
  "red",
  "red",
  "red",
  "red"
];


const COLORS = game;

var score = 0;
var matches = 0;
var cardFirst, cardSecond;


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


let shuffledColors = shuffle([].concat(COLORS,COLORS));


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
      // create a new div
      var newCard = document.createElement("li");
      var newFront = document.createElement("div");
      var newBack = document.createElement("div");
      newCard.classList.add('card');
      newFront.classList.add('front');
      newBack.classList.add('back');
      newBack.classList.add(color);
      newCard.append(newFront);
      newCard.append(newBack);
      newCard.setAttribute("color",color);

      var Container = document.querySelector('.container');
      Container.append(newCard);

    }
  }

createDivsForColors(shuffledColors);

function win(){
  
  console.log("you WIN!");
  document.querySelector('.title').textContent = `YOU WIN!!!!`;
  document.querySelector('.score').textContent = `YOU WIN!!!!`;
}

function isMatch() {
  if(cardSecond != null) {
    score++;
    document.querySelector('.score').textContent = `GUESSES: ${score}`;

    if(cardFirst.getAttribute('color') == cardSecond.getAttribute('color')) { 
      console.log("MATCH!");
      cardFirst = null;
      cardSecond = null;
      matches++;
      if(matches == shuffledColors.length/2) {
        win();
      }
    }
    else {
      cardFirst.classList.toggle('flip');
      cardSecond.classList.toggle('flip');
      cardFirst = null;
      cardSecond = null;
      score++;    
    }
}
}

function flip(element) {
  element.classList.toggle('flip');
}

function checkClicked(element) {
  if(cardFirst == null){
    flip(element);
    cardFirst = element;
  }
  else if(cardSecond == null) {
    flip(element)
    cardSecond = element;
    setTimeout(isMatch,1000);
  }
  else {
    console.log("card flipper flopped")
  }
}

function removeCurtain(element) {
  element.remove();
}

var curtain = document.querySelector(".curtain");
var button = document.querySelector(".pushable");
button.addEventListener("click", function(event) {
  curtain.classList.add('curtainAnimation');
  setTimeout(function() {curtain.remove();}, 2000);
})

var elements = document.querySelectorAll('.card')

elements.forEach(function(element) {
  element.addEventListener("click", function(event) {
    var cardElement = event.target.closest('.card');
    if(!cardElement.classList.contains('flip')){
      checkClicked(cardElement);
    }
  })
});
