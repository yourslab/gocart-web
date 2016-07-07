import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import axios from 'axios';
import lang from 'app/lang';
import history from 'app/history';
import isServerError from 'app/utils/isServerError';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import {guest} from 'app/components/Permission';
import StaticImg from 'app/components/StaticImg';
import RegistrationForm from './components/RegistrationForm';

class RegistrationView extends Component {
  state = {
    loading: false,
    errors: {},
    message: ''
  };

  render() {
    const {loading, errors, message} = this.state;

    return (
      <div className="PortalWrapper">
        <Helmet title="Sign Up" />

        <div className="PortalWrapper-side PortalWrapper-side--v2" />

        <div className="PortalWrapper-body">
          <div>
            <div className="PortalWrapper-content">
              <div className="PortalWrapper-logo">
                <StaticImg src="logo-red.svg" alt="Logo" />
              </div>

              <a href="#" className="Btn Btn--primary Btn--large Btn--block">
                Explore GoCart
              </a>
            </div>

            <hr className="PortalWrapper-separator" />

            <div className="PortalWrapper-content">
              {message.length ? <div className="Alert Alert--danger u-spacer-base">{message}</div> : null}

              <RegistrationForm
                loading={loading}
                errors={errors}
                onRegister={this.handleRegister} />
            </div>

            <hr className="PortalWrapper-separator" />

            <div className="PortalWrapper-contentFooterText">
              Already registered? <Link to="/login" className="PortalWrapper-contentFooterLink">Log in here!</Link>
            </div>
          </div>

          <div className="Footer Footer--small">
            <div className="ContainerFluid">
              <div className="Footer-inner">
                <div className="Footer-section">
                  <a href="#" className="Footer-link">About Us</a>
                  <a href="#" className="Footer-link">Support</a>
                  <a href="#" className="Footer-link">Blog</a>
                  <a href="#" className="Footer-link">Press</a>
                  <a href="#" className="Footer-link">Jobs</a>
                  <a href="#" className="Footer-link">Privacy</a>
                  <a href="#" className="Footer-link">Terms</a>
                </div>

                <div className="Footer-section">
                  <span className="Footer-text">
                    &copy; 2015 GoCart, Philippines.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleRegister = (data) => {
    if ( this.state.loading ) {
      return;
    }

    // Handle password_confirmation;
    // The backend isn't supposed to handle this,
    // so we're imitating the backend's response
    // to manually produce a validation error.
    if ( data.password !== data.password_confirmation ) {
      return this.setState({
        errors: {
          password_confirmation: ['This field must match the password field.']
        }
      });
    }

    this.setState({
      loading: true,
      errors: {},
      message: ''
    });

    return axios.post('/user', {
        ...data,
        user_type: 1
      })
      .then((res) => {
        this.setState({
          errors: {},
          loading: false,
        });

        history.push('/');

        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState({
            loading: false,
            message: lang.errors.server
          });
        } else {
          this.setState({
            loading: false,
            errors: formatValidationErrors(res.data.errors),
            message: lang.errors.input
          });
        }

        return Promise.reject(res);
      });
  }
}

export default guest(RegistrationView);
