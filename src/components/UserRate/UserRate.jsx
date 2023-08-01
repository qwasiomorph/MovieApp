import { Component } from 'react';
import star from '../../assets/star.svg';
import starEmpty from '../../assets/starEmpty.svg';
import getNewRating from '../../utils/getNewRating';

import PropTypes from 'prop-types';

class UserRate extends Component {
  state = {
    rating: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    fromStorage: false,
  };
  handleMouseOver = (e) => {
    if (this.state.fromStorage) {
      return;
    }
    this.setState({ rating: getNewRating(e.target.name) });
  };
  handleMouseOut = () => {
    if (this.state.fromStorage) {
      return;
    }
    this.setState({ rating: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
  };
  handleRatingSubmit = () => {
    if (this.state.fromStorage) {
      return;
    }
    const iRating = this.state.rating.reduce((acc, curr) => acc + curr, 0);
    this.props.rateMovie(this.props.id, iRating);
  };
  getSavedRate = () => {
    let id = this.props.id;
    let ratings = localStorage.getItem('UserMovieRating');
    if (!ratings) {
      return;
    }
    ratings = JSON.parse(ratings);
    if (!ratings[id]) {
      return;
    }
    let newRating = [];
    let rate = ratings[id];
    for (let i = 0; i < 10; i++) {
      if (rate > 0) newRating.push(1);
      else newRating.push(0);
      rate--;
    }
    this.setState({ rating: newRating, fromStorage: true });
  };

  handleRatingDelete = (e) => {
    e.preventDefault();
    this.props.unRateMovie(this.props.id);
    this.setState({
      rating: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fromStorage: false,
    });
  };

  componentDidMount() {
    this.getSavedRate();
  }

  componentDidUpdate() {
    if (this.state.fromStorage) {
      return;
    }
    this.getSavedRate();
  }

  render() {
    return (
      <div className="userRateWrapper">
        <div className={`delete-wrap${!this.state.fromStorage ? ' hidden' : ''}`}>
          <button type="button" onClick={this.handleRatingDelete} className={'buttonDelete'}>
            Cancel
          </button>
        </div>
        <div className="rating-wrap" onMouseOut={this.handleMouseOut} onClick={this.handleRatingSubmit}>
          {this.state.rating.map((rate, index) => (
            <img
              key={index}
              src={rate === 0 ? starEmpty : star}
              alt={rate}
              width={24}
              height={24}
              name={index}
              onMouseOver={this.handleMouseOver}
            />
          ))}
        </div>
      </div>
    );
  }

  static defaultProps = {
    id: '',
    rateMovie: () => {},
    unRateMovie: () => {},
  };

  static propTypes = {
    id: PropTypes.number,
    rateMovie: PropTypes.func,
    unRateMovie: PropTypes.func,
  };
}

export default UserRate;
