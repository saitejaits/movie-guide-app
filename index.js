const searchFormEl = document.querySelector("form");
const moviecontainerEl = document.querySelector(".movie-container");
const inputBoxEl = document.querySelector(".inputBox");




// Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
  

  try {
    
        const myAPIKey = "b1d39e24";
        const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

        const response = await fetch(url);

        if(!response.ok) {
          throw new Error("Unable to fetch movie data.");
        }

        const data = await response.json();

        showMovieData(data);

        // console.log(data);
  } 
  catch (error) {
    moviecontainerEl.innerHTML = ("No Movie Found");

  }
};

// Function to show movie data on screen
const showMovieData = (dataparameter) => {
  moviecontainerEl.innerHTML = '';
  moviecontainerEl.classList.remove('noBackground')

  // Use Destructring assignment to extract properties from data object
  const { Title, imdbRating, Genre , Released , Runtime , Actors , Plot , Poster } = dataparameter;

  const movieElement = document.createElement("div");
  movieElement.classList.add('movie-info');
  movieElement.innerHTML = `<h2>${Title}</h2>
  <p><strong>Rating: </strong>${imdbRating}</p>`;

  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add('movie-genre');

  Genre.split(",").forEach((element) => {
    const p = document.createElement('p');
    p.innerText = element;
    movieGenreElement.appendChild(p)
  })
  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += `<p><strong>Released: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`;
                            
  // Creating a div for movie poster
  const moviePosterElement = document.createElement("div");
  moviePosterElement.classList.add('movie-poster');
  moviePosterElement.innerHTML = `<img src='${Poster}'/>`;

  moviecontainerEl.appendChild(moviePosterElement);
  moviecontainerEl.appendChild(movieElement);
}

// Adding event listener to search form
searchFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(inputBoxEl.value)
  const movieName = inputBoxEl.value.trim();
  if (movieName !== "") {
    moviecontainerEl.innerHTML =('fetching movie information..');
    getMovieInfo(movieName);
  }
  else{
    moviecontainerEl.innerHTML = `<h2>You Forgot To Enter Your Movie Name</h2>`;
    moviecontainerEl.classList.add('noBackground')
  }
});
