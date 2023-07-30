import React, { Component } from "react";

import Search from "./Search";
import MovieList from "./MovieList";
import MovieAPI from "../http";
import parseList from "../utils/parseApiData";
import PaginationWrap from "./PaginationWrap";
import { Provider } from "../context/movieApiContext";

export default class App extends Component {
  state = {
    api: new MovieAPI(),
    movies: [],
    isLoading: false,
    errorMsg: "",
    lastQuery: "",
    totalItems: 0,
    searchRated: true,
  };

  genresMap = null;

  searchMovies = async (value) => {
    if (!value) {
      return;
    }
    try {
      this.setState({ isLoading: true, lastQuery: value });
      const data = await this.state.api.searchMovie(value);
      let list = parseList(data.results);
      let resultsAmount = data.total_results;
      if (!list.length) {
        throw new Error("Sorry, search didn't get any results.");
      }
      this.setState({
        movies: list,
        errorMsg: "",
        totalItems: resultsAmount,
      });
    } catch (error) {
      this.setState({ errorMsg: error, totalItems: 0 });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePage = async (pageNum) => {
    if (!this.state.searchRated) {
      this.loadRatedMovies(pageNum);
      return;
    }
    try {
      this.setState({ isLoading: true });
      const data = await this.state.api.searchMovie(
        this.state.lastQuery,
        pageNum
      );
      let list = parseList(data.results);
      this.setState({
        movies: list,
        errorMsg: "",
      });
    } catch (err) {
      this.setState({ errorMsg: err });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleRatedList = () => {
    this.setState(({ searchRated }) => {
      return {
        searchRated: !searchRated,
        movies: [],
        errorMsg: "",
      };
    });
  };

  componentDidUpdate() {
    if (
      !this.state.searchRated &&
      !this.state.isLoading &&
      !this.state.movies.length &&
      !this.state.errorMsg
    ) {
      this.loadRatedMovies();
    }
  }

  loadRatedMovies = async (page) => {
    let ratings = localStorage.getItem("UserMovieRating");
    try {
      if (!ratings) {
        throw new Error("Apparantly, you haven't rated any movies.");
      }
      ratings = JSON.parse(ratings);

      let keys = Object.keys(ratings);
      let thisPageKeys = [...keys];
      this.setState({ isLoading: true });
      if (page) {
        let start = 0 + (page - 1) * 20;
        let end = start + 20;
        thisPageKeys = keys.slice(start, end);
      }
      const data = await this.state.api.getRatedMovies(thisPageKeys);
      let list = parseList(data);
      if (!list.length) {
        throw new Error("Sorry, search didn't get any results.");
      }
      this.setState({
        movies: list,
        errorMsg: "",
        totalItems: keys.length,
      });
    } catch (err) {
      this.setState({ errorMsg: err });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  rateMovie = (id, rating) => {
    let ratings = localStorage.getItem("UserMovieRating");
    if (!ratings) {
      ratings = {
        [id]: rating,
      };
      localStorage.setItem("UserMovieRating", JSON.stringify(ratings));
    } else {
      ratings = JSON.parse(ratings);
      ratings[id] = rating;
      localStorage.setItem("UserMovieRating", JSON.stringify(ratings));
    }
  };

  unRateMovie = (id) => {
    if (!this.state.searchRated) {
      this.setState(({ movies }) => {
        let newMovieList = movies.filter((movie) => movie.id != id);
        let newTotalItems = this.state.totalItems - 1;
        return { movies: newMovieList, totalItems: newTotalItems };
      });
    }
    let ratings = localStorage.getItem("UserMovieRating");
    if (!ratings) {
      return;
    }
    ratings = JSON.parse(ratings);
    let newRatings = {};
    if (ratings[id]) {
      if (Object.keys(ratings).length === 1) {
        localStorage.removeItem("UserMovieRating");
        return;
      }
      for (let key in ratings) {
        if (key != id) newRatings[key] = ratings[key];
      }
      localStorage.setItem("UserMovieRating", JSON.stringify(newRatings));
    }
  };

  componentDidMount() {
    if (!this.genresMap) {
      MovieAPI.searchGenres("en").then((genresMap) => {
        this.genresMap = genresMap;
      });
    }
  }

  render() {
    return (
      <Provider value={this.genresMap}>
        <header className="header">
          <Search
            searchMovies={this.searchMovies}
            loadRatedMovies={this.loadRatedMovies}
            searchRated={this.state.searchRated}
            toggleRatedList={this.toggleRatedList}
          />
        </header>
        <main>
          <MovieList
            errorMsg={this.state.errorMsg}
            isLoading={this.state.isLoading}
            movies={this.state.movies}
            rateMovie={this.rateMovie}
            unRateMovie={this.unRateMovie}
          />
        </main>
        <footer>
          <PaginationWrap
            totalItems={this.state.totalItems}
            changePage={this.changePage}
            searchRated={this.state.searchRated}
          />
        </footer>
      </Provider>
    );
  }
}
