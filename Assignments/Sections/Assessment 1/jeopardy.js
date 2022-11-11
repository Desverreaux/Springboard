// categories is the main data structure for the app; it looks like this:
let priceStrings = ["$200","$400","$600","$800","$1000"];
//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let dataTable = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function makeHTML() {
  let documentHook = $("#container");
  for(i = 0; i <= 5; i++) {
    let element = `
    <div class="cardFormatting">
      <div class="card">
        <p class="center category"> ${dataTable[i].category}</p>
      </div>
    </div>`;
    documentHook.append(element);
  }
  for(i = 0; i <= 4; i++) { 
    for(j = 0; j <= 5; j++) {
      let element = `
      <div class="cardFormatting">
        <div data-state="0" data-answer="${dataTable[j].clues[i].answer}" class="card">
          <div class="card-front">
            <p class="center price">${priceStrings[i]}</p>
          </div>
          <div class="card-back">
            <p class="center clue">${dataTable[j].clues[i].question}</p>
          </div>
        </div>
      </div>`;
      documentHook.append(element);
    }
  }
  console.log("make html done");
}



function getQuestion(id) {
  return `<p class="center">rocks</p>`;
}

function getAnswer(id) {
  return `<p class="center">42</p>`;
}

async function changeBackSide(target) {
  //Use the below funciton to determine which side is hidden
  //let hiddenSide = (target.attr("data-state") % 2 == 0) ? target.children(".card-front") : target.children(".card-back"); 

  let back = target.children(".card-front");
  let answer = target.attr("data-answer");
  back.html(`<p class="center clue">${answer}</p>`); 
}

function getCategoryIds() {
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {


}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  //the api returns nothing if the offset is greater than number of entries it has, "10000" is number that smaller than the number of entires but large enough to facilitate randomness
  let randomOffset = Math.floor(Math.random()*10000);
  
  let response = await axios.get(
    `http://jservice.io/api/categories?count=50&offset=${randomOffset}`);

  let filteredResponse = response.data.filter(entry => entry.clues_count > 4);
  filteredResponse = _.sampleSize(filteredResponse, 6);
  
  for(i = 0; i < filteredResponse.length; i++) { 
    let obj = { 
      "category": filteredResponse[i].title,
      "clues" : []
    };
    
    let response = await axios.get(
      `http://jservice.io/api/clues?category=${filteredResponse[i].id}`);
    obj.clues = _.sampleSize(response.data, 5);
    
   dataTable.push(obj);
  }
  console.log(dataTable);
}




/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  await fillTable();
  makeHTML();

  $(".card").click(function(){
    let state = parseInt($(this).attr("data-state"));
    if(state < 2) {$(this).toggleClass("cardFlip");}
    
    //TODO: Find a way to block click events for the duration of SetTimeout
    setTimeout(() => { changeBackSide($(this)); }, 800);
  
    //Use the following line if you wish to loop through states on a cell i.e. 0,1,2,0,1,2,0....
    //let newState = (prevState != 2) ? (prevState + 1) : 0;
  
    let newState = state + 1;
    $(this).attr("data-state",newState);
  });
  
  


}

setupAndStart();


//-------------------QUESTION---------HOW DO 
//$(".card").click(function(evt){handleClick(evt.target)});


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

 function handleClick(evt) {
  console.log(this);
  $(this).toggleClass("cardFlip");
}


/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO