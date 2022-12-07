function partyMessage() {
  $(document).ready(function() {
    console.log("Let's get ready to party with JQuery")
  });
}

function centerImg() {
  $("article img").addClass("image-center");
}

function removeLastParagraph() {
  $("article p").last().remove();
}

function randomTitleSize() {
  let fontSize = Math.floor(Math.random() * 100);
  $("#title").css('fontSize',fontSize);
}

function newListItem() {
  $("ol").append("<li> whatever you want </li>");
}

function replaceMistake() {
  let apology = document.createElement("p");
  let text = document.createTextNode("I apologise for making this list I acknowledge that it was stupid I want to assure you that I've learned from my actions and will do better.");
  apology.append(text);
  $("aside").children().remove();
  $("aside").append(apology);
}

function UpdateBackground() {
 let red = $("input").eq(0).val();
 let blue = $("input").eq(1).val();
 let green = $("input").eq(2).val();
 $("body").css("backgroundColor", `rgb(${red},${green},${blue})`);
}

function removeImage() {
  $("img").remove();
}

function attachEvents() {
  $("input").on('input', function() {
    UpdateBackground();
  });
  $("img").on('click', function() {
    removeImage();
  });
}

attachEvents();