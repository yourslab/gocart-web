import React, {Component, PropTypes} from 'react';
import range from 'lodash/range';
import StaticImg from 'app/components/StaticImg';

/**
 * Static RatingWidget
 */
export default class RatingWidget extends Component {
  static propTypes = {
    score: PropTypes.number
  };

  render() {
    return (
      <div className="RatingWidget">
        {range(5).map((_, i) =>
          <div className="RatingWidget-rating" key={i}>
            <StaticImg
              src={`icons/star_${i < this.props.score ? 'filled' : 'empty'}.svg`}
              alt={i + 1} />
          </div>
        )}
      </div>
    );
  }
}
