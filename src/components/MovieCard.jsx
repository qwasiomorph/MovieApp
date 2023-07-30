import React from "react";

import months from "../utils/months";
import sliceDesc from "../utils/descriptionSlice";
import UserRate from "./UserRate";
import { Consumer } from "../context/movieApiContext";

import PropTypes from "prop-types";

const MovieCard = ({
  id,
  name,
  releaseDate,
  desc,
  score,
  img,
  genres,
  rateMovie,
  unRateMovie,
}) => {
  return (
    <li className="movie">
      <div className="movie__posterAndName">
        <div className="movie__poster">
          <img
            className="posterImage"
            src={import.meta.env.VITE_IMAGE_BASE_URL + img}
            alt={"poster"}
          />
        </div>
        <div className="movie__nameAndDate">
          <h4 className="movie__name">{name}</h4>
          <h6 className="movie__releaseDate">
            {Object.prototype.toString.call(releaseDate) === "[object Date]" &&
            !isNaN(releaseDate)
              ? `${
                  months[releaseDate.getMonth()]
                } ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`
              : ""}
          </h6>
          <div className="genres">
            <Consumer>
              {(genresMap) =>
                genres.map((genre) => {
                  if (Number.isNaN(genre) || !genre) {
                    return;
                  }
                  return (
                    <div key={genre} className="genreCard">
                      {genresMap.get(genre)}
                    </div>
                  );
                })
              }
            </Consumer>
          </div>
        </div>
      </div>
      <p className="movie__desc">{sliceDesc(desc)}</p>
      <div
        className={`movie__score${
          score > 7
            ? " score-high"
            : score >= 5
            ? " score-mid"
            : score > 3
            ? " score-low"
            : "score-vlow"
        }`}
      >
        {score.toFixed(2)}
      </div>
      <UserRate id={id} rateMovie={rateMovie} unRateMovie={unRateMovie} />
    </li>
  );
};

MovieCard.defaultProps = {
  id: 0,
  name: "",
  releaseDate: new Date(),
  desc: "",
  score: 0,
  img: "",
  genres: [],
  rateMovie: () => {},
  unRateMovie: () => {},
};
MovieCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  releaseDate: PropTypes.object,
  desc: PropTypes.string,
  score: PropTypes.number,
  img: PropTypes.string,
  genres: PropTypes.array,
  rateMovie: PropTypes.func,
  unRateMovie: PropTypes.func,
};

export default MovieCard;
