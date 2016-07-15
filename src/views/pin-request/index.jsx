import React, {Component} from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import {guest} from 'app/components/Permission';
import StaticImg from 'app/components/StaticImg';
import RequestForm from './components/RequestForm';
import PinRequestSuccess from './components/PinRequestSuccess';

class PinRequestView extends Component {
  state = {
    loading: false,
    success: false,
    errors: {},
    message: ''
  };

  render() {
    const {loading, error, success} = this.state;

    return (
      <div className="PortalWrapper">
        <Helmet title="Request Activation Link" />

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
              {success
                ? <PinRequestSuccess />
                : <RequestForm state={this.state} onRequest={this.handleRequest} />}
            </div>

            <hr className="PortalWrapper-separator" />

            <div className="PortalWrapper-contentFooterText">
              Not sure why you're here? <Link to="/login" className="PortalWrapper-contentFooterLink">Go back</Link>.
            </div>
          </div>

          <div className="Footer Footer--small">
            <div className="ContainerFluid">
              <div className="Footer-inner">
                <div className="Footer-section">
                  <a href="//about.gocart.ph" target="_blank" className="Footer-link">About Us</a>
                  <a href="//about.gocart.ph/support.html" target="_blank" className="Footer-link">Support</a>
                  <a href="//about.gocart.ph/privacy.html" target="_blank" className="Footer-link">Privacy</a>
                  <a href="//about.gocart.ph/terms.html" target="_blank" className="Footer-link">Terms</a>
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

  handleRequest = (username) => {
    if ( this.state.loading ) {
      return;
    }

    if ( !username.length ) {
      this.setState({
        errors: { username: lang.errors.required },
        message: lang.errors.input
      });

      return;
    }

    this.setState({
      loading: true,
      errors: {},
      message: ''
    });

    return axios.get(`/pin/${username}?activation_link=true`)
      .then((res) => {
        this.setState({
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
            message: lang.errors.input,
            errors: formatValidationErrors(res.data.errors)
          });
        }

        return Promise.reject(res);
      });
  }
}

export default guest(PinRequestView);
