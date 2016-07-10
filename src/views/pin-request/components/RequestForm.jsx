import React, {Component} from 'react';
import linkState from 'react-link-state';
import ButtonLoader from 'app/components/ButtonLoader';
import InputError from 'app/components/InputError';

export default class RequestForm extends Component {
  state = {
    username: ''
  };

  render() {
    const {loading, message, errors} = this.props.state;

    return (
      <form onSubmit={this.handle}>
        {message.length
          ? <div className="Alert Alert--danger u-spacer-base">
            {message}
          </div> : null}

        <div className="FormGroup FormGroup--narrow">
          <InputError error={errors.username} type="type" className="FormInput FormInput--large" placeholder="Enter your username or email" valueLink={linkState(this, 'username')} />
        </div>

        <div className="FormGroup FormGroup--narrow">
          <ButtonLoader className="Btn Btn--success Btn--large Btn--block" loading={loading}>
            Request
          </ButtonLoader>
        </div>
      </form>
    );
  }

  handle = (evt) => {
    evt.preventDefault();
    this.props.onRequest(this.state.username);
  }
}
