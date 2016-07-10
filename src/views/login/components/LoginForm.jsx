import React, {Component} from 'react';
import linkState from 'react-link-state';
import ButtonLoader from 'app/components/ButtonLoader';

export default class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  render() {
    const {message, loading} = this.props.state;

    return (
      <form onSubmit={this.handle} formNoValidate>
        {message
          ? <div className="Alert Alert--danger u-spacer-base">
            {/* @REFACTOR: We need a better way to handle activation errors haha */}
            {message === 'Your account is not yet activated'
              ? <span>Your account is not yet activated. You may request for the activation link <Link to="/pin-request">here</Link>.</span>
              : message}
          </div>
          : null}

        <div className="FormGroup FormGroup--narrow">
          <input type="text" className="FormInput FormInput--large" placeholder="Email Address" valueLink={linkState(this, 'username')} />
        </div>

        <div className="FormGroup FormGroup--narrow">
          <input type="password" className="FormInput FormInput--large" placeholder="Password" valueLink={linkState(this, 'password')} />
        </div>

        <div className="FormGroup FormGroup--narrow">
          <ButtonLoader className="Btn Btn--success Btn--large Btn--block" loading={loading}>
            Login
          </ButtonLoader>
        </div>
      </form>
    );
  }

  handle = (evt) => {
    evt.preventDefault();
    this.props.onLogin(this.state);
  }
}
