const API_KEY = 'cc29497b71ea4ba4c476bd5a774d706d'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

let page = 1;
let currentMovies = true;
let searchQuery = '';

function fetchMovies() {
    const url = currentMovies
    ? `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
    : `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        searchQuery
      )}&page=${page}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      const moviesGrid = document.getElementById('movies-grid');

      movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
      });

      page++;
    })
    .catch(error => console.error(error));
}

function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const moviePoster = document.createElement('img');
  moviePoster.classList.add('movie-poster');
  moviePoster.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
  moviePoster.alt = movie.title;
  movieCard.appendChild(moviePoster);

  const movieVotes = document.createElement('p');
  movieVotes.classList.add('movie-votes');
  movieVotes.textContent = `⭐️ Rating: ${movie.vote_average}`;
  movieCard.appendChild(movieVotes);

  const movieTitle = document.createElement('h3');
  movieTitle.classList.add('movie-title');
  movieTitle.textContent = movie.title;
  movieCard.appendChild(movieTitle);

  return movieCard;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const moviesGrid = document.getElementById('movies-grid');
    const loadMoreBtn = document.getElementById('load-more-movies-btn');
    const closeSearchBtn = document.getElementById('close-search-btn');
  
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      searchQuery = searchInput.value;
      moviesGrid.innerHTML = '';
      page = 1;
      currentMovies = false;
      fetchMovies();
    });
  
    loadMoreBtn.addEventListener('click', () => {
      fetchMovies();
    });
  
    fetchMovies();

    closeSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        currentMovies = true;
        page = 1;
        const moviesGrid = document.getElementById('movies-grid');
        moviesGrid.innerHTML = '';
        fetchMovies();
      });
  });

