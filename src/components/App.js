import React, { useState } from "react";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "99eb9fd1";

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
          setError("");
        } else {
          setError("Invalid movie name. Please try again.");
          setMovies([]);
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again later.");
        setMovies([]);
      });
  };

  return (
    <div className="movie-search">
      <h2>Movie Search</h2>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter movie name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>Search</button>
        </form>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="results">
        <ul>
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <li>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            </li>
          </div>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieSearch;
