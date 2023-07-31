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
                carouselItem.classList.add("card", "cards");
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

    // const SerchPageUrl =
    //   "file:///home/arcgate/Desktop/test/ArcgateHtml/Searchpage.html";
    // window.location.href = SerchPageUrl;

    const searchInput = document.getElementById("searchInput").value;

    let SerchPageUrl = document.getElementById("SerchPageUrl");
    SerchPageUrl.style.display = "none";

    let SerchNewspageUrl = document.getElementById("SerchNewspageUrl");
    SerchNewspageUrl.style.display = "block";
    let searchValue = document.getElementById("searchValue");

    const carouselInner = searchValue.querySelector(".d-flesed");

    const carouselItem = document.querySelector("#searchInputNew");
    carouselItem.setAttribute("value", searchInput);

    //   const carouselItem = document.querySelector("input");
    //   carouselItem.classList.add("form-control","me-2");
    //   carouselItem.setAttribute("value", searchInput);
    //   carouselItem.setAttribute("type", "text");
    //   carouselItem.setAttribute("placeholder", "Search");
    carouselInner.appendChild(carouselItem);

  const apiUrlMovie = ` https://api.themoviedb.org/3/search/movie?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;

    fetch(apiUrlMovie)
        .then((response) => response.json())
        .then((data) => {
            // console.log("data", data);
            displayResultsMovie(data.results);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

    const apiUrlKeyword = ` https://api.themoviedb.org/3/search/keyword?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
    fetch(apiUrlKeyword)
        .then((response) => response.json())
        .then((data) => {
            // console.log("data", data);
            displayResultskeyword(data.results);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

        const apiUrlPerson= ` https://api.themoviedb.org/3/search/person?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
        fetch(apiUrlPerson)
            .then((response) => response.json())
            .then((data) => {
                // console.log("data", data);
                displayResultsPerson(data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        const apiUrlCompany= `https://api.themoviedb.org/3/search/company?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
        fetch(apiUrlCompany)
            .then((response) => response.json())
            .then((data) => {
                // console.log("data", data);
                displayResultsCompany(data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });


            const apiUrlTV= `https://api.themoviedb.org/3/search/tv?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
            fetch(apiUrlTV)
                .then((response) => response.json())
                .then((data) => {
                    // console.log("data", data);
                    displayResultsTV(data.results);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
                

                const apiUrlNetwork= `https://api.themoviedb.org/3/search/multi?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
                fetch(apiUrlNetwork)
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log("data", data);
                        displayResultsNetwork(data.results);
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });

                    const apiUrlCollection= `https://api.themoviedb.org/3/search/collection?api_key=21d0b61bb21a1374f1b66c994663ada3&query=${searchInput}`;
                fetch(apiUrlCollection)
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log("data", data);
                        displayResultsCollection(data.results);
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });
        


            
}

function displayResultsNetwork(results) {
    // console.log("results", results)
    const searchResultsContainer = document.getElementById("dataNetwork");
    searchResultsContainer.classList.add("card", "border");
    searchResultsContainer.innerHTML = "";
    if (results.length > 0) {
        results.forEach((result) => {
            let srcImg
            if (result.poster_path != null) {
                srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path
            }
            else {
                srcImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
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
      <p>"There is no data"</p>
    </div>`;
        searchResultsContainer.appendChild(resultElement);
    }
}
function displayResultsTV(results) {
    // console.log("results", results)
    const searchResultsContainer = document.getElementById("dataTvShow");
    searchResultsContainer.classList.add("card", "border");
    searchResultsContainer.innerHTML = "";
    if (results.length > 0) {
        results.forEach((result) => {
            let srcImg
            if (result.poster_path != null) {
                srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path
            }
            else {
                srcImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
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
      <p>"There is no data"</p>
    </div>`;
        searchResultsContainer.appendChild(resultElement);
    }
}

function displayResultsMovie(results) {
    // console.log("results", results)
    const searchResultsContainer = document.getElementById("datausing");
    searchResultsContainer.classList.add("card", "border");
    searchResultsContainer.innerHTML = "";
    if (results.length > 0) {
        results.forEach((result) => {
            let srcImg
            if (result.poster_path != null) {
                srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path
            }
            else {
                srcImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
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
      <p>"There is no data"</p>
    </div>`;
        searchResultsContainer.appendChild(resultElement);
    }
}
function displayResultsPerson(results) {
    // console.log("results", results)
    const searchResultsContainer = document.getElementById("dataPeople");
    searchResultsContainer.classList.add("card", "border");
    searchResultsContainer.innerHTML = "";
    if (results.length > 0) {
        results.forEach((result) => {
            let srcImg
            if (result.poster_path != null) {
                srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path
            }
            else {
                srcImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
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
      <p>"There is no data"</p>
    </div>`;
        searchResultsContainer.appendChild(resultElement);
    }
}

function displayResultskeyword(results) {
    // console.log("results", results)
    const searchResultsContainer = document.getElementById("datausingkeyword");
    searchResultsContainer.classList.add("card", "border");
    searchResultsContainer.innerHTML = "";
    if (results.length > 0) {
        results.forEach((result) => {
            let srcImg
            if (result.poster_path != null) {
                srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path
            }
            else {
                srcImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
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
    }

    else {
        const resultElement = document.createElement("div");
        resultElement.innerHTML = `
    <div class="text-overlay">
      <p>There are no keywords that matched your query.</p>
    </div>`;
        searchResultsContainer.appendChild(resultElement);
    }
}


function displayResultsCollection(results) {
    // console.log("results", results)
    const searchResultsContainer = document.getElementById("datacollection");
    searchResultsContainer.classList.add("card", "border");
    searchResultsContainer.innerHTML = "";
    if (results.length > 0) {
        results.forEach((result) => {
            let srcImg
            if (result.poster_path != null) {
                srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path
            }
            else {
                srcImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
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
      <p>"There is no data"</p>
    </div>`;
        searchResultsContainer.appendChild(resultElement);
    }
}

function displayResultsCompany(results) {
    // console.log("results", results)
    const searchResultsContainer = document.getElementById("datacompany");
    searchResultsContainer.classList.add("card", "border");
    searchResultsContainer.innerHTML = "";
    if (results.length > 0) {
        results.forEach((result) => {
            let srcImg
            if (result.poster_path != null) {
                srcImg = "https://image.tmdb.org/t/p/w500" + result.poster_path
            }
            else {
                srcImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
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
      <p>"There is no data"</p>
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
    search()
}
