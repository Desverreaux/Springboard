let priceStrings = ["$200","$400","$600","$800","$1000"]; //holds strings for the prices of each question, is set up for simplicity of makeHTML code 
let dataTable = []; //dataTable is the main object for holding the categories, questions, and answers, an example of its sturcture is seen below 

// categories is the main data structure for the app; it looks like this:
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

/** Fill the data table object with the categories,questions, and objects */
 async function fillTable() {
  //the api returns nothing if the offset is greater than number of entries it has, "10000" is number that smaller than the number of entires but large enough to facilitate randomness
  let randomOffset = Math.floor(Math.random()*10000);
  
  /** api call to get 50 categories at a random offset, these categories have the following structure 
  [
    {
     "id": 64,
     "title":"politics",
     "clues_count":35
    },
    ....
  ]
  - categories returned do not contain the clues which is made in a separate api call later
  - 50 categories are requested as some categories contain incomplete data, these are filtered out in the next step, and 50 is chosen as it is a large enough number such that you can reasonably assume there will at least 5 good entries
  **/
  let response = await axios.get(
    `http://jservice.io/api/categories?count=50&offset=${randomOffset}`);

  //removes any categories with less than 5 clues, as the data set has several entries that has no questions or very fex  
  let filteredResponse = response.data.filter(entry => entry.clues_count > 4);
  //randomly selects 6 categories from the safe list of entries
  filteredResponse = _.sampleSize(filteredResponse, 6);

  //gets the questions and answers for each category and pushes them onto the data table object 
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
  //console.log(dataTable);
}

/** makeHTML generates the board and fills each 'card' with the approperiate data
 *  - cards are used to facilitate a specific animation when a entry is selected 
 *  - CSS grids are used so ordering the elements hierachially is unnessecary 
 *  **/
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

//changeBackSide changes the content on the backside of the card while it is hidden
//this functionallity is needed as each cell can have 3 possible states (price,question,answer) and only two sides to fill the content at creation 
//always changes to the answer of cell as the states only progress in one direction, i.e the third side will only ever be the answer 
async function changeBackSide(target) {
  //Use the below funciton to determine which side is hidden
  //let hiddenSide = (target.attr("data-state") % 2 == 0) ? target.children(".card-front") : target.children(".card-back"); 

  let back = target.children(".card-front");
  let answer = target.attr("data-answer");
  back.html(`<p class="center clue">${answer}</p>`); 
}



/**shows the loading spinner*/
function showLoadingView() {
  $("#spin-container").toggle();
}

/** Remove the loading spinner and update the button used to fetch data. */
function hideLoadingView() {
  $("#spin-container").hide();
  $("#start").text("Restart");
}

/** Wipe the current Jeopardy board */
function clearBoard() {
  $("#container").empty();
  dataTable = [];
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * - creates the click events 
 * 
 * */

async function setupAndStart() {
  showLoadingView();

  clearBoard();

  await fillTable();

  hideLoadingView();

  makeHTML();

  handleClicks();
}


/** Handle clicking on a clue: show the question or answer.
 * - uses throttle to ensure that the card isn't changed back to its original side before the content on its back side is replaced with the answer 
 * - uses data-state attr to determine what side the card is currently on
 * - always progresses to the next state price -> question -> answer 
 * - functionally does nothing if the card is already on the answer
 */

 function handleClicks() {
  $(".card").click(_.throttle(function(evt){
    let state = parseInt($(this).attr("data-state"));
    if(state < 2) {$(this).toggleClass("cardFlip");}
    
    setTimeout(() => { changeBackSide($(this)); }, 800);
  
    //Use the following line if you wish to loop through states on a cell i.e. 0,1,2,0,1,2,0....
    //let newState = (prevState != 2) ? (prevState + 1) : 0;
  
    let newState = state + 1;
    $(this).attr("data-state",newState);
  }, 800, { 'trailing': false }));
}

//hides the spinner in jquery as opposed to doing so css 
$("#spin-container").hide();
//attaches the start up function to the start button
$("#start").click(function() {
  setupAndStart();
})


