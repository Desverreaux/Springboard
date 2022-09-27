/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var DFLTWIDTH = 7; //width of the board if no specific width is specified
var DFLTHEIGHT = 6; //height of the board if no specific height is specified
var currentHeight; //height of the board on this iteration of the game
var currentWidth; //width of the board on this iteration of the game 


var currPlayer = 1; // active player: 1 (red) or 2 (yellow)
var board = []; // array of rows, each row is array of cells  (board[y][x])
var headCells = []; //array of referance to the slots on the top of the board; need so that they can be updated to show as red/yellow depending on whose turn it is 
var htmlBoard; //ref to the html board obj

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(width = DFLTWIDTH, height = DFLTHEIGHT) {
  // update the board width and height the rest of the file uses
  currentWidth = width; 
  currentHeight = height;
  // inits a 2d array of specified width and height with null values
  for (var x = 0; x < width; x++) {
    board[x] = [];
    for (var y = 0; y < height; y++) {
      board[x][y] = null;
    } 
  }
  return board;
}

//makeHtmlBoard: creates the html obj that represents the board 
function makeHtmlBoard() {
  //grabs the anchor ref of the game 
  htmlBoard = document.querySelector("#board")

  //creates the first row of the board and assigns a event to it as players insert new pieces on the top of the board 
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //feels the first row with "slots" for pieces
  for (var x = 0; x < currentWidth; x++) {
    var headCell = document.createElement("td");
    headCell.classList.add("slot"); //slot is a class used for visual formatting of the html element
    headCell.classList.add("redhover"); // (red/yellow)hover is a class used to highlight the slot as the player hovers over it 
    headCell.setAttribute("id", `slot${x}-${currentHeight - 1}`); //provides the element with a unique id based on its col and the max height of the board 
    /*
      the following line provides a unique col number for the slot so that when the
      player clicks on the element the script knows where to place a new piece. 
      In the base code this is made easier by having the id only the column number however,
      this cause some issues and this custom attribute or using regex to parse the id later in the script
      This method seemed like the simplier approach
    */
    headCell.setAttribute("col", x); 
    top.append(headCell);
  }
  
  htmlBoard.append(top);

  /*
    essentially does the previous for loop but for everyother row needed. The above code is separate to account for the unique
    functionally the first row serves. Also the y decrements so that the rows are added in the right order 

    additionally y inits as currentHeight - 2 to account for:
      A. How arrays works, i.e. how the last element in an array is indexed by the length of the array - 1
      B. The fact that the first row has already been made

    
  */
  for (var y = currentHeight - 2; y >= 0; y--) { 
    const row = document.createElement("tr");
    for (var x = 0; x < currentWidth; x++) {
      const cell = document.createElement("td");
      cell.classList.add("slot");
      /* id's had to changed from the original "x-y" to "slotx-y" as I getting an error with id's
         starting with a digit, not sure why this was happening but this seemed like an easy fix
      */
      cell.setAttribute("id", `slot${x}-${y}`);  
      row.append(cell);
    }
    htmlBoard.append(row);
  } 

  addHeadcellRef(); // adds references to the top row after they are made
}

// addHeadcellRef grabs refs the top row slots so that they can highlight with the player's colors on hover 
function addHeadcellRef() {
  HeadCells = document.querySelectorAll(".redhover"); // grabs the refs with the "redhover" class as they start with this anyways and it was easier than parsing id's
}

// placeInCol: given column x, places a piece in the lowest available slot
function placeInCol(x) {
  var y = findSpotForCol(x);
  if(y == "error") {return}  
  placeInTable(x,y);
}


// findSpotForCol: give column x returns the lowest slot in which there isn't a piece already in player, throws error is no spot is available  
function findSpotForCol(x) {
  for(let i = 0; i < currentHeight; i++) {
    if(board[x][i] == null) {
      return i;
    }
  }
  return "error"; //I recognize this is the worst way to "throw an error", i got lazy at this point 
}

// placeInTable: update DOM to place piece into HTML table of board 
function placeInTable(x, y) {
  var slot = document.querySelector(`#slot${x}-${y}`); //gets a ref to slot to place the piece
  var color = currPlayer == 1 ? "red" : "yellow";  //detemines the color of the piece based on whose turn it is
  slot.classList.add(`${color}`); //changes the color of the slot to represent the piece played
  board[x][y] = color; 
  if (checkForTie()){
    alert(`Its a tie :(`);
  }
  if (checkForWin()) { 
    alert(`Player ${currPlayer} won!`);
  }
  togglePlayer(); //changes who's turn it is 
}

// togglePlayer: changes currPlayer to the other player and adjusts to the css classes of the first row to highlight the color of the next players piece 
function togglePlayer() {
  currPlayer = currPlayer == 1 ? 2 : 1;
  HeadCells.forEach( element => {
    element.classList.toggle("redhover");
    element.classList.toggle("yellowhover");
  })
}

// handleClick: handle click of column top to play piece 
function handleClick(evt) {
  // get x from col attribue of clicked cell
  var x = evt.target.getAttribute("col");
  // place piece in board and add to HTML table
  placeIncol(x);
}

// checkForTie
function checkForTie() {
  // TODO: check if all cells in board are filled; if so call, call endGame  
  for (var y = 0; y < currentHeight; y++) {
    for (var x = 0; x < currentWidth; x++) {
      if(board[x][y] == null) {
        return false;
      }
    }
  }
  return true;
}

//checkForWin: check board cell-by-cell for "does a win start here?" 
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    // creates a string to represent the current player for the function to ref against 
    // this method was used instead recording the pieces as 1 or 2 in the board object for easier readablity during debugging 
    var player = currPlayer == 1 ? "red" : "yellow"; 

    //checks a varity of conditions for the next piece and returns true if the next piece is "valid"
    var result = cells.every(
      ([x, y]) =>
        //the next four lines checks if the next "slot" is on the board
        y >= 0 && 
        y < currentHeight &&
        x >= 0 &&
        x < currentWidth &&
        //checks if the next slot is the current players piece
        board[x][y] == player
    );
    return result; // stores the result and then returns the value instead of just returning in an effort to make debugging easier
  }

  /* 
    the next section of code checks if their are 4 pieces on the board that are the players colors
    it does this by selecting a slot on the board, 
      checking if the 3 slots to the right are all valid and checking if they contain the players pieces 
      doing the same for the 3 slots above the current slot 
      doing the same for the 3 slots above and to the right/left in a diaganal pattern  
      checking if any of the four possible winning patterns resulted in a win; if so returns true to represent a win 
    and then doing the same for each slot on the board 
  */
  for (var y = 0; y < currentHeight; y++) {
    for (var x = 0; x < currentWidth; x++) {
      var horiz = [[x, y], [x + 1, y], [x + 2, y], [x + 3, y]];
      var vert = [[x, y], [x, y + 1], [x, y + 2], [x, y + 3]];
      var diagDR = [[x, y], [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]];
      var diagDL = [[x, y], [x - 1, y + 1 ], [x - 2, y + 2], [x - 3, y + 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
