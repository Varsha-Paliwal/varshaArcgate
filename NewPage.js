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
        imageElement.classList.add("d-block", "w-100");
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

function setTrendingromAPI() {
  const output = document.querySelector(".Trending");
  fetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=21d0b61bb21a1374f1b66c994663ada3"
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log("data", data);
      const carouselInner = output.querySelector(".video");
      data.results.forEach((dataImg, index) => {
        const carouselItem = document.createElement("div");
        // console.log("dataImg.id", dataImg.id);
        //   carouselItem.classList.add('card','aos-init','aos-animate');
        carouselItem.classList.add("card");
        carouselItem.setAttribute("data-aos-duration", "10000");
        carouselItem.setAttribute("data-aos", "fade-up");

        const imageElement = document.createElement("img");
        imageElement.classList.add("card-img-top");
        imageElement.src =
          "https://image.tmdb.org/t/p/w500" + dataImg.poster_path;

        const titleElement = document.createElement("h5");
        titleElement.setAttribute("type", "button");
        titleElement.classList.add("card-title");
        titleElement.textContent = dataImg.title || dataImg.name;

        carouselItem.appendChild(imageElement);
        carouselItem.appendChild(titleElement);
        carouselInner.appendChild(carouselItem);

        fetch(
          `https://api.themoviedb.org/3/movie/${dataImg.id}?api_key=21d0b61bb21a1374f1b66c994663ada3`
        )
          .then((response) => response.json())
          .then((dataOnePage) => {
            // console.log("dataOnePage", dataOnePage);
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching data from the API:", error);
    });
}

setTrendingromAPI();

function search() {
  let SerchPageUrl = document.getElementById("SerchPageUrl");
  SerchPageUrl.style.display = "none";

  //   const SerchPageUrl =
  //     "file:///C:/Users/MEHUL%20PALIWAL/Desktop/varshaOffice/varshaArcgate/Searchpage.html";
  //   window.location.href = SerchPageUrl;

  const searchInput = document.getElementById("searchInput").value;
  //   const apiUrl = `https://api.themoviedb.org/3/search/keyword?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${encodeURIComponent(
  const apiUrl = ` https://api.themoviedb.org/3/search/movie?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${encodeURIComponent(
    searchInput
  )}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      //   displayResults(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// function displayResults(results) {
//   const searchResultsContainer = document.getElementById("searchResults");
//   searchResultsContainer.innerHTML = "";

//   if (results.length === 0) {
//     searchResultsContainer.innerHTML = "<p>No results found.</p>";
//   } else {
//     results.forEach((result) => {
//       const resultElement = document.createElement("div");
//       resultElement.innerHTML = `<p>Keyword: ${result.name}</p><p>ID: ${result.id}</p>`;
//       searchResultsContainer.appendChild(resultElement);
//     });
//   }
// }
