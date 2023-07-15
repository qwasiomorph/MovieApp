import React from "react";

import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <ul className="movieList">
      {movies.map(({ id, name, releaseDate, genres, desc, score, img }) => (
        <MovieCard
          key={id}
          name={name}
          releaseDate={releaseDate}
          genres={genres}
          desc={desc}
          score={score}
          img={img}
        />
      ))}
    </ul>
  );
};

export default MovieList;
