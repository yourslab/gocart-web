import React, {Component} from 'react';
import linkState from 'react-link-state';
import InputError from 'app/components/InputError';
import ButtonLoader from 'app/components/ButtonLoader';

export default class FacebookRegistrationForm extends Component {
  state = {
    username: ''
  };

  render() {
    const {loading, message, errors} = this.props.state;

    return (
      <div>
        <h1 className="u-text-center">Choose a Username</h1>

        {message
          ? <div className="Alert Alert--danger u-spacer-base">{message}</div>
          : null}

        <form onSubmit={this.handle}>
          <div className="FormGroup FormGroup--narrow">
            <InputError errors={errors.username} type="text" className="FormInput FormInput--large" placeholder="Enter your preferred username" valueLink={linkState(this, 'username')} />
          </div>

          <div className="FormGroup FormGroup--narrow">
            <ButtonLoader className="Btn Btn--success Btn--large Btn--block" loading={loading}>
              Proceed
            </ButtonLoader>
          </div>
        </form>
      </div>
    );
  }

  handle = (evt) => {
    evt.preventDefault();
    this.props.onRegister(this.state.username);
  }
}
