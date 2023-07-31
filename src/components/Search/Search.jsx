import { Component } from "react";
import debounce from "lodash.debounce";

import PropTypes from "prop-types";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
    };
    this.MovieSearchDebounced = debounce(this.MovieSearch, 1500);
  }

  handleRadio = () => {
    this.setState({
      searchValue: "",
    });
    this.props.toggleRatedList();
  };

  handleInput = (e) => {
    this.setState({ searchValue: e.target.value });
    this.MovieSearchDebounced(e.target.value);
  };

  MovieSearch = (value) => {
    this.props.searchMovies(value);
  };

  render() {
    let { searchRated } = this.props;
    return (
      <form className="search">
        <div className="radioWrap">
          <div className="searchRatedRadio">
            <label className={`radioLabel${searchRated ? " checked" : ""}`}>
              <input
                className="defRadio"
                onChange={this.handleRadio}
                type="radio"
                name="searchRated"
              />
              Search
            </label>
            <label className={`radioLabel${!searchRated ? " checked" : ""}`}>
              <input
                className="defRadio"
                onChange={this.handleRadio}
                type="radio"
                name="searchRated"
              />
              Rated
            </label>
          </div>
        </div>
        <div className={`inputWrap${searchRated ? "" : " hidden"}`}>
          <input
            className="search__input"
            placeholder="Type to search..."
            type="text"
            value={this.state.searchValue}
            onChange={this.handleInput}
          />
        </div>
      </form>
    );
  }
  static defaultProps = {
    searchRated: true,
    searchMovies: () => {},
    loadRatedMovies: () => {},
    toggleRatedList: () => {},
  };

  static propTypes = {
    searchRated: PropTypes.bool,
    searchMovies: PropTypes.func,
    loadRatedMovies: PropTypes.func,
    toggleRatedList: PropTypes.func,
  };
}

export default Search;
