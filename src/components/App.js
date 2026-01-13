
import React from "react";
import './../styles/App.css';


function App() {
  const [search, setSearch] = React.useState("");
  const [movieList, setList] = React.useState([]);
  // console.log(search)
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const API_KEY = "99eb9fd1";
  const URL = "https://www.omdbapi.com/";

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true)

    try {
      const res = await fetch(`${URL}?apikey=${API_KEY}&s=${search}`);
      const data = await res.json();
      console.log(data)

      if (data.Response === "False") {
        setError("Invalid movie name. Please try again.");
        setList([]);
        setLoading(false);
      } else {
        setError("");
        setList(data.Search);
        setLoading(false);
      }
    } catch (err) {
      console.log("error occurred", err);
      setError("Invalid movie name. Please try again.");
      setList([]);
      setLoading(false);
    }
  };

  return (
    <>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <div>
        {loading=== true ? <p>Loading...</p> : <ul>
          {error.length !== 0 && <p>No movies found. Cannot fetch data </p>}
          {movieList.length !== 0 && movieList.map((movie) => (
            <li key={movie.imdbID}>
              <p>{movie.Title}</p>
               {movie.Poster !== "N/A" && (
          <img src={movie.Poster} alt={movie.Title} />
        )}
            </li>
          ))}
        </ul>}
        
      </div>
    </>
  );
}

export default App;
