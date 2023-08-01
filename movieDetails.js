function showMovieDetails(movieId) {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=21d0b61bb21a1374f1b66c994663ada3`
  )
    .then((response) => response.json())
    .then((data) => {
      const movieDetailsContainer = document.getElementById("movieDetails");

      const posterElement = document.createElement("img");
      posterElement.classList.add("movie-poster");
      if (data.poster_path != null) {
        posterElement.src =
          "https://image.tmdb.org/t/p/w500" + data.poster_path;
      } else {
        posterElement.src =
          "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
        posterElement.setAttribute("style", "height: 300px");
      }
      movieDetailsContainer.appendChild(posterElement);

      const titleElement = document.createElement("h1");
      titleElement.classList.add("movie-title");
      titleElement.textContent = data.title || data.name;
      movieDetailsContainer.appendChild(titleElement);

      const overviewElement = document.createElement("p");
      overviewElement.classList.add("movie-overview");
      overviewElement.textContent = data.overview;
      movieDetailsContainer.appendChild(overviewElement);
    })
    .catch((error) => {
      console.error("Error fetching movie details from the API:", error);
    });
}

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");

if (movieId) {
  showMovieDetails(movieId);
}
