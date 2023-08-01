function getMovieId(){
  const urlmovieId = new URLSearchParams(window.location.search);
  // const movieId = urlmovieId.get("movieId");
  return urlmovieId.get("movieId");
  // if (movieId ) {
  //   showMovieDetails(movieId);
  // }
}
function showMovieDetails() {
  const movieId = getMovieId();
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=21d0b61bb21a1374f1b66c994663ada3&append_to_response=credits,videos`
  )
    .then((response) => response.json())
    .then((movie) => {
      const moviePoster = document.querySelector('.movie-poster img');
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      moviePoster.alt = movie.title;

      const movieTitle = document.getElementById('movieTitle');
      movieTitle.textContent = movie.title;

      const releaseDate = document.getElementById('releaseDate');
      releaseDate.textContent = `Release Date: ${movie.release_date}`;

      const genres = document.getElementById('genres');
      genres.textContent = `Genres: ${movie.genres.map((genre) => genre.name).join(', ')}`;

      const runtime = document.getElementById('runtime');
      runtime.textContent = `Runtime: ${movie.runtime} minutes`;

      const overview = document.getElementById('overview');
      overview.textContent = `Overview: ${movie.overview}`;

      const director = document.getElementById('director');
      const directorInfo = movie.credits.crew.find((person) => person.job === 'Director');
      if (directorInfo) {
        director.textContent = `Director: ${directorInfo.name}`;
      } else {
        director.textContent = 'Director: Not available';
      }

      fetchMovieCast(movie.credits.cast);
    })
    .catch((err) => console.error(err));
}


// function showMovieDetails() {
//  const movieId= getMovieId()
//   fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}?api_key=21d0b61bb21a1374f1b66c994663ada3&append_to_response=credits,videos`
//   )
//     .then((response) => response.json())
// .then((movie) => {
//   // console.log("movie",movie)
//   const moviePoster = document.querySelector('.movie-poster img');
//   moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

//   moviePoster.alt = movie.title;

//   const movieTitle = document.getElementById('movieTitle');
//   movieTitle.textContent = movie.title;

//   const releaseDate = document.getElementById('releaseDate');
//   releaseDate.textContent = `Release Date: ${movie.release_date}`;

//   const genres = document.getElementById('genres');
//   genres.textContent = `Genres: ${movie.genres.map(genre => genre.name).join(', ')}`;

//   const runtime = document.getElementById('runtime');
//   runtime.textContent = `Runtime: ${movie.runtime} minutes`;


//   const overview = document.getElementById('overview');
//   overview.textContent = `Overview: ${movie.overview}`;

//   const director = document.getElementById('director');
//   const directorInfo = movie.credits.crew.find(person => person.job === 'Director');
//   if (directorInfo) {
//     director.textContent = `Director: ${directorInfo.name}`;
//   } else {
//     director.textContent = 'Director: Not available';
//   }

//   fetchMovieCast(movie.credits.cast);
// })
// .catch(err => console.error(err));
// }


function fetchMovieCast(cast) {
  const castList = document.getElementById('castList');

    cast.forEach(actor => {
      if (!actor.profile_path) {
          return; 
      }

    const card = document.createElement('div');
    card.classList.add('castCard', 'cast-card', 'mb-3');

    const castImage = document.createElement('img');
    castImage.src = `https://image.tmdb.org/t/p/w200${actor.profile_path}`;
    castImage.alt = actor.name;
    castImage.classList.add('cast-image');

    const cardBody = document.createElement('div');
    cardBody.classList.add('castBody');

  
    const castName = document.createElement('h6');
    castName.textContent = actor.name;
    castName.classList.add('cast-title');
    cardBody.appendChild(castName);

    card.appendChild(castImage);
    card.appendChild(cardBody);

    castList.appendChild(card);
  });

}

showMovieDetails();

