import React, {Component} from 'react';
import linkState from 'react-link-state';
import Modal from 'app/components/Modal';
import InputError from 'app/components/InputError';
import ButtonLoader from 'app/components/ButtonLoader';
import StarWidget from './StarWidget';

export default class RatingForm extends Component {
  state = {
    rating_num: 0,
    rating_text: ''
  };

  render() {
    const {rating_num, rating_text} = this.state;
    const {errors, loading} = this.props.state;

    return (
      <Modal ref="modal" size="sm">
        <form onSubmit={this.handleSubmit}>
          <div className="FormGroup">
            <label>Rate this seller</label>

            <div className="u-spacer-small">
              <StarWidget
                score={rating_num}
                onRate={this.handleRate} />
            </div>

            {errors.rating_num ? <div className="InfoDetails InfoDetails--danger">{errors.rating_num}</div> : null}
          </div>

          <div className="FormGroup">
            <label htmlFor="rating-text" className="u-clearfix">
              <div className="u-pullLeft">
                Write a review
              </div>

              <div className="u-pullRight">
                <span className={rating_text.length > 150 ? 'u-text-primary' : ''}>
                  {rating_text.length}/150
                </span>
              </div>
            </label>

            <InputError
              error={errors.rating_text}
              element={<textarea
                id="rating-text"
                className="FormInput u-unresizableTextarea"
                rows="4"
                placeholder="Type your review here"
                valueLink={linkState(this, 'rating_text')} />} />
          </div>

          <ButtonLoader loading={loading} className="Btn Btn--info Btn--small Btn--block">
            Submit
          </ButtonLoader>
        </form>
      </Modal>
    );
  }

  handleRate = (score) => {
    this.setState({ rating_num: score });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onRate(this.state);
  }

  open = () => {
    this.refs.modal.open();
  }

  close = () => {
    this.refs.modal.close();
  }
}
