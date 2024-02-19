import './MovieGuideLite-style.css'
import star_icon from '../assets/images/star-icon.svg'
import { useState } from 'react';


const MovieGuideLite = () => {

  const [movieName, setMovieName] = useState('');
  const [movieData, setMovieData] = useState(null);

  const getMovie = () => {
    
    let url = `http://www.omdbapi.com/?t=${movieName}&apiKey=${import.meta.env.VITE_API_KEY}`;

    if (movieName.length <= 0) {
      setMovieData(<h3 className="msg">Please enter movie name</h3>);
    }
    else {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.Response === "True") {
            setMovieData(
              <>
                <div className="info left">
                  <img src={data.Poster} className="poster" alt="Movie Poster" />
                  <div className="right">
                    <h2>{data.Title}</h2>
                    <div className="rating">
                      <img src={star_icon} alt="Star Icon" />
                      <h4>{data.imdbRating}</h4>
                    </div>
                    <div className="details">
                      <span>{data.Rated}</span>
                      <span>{data.Year}</span>
                      <span>{data.Runtime}</span>
                    </div>
                    <br/>
                    <div className="genre">
                      {data.Genre.split(",").map((genre, index) => (
                      <div key={index}> <span >{genre.trim()}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
                <h3>Plot:</h3>
                <p>{data.Plot}</p>
                <h3>Cast:</h3>
                <p>{data.Actors}</p>
              </>
            );
          }
          else {
            setMovieData(<h3 className="msg">{data.Error}</h3>);
          }
        })
        .catch(() => {
          setMovieData(<h3 className="msg">Error Occurred</h3>);
        });
    }
  };
  
  return (
    <>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            id="movie-name"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Enter movie name here..."
          />
          <button id="search-btn" onClick={getMovie}>Search</button>
        </div>
        <div id="result">{movieData}</div>
      </div>
    </>
  )
}

export default MovieGuideLite