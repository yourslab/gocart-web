import React, {Component, PropTypes} from 'react';
import range from 'lodash/range';
import StaticImg from 'app/components/StaticImg';

export default class RatingWidget extends Component {
  static propTypes = {
    score: PropTypes.number
  };

  static defaultProps = {
    score: 0
  };

  state = {
    // The score shown when hovered.
    score: this.props.score
  };

  render() {
    const {score} = this.state;

    return (
      <div className="RatingWidget">
        {range(5).map((_, i) =>
          <div className="RatingWidget-rating" key={i}>
            <button
                type="button"
                className="PlainBtn"
                onMouseOver={this.handleHover(i + 1)}
                onMouseOut={this.handleOut(i + 1)}
                onClick={this.handleClick(i + 1)}>
              <StaticImg
                src={`icons/star_${i < score ? 'filled' : 'empty'}.svg`}
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
    return () => {
      this.setState({ score: this.props.score });
    }
  }

  handleClick = () => {
    return () => {
      // this.props.onChange
    }
  }
}
