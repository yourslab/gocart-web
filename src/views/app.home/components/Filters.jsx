import React, {Component} from 'react';
import moment from 'moment';
import linkState from 'react-link-state';
import Modal from 'app/components/Modal';
import PostTypeSelect from 'app/components/PostTypeSelect';
import RangeSlider from 'rc-slider';

export default class Filters extends Component {
  state = {
    // distance: this.props.filters.distance,
    post_type: this.props.filters.post_type,
    date: this.props.filters.date,
    price: this.props.filters.price,
    rating: this.props.filters.rating,
    open: false
  };

  render() {
    return (
      <Modal ref="modal" size="sm" open={this.state.open} onClose={this.close}>
        <h1 className="u-text-center">Filter</h1>
        <div className="FormListGroup u-spacer-base">
          <div className="FormListGroup-item">
            <div className="FormListGroup-label">
              <label htmlFor="headers-filters-sale">Type</label>
            </div>

            <div className="FormListGroup-input">
              <PostTypeSelect
                value={this.state.post_type}
                onChange={this.handleType}
                placeholder="All"
                className="FormInput" />
            </div>
          </div>

          <div className="FormListGroup-item">
            <div className="FormListGroup-label">
              <label htmlFor="headers-filters-date">Date</label>
            </div>

            <div className="FormListGroup-input">
              <select className="FormInput" id="headers-filters-date" valueLink={linkState(this, 'date')}>
                <option value="">No date specified</option>
                <option value={moment().subtract(1, 'weeks').format('MM-DD-YYYY')}>A week ago</option>
                <option value={moment().subtract(1, 'months').format('MM-DD-YYYY')}>A month ago</option>
              </select>
            </div>
          </div>

          <div className="FormListGroup-item">
            <div className="FormListGroup-label">
              <label htmlFor="headers-filters-price">Price</label>
            </div>

            <div className="FormListGroup-input">
              <RangeSlider
                range
                min={0}
                max={100000}
                allowCross={false}
                defaultValue={this.state.price}
                onAfterChange={this.handlePrice} />
            </div>
          </div>

          <div className="FormListGroup-item">
            <div className="FormListGroup-label">
              <label htmlFor="headers-filters-price">Rating</label>
            </div>

            <div className="FormListGroup-input">
              <RangeSlider
                range
                min={0}
                max={5}
                marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }}
                allowCross={false}
                defaultValue={this.state.rating}
                onAfterChange={this.handleRating} />
            </div>
          </div>
        </div>

        <button className="Btn Btn--block Btn--info Btn--small" onClick={this.done}>
          Done
        </button>
      </Modal>
    );
  }

  open = () => {
    this.setState({ open: true });
  }

  close = () => {
    this.setState({
      ...this.props.filters,
      open: false
    });
  }

  done = () => {
    const {open, ...filters} = this.state;
    this.props.onFilter(filters);
    this.setState({ open: false });
  }

  handleType = (value) => {
    this.setState({ post_type: value });
  }

  handlePrice = (value) => {
    this.setState({ price: value });
  }

  handleRating = (value) => {
    this.setState({ rating: value });
  }
}
