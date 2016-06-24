import React, {Component} from 'react';
import linkState from 'react-link-state';
import Modal from 'app/components/Modal';
import PostTypeSelect from 'app/components/PostTypeSelect';

export default class Filters extends Component {
  state = {
    distance: this.props.filters.distance,
    post_type: this.props.filters.type,
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
              <PostTypeSelect value={this.state.post_type} onChange={this.handleType} className="FormInput" />
            </div>
          </div>

          <div className="FormListGroup-item">
            <div className="FormListGroup-label">
              <label htmlFor="headers-filters-date">Date</label>
            </div>

            <div className="FormListGroup-input">
              <select className="FormInput" id="headers-filters-date">
                <option>More than a week ago</option>
              </select>
            </div>
          </div>

          <div className="FormListGroup-item">
            <div className="FormListGroup-label">
              <label htmlFor="headers-filters-price">Price</label>
            </div>

            <div className="FormListGroup-input">
              <select className="FormInput" id="headers-filters-price" valueLink={linkState(this, 'price')}>
                <option>No price</option>
              </select>
            </div>
          </div>

          <div className="FormListGroup-item">
            <div className="FormListGroup-label">
              <label htmlFor="headers-filters-price">Rating</label>
            </div>

            <div className="FormListGroup-input">
              <select className="FormInput" id="headers-filters-rating" valueLink={linkState(this, 'rating')}>
                <option value="0">No rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
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
    this.props.onFilter(this.state);
    this.setState({ open: false });
  }

  handleType = (value) => {
    this.setState({ post_type: value });
  }
}
