import React, {Component} from 'react';
import linkState from 'react-link-state';
import InputError from 'app/components/InputError';
import ButtonLoader from 'app/components/ButtonLoader';

export default class RegistrationForm extends Component {
  state = {
    email: '',
    username: '',
    name: '',
    password: '',
    password_confirmation: ''
  };

  render() {
    const {loading, errors} = this.props;

    return (
      <form onSubmit={this.handle}>
        <div className="FormGroup FormGroup--narrow">
          <InputError type="email" className="FormInput FormInput--large" placeholder="Email Address" valueLink={linkState(this, 'email')} error={errors.email} />
        </div>

        <div className="FormGroup FormGroup--narrow">
          <InputError type="text" className="FormInput FormInput--large" placeholder="Username" valueLink={linkState(this, 'username')} error={errors.username} />
        </div>

        <div className="FormGroup">
          <InputError type="text" className="FormInput FormInput--large" placeholder="Name" valueLink={linkState(this, 'name')} error={errors.name} />
        </div>

        <div className="FormGroup FormGroup--narrow">
          <InputError type="password" className="FormInput FormInput--large" placeholder="Password" valueLink={linkState(this, 'password')} error={errors.password} />
        </div>

        <div className="FormGroup FormGroup--narrow">
          <InputError type="password" className="FormInput FormInput--large" placeholder="Confirm password" valueLink={linkState(this, 'password_confirmation')} error={errors.password_confirmation} />
        </div>

        <div className="FormGroup FormGroup--narrow">
          <ButtonLoader className="Btn Btn--info Btn--large Btn--block" loading={loading}>
            Register
          </ButtonLoader>
        </div>
      </form>
    );
  }

  handle = (evt) => {
    evt.preventDefault();
    this.props.onRegister(this.state);
  }
}
