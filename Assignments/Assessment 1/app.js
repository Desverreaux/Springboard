const upperDefault = "What if...";
const lowerDefault = "we're all dead";
const urlDefault = "https://media0.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=ecf05e47js9mrw4wth932eei2eku0yd6jxkzuv5nxjnjkwa4&rid=giphy.gif&ct=g";
const defaultMemeArray = [
  {
      id : "1",
      topText: "Meme array line 1",
      url: "https://media0.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=ecf05e47js9mrw4wth932eei2eku0yd6jxkzuv5nxjnjkwa4&rid=giphy.gif&ct=g",
      bottomText: "we're all dead"
  },
  {
    id : "2",
    topText: "What who...",
    url: "https://media0.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=ecf05e47js9mrw4wth932eei2eku0yd6jxkzuv5nxjnjkwa4&rid=giphy.gif&ct=g",
    bottomText: "we're all dead"
  },
  {
    id : "3",
    topText: "What why...",
    url: "https://media0.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=ecf05e47js9mrw4wth932eei2eku0yd6jxkzuv5nxjnjkwa4&rid=giphy.gif&ct=g",
    bottomText: "we're all dead"
  },
  {
    id : "4",
    topText: "What asdfasd...",
    url: "https://media0.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=ecf05e47js9mrw4wth932eei2eku0yd6jxkzuv5nxjnjkwa4&rid=giphy.gif&ct=g",
    bottomText: "we're all dead"
  },
  {
    id : "5",
    topText: "What why...",
    url: "https://media0.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=ecf05e47js9mrw4wth932eei2eku0yd6jxkzuv5nxjnjkwa4&rid=giphy.gif&ct=g",
    bottomText: "we're all dead"
  },
  {
    id : "6",
    topText: "What why...",
    url: "https://media0.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=ecf05e47js9mrw4wth932eei2eku0yd6jxkzuv5nxjnjkwa4&rid=giphy.gif&ct=g",
    bottomText: "we're all dead"
  }
];

var MemeArray = [];

var form = document.querySelector('.form');
var saveButton = document.querySelector('#save');
var topForm = document.querySelector('#topForm');
var imageUrl = document.querySelector('#imageUrl'); 
var bottomForm = document.querySelector('#bottomForm');
var upperText = document.querySelector('#topText');
var lowerText = document.querySelector('#bottomText');
var backgroundImage = document.querySelector('#backgroundImage');
var memeStorageAnchor = document.querySelector('#memeStorageAnchor');

var meme = {id:0,topText:upperDefault,url:"",bottomText:lowerDefault};

form.addEventListener("submit", function(event) {
  event.preventDefault();
  getFormData();
  setFocusedMeme(meme);
});

saveButton.addEventListener("submit", function(event) {
  event.preventDefault();
  saveFormData();
  reloadMemes();
});

memeStorageAnchor.addEventListener("click", function(event) {
    var element = findParent(event.target);
    removeMemeFromStorage(element.id);
    reloadMemes();
})
  
var removeMemeFromStorage = function(idToRemove) {
  memeArray = JSON.parse(localStorage.getItem("memes"));  
  memeArray.forEach((Obj, index) => {
    if(Obj.id == idToRemove) {
      memeArray.splice(index,1);
    }
  });
  localStorage.setItem("memes", JSON.stringify(memeArray));
}

var findParent = function(child) {
  var node = child.parentNode;
  while (node != null) {
      if (node.classList.contains("smallContainer")) {
          return node;
      }
      node = node.parentNode;
  }
  return false;
}


var loadDefaultMemesInStorage = function(examples) {
  if(!localStorage.getItem("memes")) {
    localStorage.setItem("memes", JSON.stringify(examples));
    console.log(localStorage.getItem("memes"));
  }
}

var loadSavedMemes = function() {
  memeArray = JSON.parse(localStorage.getItem("memes"));  
  memeArray.forEach(Obj => createSavedMeme(Obj));
}


var getFormData = function() {
  //ternary ops to fill meme object with form data or default values if no form data is detected
  meme.topText = (topForm.value ? topForm.value : upperDefault);
  meme.url = (imageUrl.value ? imageUrl.value : urlDefault);
  meme.bottomText = (bottomForm.value ? bottomForm.value : lowerDefault);
  meme.id = Math.floor(Math.random() * 100000);
}


var saveFormData = function() {
  //saves the meme object to an array, then saves that array to localStorage
  memeArray = JSON.parse(localStorage.getItem("memes"));
  memeArray.push(meme);
  localStorage.setItem("memes", JSON.stringify(memeArray));
}

var setFocusedMeme = function(memeObj) {
  upperText.innerText = memeObj.topText;
  bottomText.innerText = memeObj.bottomText;
  backgroundImage.style.backgroundImage = `url(${memeObj.url})`;
}

var createSavedMeme = function(memeObj) {
  var containerElement = document.createElement("DIV");
  containerElement.classList = "smallContainer";
  containerElement.setAttribute("id",memeObj.id);
  containerElement.innerHTML = newMemeHTMLString(memeObj);
  memeStorageAnchor.append(containerElement);
}


var newMemeHTMLString = function(memeObj) {
  var string = "";
  string += `<div class="meme">\n`;
  string += `<div class="meme_img" style="background-image: url(${memeObj.url});"></div>\n`;
  string += `<div class="top text smallerText">${memeObj.topText}</div>\n`;
  string += `<div class="bottom text smallerText">${memeObj.bottomText}</div>\n`;
  string += `</div>\n`;
  
  return string;
}

var reloadMemes = function() {
  memeStorageAnchor.innerHTML = "";
  loadSavedMemes();
}

loadDefaultMemesInStorage(MemeArray);
loadSavedMemes();
