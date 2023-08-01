function setImageFromAPI() {
  let output = document.getElementById("carouselExampleSlidesOnly");
  fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=21d0b61bb21a1374f1b66c994663ada3"
  )
    .then((response) => response.json())
    .then((data) => {
      const carouselInner = output.querySelector(".carousel-inner");
      let dataThree = data.results.slice(0, 3);
      // console.log("dataThree",dataThree)
      dataThree.forEach((dataImg, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
          carouselItem.classList.add("active");
        }

        const imageElement = document.createElement("img");
        imageElement.classList.add("d-block");
        imageElement.src =
          "https://image.tmdb.org/t/p/w500" + dataImg.poster_path;

        carouselItem.appendChild(imageElement);
        carouselInner.appendChild(carouselItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data from the API:", error);
    });
}

setImageFromAPI();

let trendingMoviesLoaded = false;

function setTrendingFromAPI() {
  if (!trendingMoviesLoaded) {
    trendingMoviesLoaded = true; // Set the flag to prevent multiple calls

    const output = document.getElementById("trendingMovies");
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=21d0b61bb21a1374f1b66c994663ada3"
    )
      .then((response) => response.json())
      .then((data) => {
        const carouselInner = document.createElement("div");
        carouselInner.classList.add("video");
        output.appendChild(carouselInner);

        data.results.forEach((dataImg, index) => {
          fetch(
            `https://api.themoviedb.org/3/movie/${dataImg.id}?api_key=21d0b61bb21a1374f1b66c994663ada3`
          )
            .then((response) => response.json())
            .then((dataOnePage) => {
              const carouselItem = document.createElement("div");
              carouselItem.classList.add("card", "cards");
              carouselItem.setAttribute("data-aos-duration", "10000");
              carouselItem.setAttribute("data-aos", "fade-up");

              const imageElement = document.createElement("img");
              imageElement.classList.add("card-img-top");
              if (dataOnePage.poster_path != null) {
                imageElement.src =
                  "https://image.tmdb.org/t/p/w500" + dataOnePage.poster_path;
              } else {
                imageElement.src =
                  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
                imageElement.setAttribute("style", "height: 397px;");
              }

              const titleElement = document.createElement("h5");
              titleElement.setAttribute("type", "button");
              titleElement.classList.add("card-title");
              titleElement.textContent = dataOnePage.title || dataOnePage.name;

              // Store the movieId as a data attribute on the card
              carouselItem.dataset.movieId = dataOnePage.id;

              carouselItem.appendChild(imageElement);
              carouselItem.appendChild(titleElement);
              carouselInner.appendChild(carouselItem);
            });
        });

        carouselInner.addEventListener("click", (event) => {
          const clickedCard = event.target.closest(".card");
          if (clickedCard) {
            const movieId = clickedCard.dataset.movieId;
            openMovieDetailsPage(movieId);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTrendingFromAPI();
});

function openMovieDetailsPage(movieId) {
  const url = `movieDetails.html?movieId=${movieId}`;
  window.open(url, "_blank");
}

setTrendingFromAPI();

function showMovieDetails(movieId) {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=21d0b61bb21a1374f1b66c994663ada3`
  )
    .then((response) => response.json())
    .then((data) => {
      // Create the movie details page
      const movieDetailsPage = document.createElement("div");
      movieDetailsPage.classList.add("movie-details");

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
      movieDetailsPage.appendChild(posterElement);

      const titleElement = document.createElement("h1");
      titleElement.classList.add("movie-title");
      titleElement.textContent = data.title || data.name;
      movieDetailsPage.appendChild(titleElement);

      const overviewElement = document.createElement("p");
      overviewElement.classList.add("movie-overview");
      overviewElement.textContent = data.overview;
      movieDetailsPage.appendChild(overviewElement);

      document.body.appendChild(movieDetailsPage);
    })
    .catch((error) => {
      console.error("Error fetching movie details from the API:", error);
    });
}

setTrendingFromAPI();

function search() {
  const searchInput = document.getElementById("searchInput").value;

  let SerchPageUrl = document.getElementById("SerchPageUrl");
  SerchPageUrl.style.display = "none";

  let SerchNewspageUrl = document.getElementById("SerchNewspageUrl");
  SerchNewspageUrl.style.display = "block";
  let searchValue = document.getElementById("searchValue");

  const carouselInner = searchValue.querySelector(".d-flesed");

  const carouselItem = document.querySelector("#searchInputNew");
  carouselItem.setAttribute("value", searchInput);
  carouselInner.appendChild(carouselItem);

  const apiUrlMovie = ` https://api.themoviedb.org/3/search/movie?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;

  fetch(apiUrlMovie)
    .then((response) => response.json())
    .then((data) => {
      displayResultsMovie(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const apiUrlKeyword = ` https://api.themoviedb.org/3/search/keyword?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
  fetch(apiUrlKeyword)
    .then((response) => response.json())
    .then((data) => {
      displayResultskeyword(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const apiUrlPerson = ` https://api.themoviedb.org/3/search/person?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
  fetch(apiUrlPerson)
    .then((response) => response.json())
    .then((data) => {
      // console.log("data", data);
      displayResultsPerson(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const apiUrlCompany = `https://api.themoviedb.org/3/search/company?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
  fetch(apiUrlCompany)
    .then((response) => response.json())
    .then((data) => {
      displayResultsCompany(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const apiUrlTV = `https://api.themoviedb.org/3/search/tv?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
  fetch(apiUrlTV)
    .then((response) => response.json())
    .then((data) => {
      displayResultsTV(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const apiUrlNetwork = `https://api.themoviedb.org/3/search/multi?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
  fetch(apiUrlNetwork)
    .then((response) => response.json())
    .then((data) => {
      displayResultsNetwork(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const apiUrlCollection = `https://api.themoviedb.org/3/search/collection?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
  fetch(apiUrlCollection)
    .then((response) => response.json())
    .then((data) => {
      displayResultsCollection(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayResultsNetwork(results) {
  const searchResultsContainer = document.getElementById("dataNetwork");
  searchResultsContainer.classList.add("card", "border");
  searchResultsContainer.innerHTML = "";
  if (results.length > 0) {
    results.forEach((result) => {
      let srcImg;
      if (result.poster_path != null) {
        srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path;
      } else {
        srcImg =
          "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
      }
      const resultElement = document.createElement("div");
      resultElement.classList.add("image-container");
      resultElement.innerHTML = `<img  style="width: 106px;" src=${srcImg}>
      <div class="text-overlay">
        <p>${result.title}</p>
        <p>${result.release_date}</p>
        <p>${result.overview}</p>
      </div>`;
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `
    <div class="text-overlay">
      <p class ="text-p">There are no Network that matched your query.</p>
    </div>`;
    searchResultsContainer.appendChild(resultElement);
  }
}
function displayResultsTV(results) {
  const searchResultsContainer = document.getElementById("dataTvShow");
  searchResultsContainer.classList.add("card", "border");
  searchResultsContainer.innerHTML = "";
  if (results.length > 0) {
    results.forEach((result) => {
      let srcImg;
      if (result.poster_path != null) {
        srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path;
      } else {
        srcImg =
          "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
      }
      const resultElement = document.createElement("div");
      resultElement.classList.add("image-container");
      resultElement.innerHTML = `<img  style="width: 106px;" src=${srcImg}>
      <div class="text-overlay">
        <p>${result.title}</p>
        <p>${result.release_date}</p>
        <p>${result.overview}</p>
      </div>`;
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `
    <div class="text-overlay">
      <p v>There are no TV that matched your query</p>
    </div>`;
    searchResultsContainer.appendChild(resultElement);
  }
}

function displayResultsMovie(results) {
  const searchResultsContainer = document.getElementById("datausing");
  searchResultsContainer.classList.add("card");
  searchResultsContainer.innerHTML = "";
  if (results.length > 0) {
    results.forEach((result) => {
      let srcImg;
      if (result.poster_path != null) {
        srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path;
      } else {
        srcImg =
          "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
      }
      const resultElement = document.createElement("div");
      resultElement.classList.add("image-container");
      resultElement.innerHTML = `<img  style="width: 106px;" src=${srcImg}>
      <div class="text-overlay">
        <p>${result.title}</p>
        <p>${result.release_date}</p>
        <p>${result.overview}</p>
      </div>`;
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `
    <div class="text-overlay">
      <p class ="text-p">There are no Movie that matched your query</p>
    </div>`;
    searchResultsContainer.appendChild(resultElement);
  }
}
function displayResultsPerson(results) {
  const searchResultsContainer = document.getElementById("dataPeople");
  searchResultsContainer.classList.add("card", "border");
  searchResultsContainer.innerHTML = "";
  if (results.length > 0) {
    results.forEach((result) => {
      let srcImg;
      if (result.poster_path != null) {
        srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path;
      } else {
        srcImg =
          "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
      }
      const resultElement = document.createElement("div");
      resultElement.classList.add("image-container");
      resultElement.innerHTML = `<img  style="width: 106px;" src=${srcImg}>
      <div class="text-overlay">
        <p>${result.title}</p>
        <p>${result.release_date}</p>
        <p>${result.overview}</p>
      </div>`;
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `
    <div class="text-overlay">
      <p class ="text-p">There are no Person that matched your query</p>
    </div>`;
    searchResultsContainer.appendChild(resultElement);
  }
}

function displayResultskeyword(results) {
  const searchResultsContainer = document.getElementById("datausingkeyword");
  searchResultsContainer.classList.add("card", "border");
  searchResultsContainer.innerHTML = "";
  if (results.length > 0) {
    results.forEach((result) => {
      let srcImg;
      if (result.poster_path != null) {
        srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path;
      } else {
        srcImg =
          "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
      }
      const resultElement = document.createElement("div");
      resultElement.classList.add("image-container");
      resultElement.innerHTML = `<img  style="width: 106px;" src=${srcImg}>
      <div class="text-overlay">
        <p>${result.title}</p>
        <p>${result.release_date}</p>
        <p>${result.overview}</p>
      </div>`;
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `
    <div class="text-overlay">
      <p class ="text-p">There are no keywords that matched your query.</p>
    </div>`;
    searchResultsContainer.appendChild(resultElement);
  }
}

function displayResultsCollection(results) {
  const searchResultsContainer = document.getElementById("datacollection");
  searchResultsContainer.classList.add("card", "border");
  searchResultsContainer.innerHTML = "";
  if (results.length > 0) {
    results.forEach((result) => {
      let srcImg;
      if (result.poster_path != null) {
        srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path;
      } else {
        srcImg =
          "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
      }
      const resultElement = document.createElement("div");
      resultElement.classList.add("image-container");
      resultElement.innerHTML = `<img  style="width: 106px;" src=${srcImg}>
      <div class="text-overlay">
        <p>${result.title}</p>
        <p>${result.release_date}</p>
        <p>${result.overview}</p>
      </div>`;
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `
    <div class="text-overlay">
      <p class ="text-p">There are no collection that matched your query</p>
    </div>`;
    searchResultsContainer.appendChild(resultElement);
  }
}

function displayResultsCompany(results) {
  const searchResultsContainer = document.getElementById("datacompany");
  searchResultsContainer.classList.add("card", "border");
  searchResultsContainer.innerHTML = "";
  if (results.length > 0) {
    results.forEach((result) => {
      let srcImg;
      if (result.poster_path != null) {
        srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path;
      } else {
        srcImg =
          "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
      }
      const resultElement = document.createElement("div");
      resultElement.classList.add("image-container");
      resultElement.innerHTML = `<img  style="width: 106px;" src=${srcImg}>
      <div class="text-overlay">
        <p>${result.title}</p>
        <p>${result.release_date}</p>
        <p>${result.overview}</p>
      </div>`;
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `
    <div class="text-overlay">
      <p class ="text-p">There are no company that matched your query</p>
    </div>`;
    searchResultsContainer.appendChild(resultElement);
  }
}

function openTabs(evt, tabsName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabsName).style.display = "block";
  evt.currentTarget.className += " active";
  search();
}