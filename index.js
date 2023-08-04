const apiKey = "21d0b61bb21a1374f1b66c994663ada3";

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
        carouselItem.dataset.movieId = dataImg.id;
        const imageElement = document.createElement("img");
        imageElement.classList.add("d-block");
        imageElement.src =
          "https://image.tmdb.org/t/p/w500" + dataImg.poster_path;

        carouselItem.appendChild(imageElement);
        carouselInner.appendChild(carouselItem);
      });



      carouselInner.addEventListener("click", (event) => {
        const clickedCard = event.target.closest(".carousel-item");
        if (clickedCard) {
          const movieId = clickedCard.dataset.movieId;
          openMovieDetailsPage(movieId);
        }
      })
    }
    )
    .catch((error) => {
      console.error("Error fetching data from the API:", error);
    });
}

setImageFromAPI();

let trendingMoviesLoaded = false;
let currentPage = 1;
let totalPages = 1;
let isLoading = false;
let apiRunTIme = "home"

function setTrendingFromAPI() {
  if (!trendingMoviesLoaded && !isLoading) {
    isLoading = true;
    const output = document.getElementById("trendingMovies");
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (currentPage === 1) {
          totalPages = data.total_pages;
        }
        console.log("data",data)

        const carouselInner = document.createElement("div");
        carouselInner.classList.add("video");
        output.appendChild(carouselInner);

        data.results.forEach((dataImg, index) => {
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("card", "cards");
          carouselItem.setAttribute("data-aos-duration", "10000");
          carouselItem.setAttribute("data-aos", "fade-up");

          const imageElement = document.createElement("img");
          imageElement.classList.add("card-img-top");
          if (dataImg.poster_path != null) {
            imageElement.src = "https://image.tmdb.org/t/p/w500" + dataImg.poster_path;
          } else {
            imageElement.src =
              "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
            imageElement.setAttribute("style", "height: 397px;");
          }

          const titleElement = document.createElement("h5");
          titleElement.setAttribute("type", "button");
          titleElement.classList.add("card-title");
          titleElement.textContent = dataImg.title || dataImg.name;

          // Store card Id
          carouselItem.dataset.movieId = dataImg.id;

          carouselItem.appendChild(imageElement);
          carouselItem.appendChild(titleElement);
          carouselInner.appendChild(carouselItem);
        });

        carouselInner.addEventListener("click", (event) => {
          const clickedCard = event.target.closest(".card");
          if (clickedCard) {
            const movieId = clickedCard.dataset.movieId;
            openMovieDetailsPage(movieId);
          }
        });

        isLoading = false;

        if (currentPage < totalPages) {
          currentPage++;
        }
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        isLoading = false;
      });
  }
}

let searchCurrentPage = 1;
let searchTotalPages = 1;
let searchLoading = false;
let currentPageNo
let searchInput = document.getElementById("searchInput");
function search() {
 
  if (!searchLoading && currentPageNo != searchCurrentPage) {
    searchLoading = true;
    // searchInput = document.getElementById("searchInput");
   let searchInputValue= searchInput.value
    console.log("searchInputSearchh", searchInputValue)
    let SerchPageUrl = document.getElementById("SerchPageUrl");
    SerchPageUrl.style.display = "none";

    let SerchNewspageUrl = document.getElementById("SerchNewspageUrl");
    SerchNewspageUrl.style.display = "block";
   
    const apiUrlMovie = ` https://api.themoviedb.org/3/search/movie?api_key=21d0b61bb21a1374f1b66c994663ada3&page=${searchCurrentPage}&query=${searchInputValue}`;
   
    fetch(apiUrlMovie)
      .then((response) => response.json())
      .then((data) => {

 
        console.log("data",data)
        if(data.results.length >0){
        console.log("data", data)
        if (searchCurrentPage === 1) {
          searchTotalPages = data.total_pages;
        }

        const output = document.getElementById("searchResultsMovies");
        const carouselInner = document.createElement("div");
        carouselInner.setAttribute("id", "removeId");
        carouselInner.classList.add("video");
        output.appendChild(carouselInner);

        data.results.forEach((dataImg, index) => {
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("card", "cards");
          carouselItem.setAttribute("data-aos-duration", "10000");
          carouselItem.setAttribute("data-aos", "fade-up");

          const imageElement = document.createElement("img");
          imageElement.classList.add("card-img-top");
          if (dataImg.poster_path != null) {
            imageElement.src = "https://image.tmdb.org/t/p/w500" + dataImg.poster_path;
          } else {
            imageElement.src =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy493xoTVD96DCSIssFq5-ZeNCYQsRmQanBvdNL7Zu&s";
            imageElement.setAttribute("style", "height: 397px;");
          }

          const titleElement = document.createElement("h5");
          titleElement.setAttribute("type", "button");
          titleElement.classList.add("card-title");
          titleElement.textContent = dataImg.title || dataImg.name;

          // Store card Id
          carouselItem.dataset.movieId = dataImg.id;

          carouselItem.appendChild(imageElement);
          carouselItem.appendChild(titleElement);
          carouselInner.appendChild(carouselItem);
        });

        carouselInner.addEventListener("click", (event) => {
          const clickedCard = event.target.closest(".card");
          if (clickedCard) {
            const movieId = clickedCard.dataset.movieId;
            openMovieDetailsPage(movieId);
          }
        });
        searchLoading = false

        if (searchCurrentPage < searchTotalPages) {
          searchCurrentPage++;

        }

   } })

      .catch((error) => {
        console.error("Error fetching data:", error);
        searchLoading = false;
      });
    currentPageNo = searchCurrentPage
    apiRunTIme = "search"
  }
}


function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    if (apiRunTIme == "home") {
      setTrendingFromAPI();
    } else {
      search()
    }
  }
}


function remove() {

  // searchInput = document.getElementById("searchInput");
  searchInput.value = ""
  console.log("searchInput", searchInput.value)
  currentPageNo = 0
  searchLoading = false;
  // const element = document.getElementById("removeId");
  // element.remove();
  let SerchPageUrl = document.getElementById("SerchPageUrl");
  SerchPageUrl.style.display = "block";
  let SerchNewspageUrl = document.getElementById("SerchNewspageUrl");
  SerchNewspageUrl.style.display = "none"

}


window.addEventListener("scroll", handleScroll);
document.addEventListener("DOMContentLoaded", () => {
  setTrendingFromAPI();
});

function openMovieDetailsPage(movieId) {
  const url = `movieDetails.html?movieId=${movieId}`;
  window.open(url, "_self");
}
