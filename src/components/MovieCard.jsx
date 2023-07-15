import React from "react";
import months from "../utils/months";
import sliceDesc from "../utils/descriptionSlice";

const MovieCard = ({ name, releaseDate, genres, desc, score, img }) => {
  let stars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let scoreCopy = score;
  stars = stars.map(() => {
    let star;
    if (scoreCopy > 1) {
      star = 1;
    } else if (scoreCopy > 0) {
      star = 0.5;
    }
    scoreCopy--;
    return star;
  });

  return (
    <li className="movie">
      <div className="movie__posterAndName">
        <div className="movie__poster"> </div>
        <div className="movie__nameAndDate">
          <h4 className="movie__name">{name}</h4>
          <h6 className="movie__releaseDate">{`${
            months[releaseDate.getMonth()]
          } ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`}</h6>
          <div className="genres">
            {genres.map((genre) => (
              <div key={genre} className="genreCard">
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="movie__desc">{sliceDesc(desc)}</p>
      <div className="movie__score">{score}</div>
      <div className="movie__stars">
        {stars.map((star, indx) => (
          <img
            src={
              star === 1
                ? "src/assets/star.png"
                : star > 0
                ? "src/assets/star_half.png"
                : "src/assets/star_void.png"
            }
            key={indx}
            width={20}
            height={20}
          />
        ))}
      </div>
    </li>
  );
};

export default MovieCard;
