import React, {Component} from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import {guest} from 'app/components/Permission';
import StaticImg from 'app/components/StaticImg';
import PinActivating from './components/PinActivating';
import PinSuccess from './components/PinSuccess';
import PinError from './components/PinError';

class PinView extends Component {
  state = {
    loading: false,
    success: false,
    error: ''
  };

  componentDidMount() {
    this.activate();
  }

  render() {
    const {loading, success, error} = this.state;

    return (
      <div className="PortalWrapper">
        <Helmet title="Email Activation" />

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
                ? <PinSuccess />
                : (loading
                  ? <PinActivating />
                  : <PinError error={error} />)}
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

  activate = () => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      success: false,
      message: ''
    });

    const {username, pin} = this.props.location.query;

    return axios.put('/pin', {
        username,
        pin
      })
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
            error: lang.errors.server
          });
        } else {
          this.setState({
            loading: false,
            error: lang.errors.activation
          });
        }

        return Promise.reject(res);
      });
  }
}

export default guest(PinView);
