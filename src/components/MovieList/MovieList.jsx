import MovieCard from "../MovieCard";
import AlertComponent from "../Alert";
import Spinner from "../Spinner";

import PropTypes from "prop-types";

const MovieList = ({ errorMsg, isLoading, movies, rateMovie, unRateMovie }) => {
  if (errorMsg) {
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

MovieList.defaultProps = {
  errorMsg: new Error("Unexpected error"),
  isLoading: false,
  movies: [],
  rateMovie: () => {},
  unRateMovie: () => {},
};

MovieList.propTypes = {
  errorMsg: PropTypes.object,
  isLoading: PropTypes.bool,
  movies: PropTypes.array,
  rateMovie: PropTypes.func,
  unRateMovie: PropTypes.func,
};

export default MovieList;
