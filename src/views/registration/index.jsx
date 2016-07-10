import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import axios from 'axios';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import {guest} from 'app/components/Permission';
import StaticImg from 'app/components/StaticImg';
import RegistrationForm from './components/RegistrationForm';
import Success from './components/Success';

class RegistrationView extends Component {
  state = {
    loading: false,
    errors: {},
    message: '',
    success: false
  };

  render() {
    const {loading, errors, message, success} = this.state;

    return (
      <div className="PortalWrapper">
        <Helmet title="Sign Up" />

        <div className="PortalWrapper-side" />

        <div className="PortalWrapper-body">
          <div>
            <div className="PortalWrapper-content">
              <div className="PortalWrapper-logo">
                <StaticImg src="logo-red.svg" alt="Logo" />
              </div>

              {/*<a href="#" className="Btn Btn--primary Btn--large Btn--block">
                Explore GoCart
              </a>*/}
            </div>

            <hr className="PortalWrapper-separator" />

            <div className="PortalWrapper-content">
              {message.length ? <div className="Alert Alert--danger u-spacer-base">{message}</div> : null}

              {success
                ? <Success />
                : <RegistrationForm
                  loading={loading}
                  errors={errors}
                  onRegister={this.handleRegister} />}
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
                  <a href="//about.gocart.ph" className="Footer-link">About Us</a>
                  <a href="//about.gocart.ph/support.html" className="Footer-link">Support</a>
                  <a href="//about.gocart.ph/privacy.html" className="Footer-link">Privacy</a>
                  <a href="//about.gocart.ph/terms.html" className="Footer-link">Terms</a>
                </div>

                <div className="Footer-section">
                  <span className="Footer-text">
                    &copy; 2016 GoCart, Philippines.
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
      this.setState({
        message: lang.errors.input,
        errors: {
          password_confirmation: lang.errors.password,
        }
      });

      return;
    }

    this.setState({
      loading: true,
      errors: {},
      message: ''
    });

    return axios.post('/user', {
        ...data,
        user_type: 1,
        activation_link: true
      })
      .then((res) => {
        this.setState({
          errors: {},
          loading: false,
          success: true
        });

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
