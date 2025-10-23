import React from "react";
import "./MovieCard.css"
import Star from "../../assets/emoji/star.jpg"

function MovieCard({ movie }) {
    
    const overview = movie.overview;
    const limit = 120;
    
    const description = overview?.length > limit
        ? overview.slice(0, limit) + "..."
        : overview ?? "";
    
    const rateAverage = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

    return (
     <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" className="mobie_card">
    <img className="movie_poster" 
     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title + " Poster"} />

   <div className="movie_details">
    <h3 className="movie_details_header">{movie.original_title}</h3>

      <div className="movie_date_rate">
       <p>{movie.release_date}</p>

      <p>{rateAverage} <img className="rating_emoji" src={Star} alt="Star" /></p>

     </div>

     <p className="description">{description}</p>
      </div>
      </a>
    )
}

export default MovieCard;