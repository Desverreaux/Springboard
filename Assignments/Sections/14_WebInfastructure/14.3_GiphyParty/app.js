let DFLTurl = "https://media3.giphy.com/media/aDS4z67KKaumbMVanT/200w.gif?cid=ecf05e47uy9fqtqbm0l1tirvvkwjxjpor6kgeidgrx2ii3j0&amp;rid=200w.gif&amp;ct=g"


function attachEvents() {
  $("#add").on('click', function() { 
    let searchTerm = grabSearchField();
    searchGiphy(searchTerm);
  });
  $("#remove").on('click', function() {
    removeImages();
  });
  $('#search').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('input[name = add]').click();
       return false;  
     }
   });   
}

function addImage(url = DFLTurl) {
  let img = document.createElement('img');
  img.src = url;
  $("#images").append(img);
}

function grabSearchField() {
  let searchTerm = $("#search").val();
  return searchTerm;
}

function searchGiphy(searchTerm) {
  axios({
    method: 'get',
    url: `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
  })
    .then(res => {
      addImage(res.data.data[0].images.original.url);
      console.log(res.data.data[0].images.original);
    })
    .catch(err => console.error(err));

}

function removeImages() {
  $("#images img").remove();
}

attachEvents();