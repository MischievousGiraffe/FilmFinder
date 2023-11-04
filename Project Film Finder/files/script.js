const tmdbKey = 'd9ad9c7d7266c09ee4f4d47d6c4818df';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

/* Populate Drop-down Menu with Genres.
Fetches a list of genres from the API */
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      let genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    }
  }
  catch (error) {
    console.log(error);
  } 
};

/* Get a Random Movie.
Fetches a list of movies based on the genre selected from the list of genres we returned in getGenres() */
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  
  try {
    const response = await fetch(urlToFetch);

    if(response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

/* Get Movie Info.
Fetches the details of a random movie from the list of movies we returned in getMovies() */
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  }
  catch (error) {
    console.log(error);
  }
};

/* Display Movie. 
Gets a list of movies and ultimately displays the info of a random movie from the list */
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
const movies = await getMovies();
const randomMovie = getRandomMovie(movies);
//getRandomMovie() is a helper function defined in helpers.js that will return one random movie from our getMovies() response array.
const info = await getMovieInfo(randomMovie);
displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;