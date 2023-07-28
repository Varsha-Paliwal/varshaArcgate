function setImageFromAPI() {
    let output = document.getElementById('carouselExampleSlidesOnly');
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=21d0b61bb21a1374f1b66c994663ada3")
        .then((response) => response.json())
        .then((data) => {
            const carouselInner = output.querySelector('.carousel-inner');
            let dataThree = data.results.slice(0, 3)
            // console.log("dataThree",dataThree)
            dataThree.forEach((dataImg, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active');
                }

                const imageElement = document.createElement('img');
                imageElement.classList.add('d-block', 'w-100');
                imageElement.src = 'https://image.tmdb.org/t/p/w500' + dataImg.poster_path;

                carouselItem.appendChild(imageElement);
                carouselInner.appendChild(carouselItem);
            });
        })
        .catch((error) => {
            console.error('Error fetching data from the API:', error);
        });
}

setImageFromAPI();






function setTrendingromAPI() {
    const output = document.querySelector('.Trending');
    fetch("https://api.themoviedb.org/3/trending/all/day?api_key=21d0b61bb21a1374f1b66c994663ada3")
        .then((response) => response.json())
        .then((data) => {
            const carouselInner = output.querySelector('.video');
            data.results.forEach((dataImg, index) => {
                const carouselItem = document.createElement('div');
                //   carouselItem.classList.add('card','aos-init','aos-animate');
                carouselItem.classList.add('card');
                carouselItem.setAttribute('data-aos-duration', '10000');
                carouselItem.setAttribute('data-aos', 'fade-up');

                const imageElement = document.createElement('img');
                imageElement.classList.add('card-img-top');

                imageElement.src = 'https://image.tmdb.org/t/p/w500' + dataImg.poster_path;
                carouselItem.appendChild(imageElement);
                carouselInner.appendChild(carouselItem);
            });
        })
        .catch((error) => {
            console.error('Error fetching data from the API:', error);
        });
}

setTrendingromAPI();



