"use strict";

const MISSING_IMAGE = "http://tinyurl.com/missing-tv";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(query) {

  // console.log(query);

  let response = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${query}`);

  
  let target = response.data[0].show;
  
  console.log(target);
  
  let showData = response.data.map(result => {
    let target = result.show;
    return {
        id: target.id,
        name: target.name,
        summary: target.summary,
        image: target.image ? target.image.medium : MISSING_IMAGE 
      }
  });

  return showData; 

}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
      <div class="card" data-show-id="${show.id}">
        <img class="card-img-top" src="${show.image}">
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">${show.summary}</p>
          <button class="btn btn-primary get-episodes">Episodes</button>
        </div>
      </div>  
    </div>
   `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) { 

  let response = await axios.get(
    `http://api.tvmaze.com/shows/${id}/episodes`);

  let data = response.data;

  let result = data.map((episode) => {
    return {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
    }
  });

return result;

}

/** Getepisodesofshow works similar to searchshows, it simply makes the approperiate api request and maps the response to an object */



function populateEpisodes(episodes) { 
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  for (let episode of episodes) {
    let $item = $(
      `<li>
         ${episode.name}
         (season ${episode.season}, episode ${episode.number})
       </li>
      `);

    $episodesList.append($item);
  }

  $("#episodes-area").show();
}


$("#shows-list").on("click", ".get-episodes", async function handleEpisodeClick(evt) {
  let showId = $(evt.target).closest(".Show").data("show-id");
  let episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
});
