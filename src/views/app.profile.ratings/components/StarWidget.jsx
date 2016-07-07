import React, {Component, PropTypes} from 'react';
import range from 'lodash/range';
import StaticImg from 'app/components/StaticImg';

/**
 * @refactor Integrate functionality into
 * reusable `RatingWidget`. I really don't
 * have much time and energy right now.
 */
export default class StarWidget extends Component {
  static propTypes = {
    score: PropTypes.number,
    onRate: PropTypes.func
  };

  state = {
    score: this.props.score
  };

  render() {
    return (
      <div className="RatingWidget">
        {range(5).map((_, i) =>
          <div className="RatingWidget-rating" key={i}>
            <button
              type="button"
              className="PlainBtn"
              onMouseOver={this.handleHover(i + 1)}
              onMouseOut={this.handleOut}
              onClick={this.handleClick(i + 1)}>
              <StaticImg
                src={`icons/star_${i < this.state.score ? 'filled' : 'empty'}.svg`}
                alt={i + 1} />
            </button>
          </div>
        )}
      </div>
    );
  }

  handleHover = (score) => {
    return () => {
      this.setState({ score });
    }
  }

  handleOut = () => {
    this.setState({ score: this.props.score });
  }

  handleClick = (score) => {
    return () => {
      this.props.onRate(score);
    }
  }
}
