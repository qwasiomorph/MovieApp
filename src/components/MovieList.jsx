import React from "react";

import MovieCard from "./MovieCard";
import AlertComponent from "./Alert";
import Spinner from "./Spinner";

const MovieList = ({ errorMsg, isLoading, movies, rateMovie, unRateMovie }) => {
  if (!!errorMsg) {
    return (
      <div className="errorWrapper">
        <AlertComponent errorMsg={errorMsg} />
      </div>
    );
  }
  return (
    <>
      {isLoading ? (
        <div className="spinnerWrapper">
          <Spinner />
        </div>
      ) : (
        <ul className="movieList">
          {movies.map(({ id, name, releaseDate, genres, desc, score, img }) => (
            <MovieCard
              key={id}
              id={id}
              name={name}
              releaseDate={releaseDate}
              genres={genres}
              desc={desc}
              score={score}
              img={img}
              rateMovie={rateMovie}
              unRateMovie={unRateMovie}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieList;
