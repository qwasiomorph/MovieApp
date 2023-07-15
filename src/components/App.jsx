import React, { Component } from "react";

import Search from "./Search";
import MovieList from "./MovieList";
import Pagination from "./Pagination";

export default class App extends Component {
  state = {
    movies: [
      {
        id: 1,
        name: "The way back",
        releaseDate: new Date("March 5, 2020"),
        genres: ["Action", "Drama"],
        desc: "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts \
        to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high Lorem ipsum dolor sit amet \
        consectetur adipisicing elit. Quae, illum quibusdam, repudiandae adipisci optio unde autem culpa voluptas explicabo nesciunt \
        doloribus repellat dolorum sed et porro odit quia, ut perspiciatis!",
        score: 6.6,
        img: "",
      },
      {
        id: 2,
        name: "The way back",
        releaseDate: new Date("March 5, 2020"),
        genres: ["Action", "Drama"],
        desc: "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts \
        to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...",
        score: 6.6,
        img: "",
      },
      {
        id: 3,
        name: "The way back",
        releaseDate: new Date("March 5, 2020"),
        genres: ["Action", "Drama"],
        desc: "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts \
        to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...",
        score: 6.6,
        img: "",
      },
      {
        id: 4,
        name: "The way back",
        releaseDate: new Date("March 5, 2020"),
        genres: ["Action", "Drama"],
        desc: "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts \
        to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...",
        score: 6.6,
        img: "",
      },
      {
        id: 5,
        name: "The way back",
        releaseDate: new Date("March 5, 2020"),
        genres: ["Action", "Drama"],
        desc: "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts \
        to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...",
        score: 6.6,
        img: "",
      },
      {
        id: 6,
        name: "The way back",
        releaseDate: new Date("March 5, 2020"),
        genres: ["Action", "Drama"],
        desc: "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts \
        to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...",
        score: 6.6,
        img: "",
      },
    ],
  };

  render() {
    return (
      <>
        <header className="header">
          <Search />
        </header>
        <main>
          <MovieList movies={this.state.movies} />
        </main>
        <footer>
          <Pagination />
        </footer>
      </>
    );
  }
}
