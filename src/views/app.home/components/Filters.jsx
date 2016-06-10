import React, {Component} from 'react';
import Modal from 'app/components/Modal';

export default class Filters extends Component {
  state = {
    distance: '',
    type: '',
    date: '',
    price: '',
    rating: ''
  };

  render() {
    return (
      <Modal ref="modal" size="sm">
        <h1 className="u-text-center">Filter</h1>
        <div className="FormListGroup u-spacer-base">
          <div className="FormListGroup-item">
            <div className="FormListGroup-label">
              <label htmlFor="headers-filters-sale">Type</label>
            </div>

            <div className="FormListGroup-input">
              <select className="FormInput" id="headers-filters-sale">
                <option>For sale</option>
              </select>
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
              <select className="FormInput" id="headers-filters-price">
                <option>No price</option>
              </select>
            </div>
          </div>

          <div className="FormListGroup-item">
            <div className="FormListGroup-label">
              <label htmlFor="headers-filters-price">Rating</label>
            </div>

            <div className="FormListGroup-input">
              <select className="FormInput" id="headers-filters-rating">
                <option>No rating</option>
              </select>
            </div>
          </div>
        </div>

        <button className="Btn Btn--block Btn--info Btn--small">
          Done
        </button>
      </Modal>
    );
  }

  open = () => {
    this.refs.modal.open();
  }

  close = () => {
    this.refs.modal.close();
  }
}
