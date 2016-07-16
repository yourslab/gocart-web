import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import flowRight from 'lodash/flowRight';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import config from 'app/config';
import {login, loginWithFacebook, registerWithFacebook} from 'app/modules/auth';
import facebook from 'app/utils/facebook';
import {guest} from 'app/components/Permission';
import StaticImg from 'app/components/StaticImg';
import ButtonLoader from 'app/components/ButtonLoader';
import LoginForm from './components/LoginForm';
import FacebookRegistrationForm from './components/FacebookRegistrationForm';

class LoginView extends Component {
  componentDidMount() {
    // @REFACTOR: Make a high-level abstraction for the
    // FB Login (Make a wrapper component).
    facebook.init();
  }

  render() {
    const {authentication, facebook, register} = this.props;

    return (
      <div className="PortalWrapper">
        <Helmet title="Sign In" />

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
              {register.active
                ? <FacebookRegistrationForm
                  state={register}
                  onRegister={this.handleRegister} />
                : <div>
                  <LoginForm
                    state={authentication}
                    onLogin={this.handleLogin} />

                  <p className="u-text-muted u-text-center">
                    or
                  </p>

                  <div className="FormGroup">
                    <ButtonLoader className="Btn Btn--facebook Btn--large Btn--block" type="button" onClick={this.handleFacebook} loading={facebook.loading}>
                      <StaticImg src="icons/facebook.svg" alt="Icon" className="Btn-icon" />
                      Sign In using Facebook
                    </ButtonLoader>
                  </div>

                  <div className="u-text-center">
                    <Link to="/pin-request" className="PortalWrapper-contentFooterLink"> Resend Email Verification </Link>
                  </div>
                </div>
              }
            </div>

            <hr className="PortalWrapper-separator" />

            <div className="PortalWrapper-contentFooterText">
              Don't have Facebook? <Link to="/registration" className="PortalWrapper-contentFooterLink">Sign Up with Email!</Link>
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
                    &copy; 2016 Gocart, Philippines.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleLogin = (credentials) => {
    const redirect = this.props.location.query[config.routing.redirectKey];
    this.props.actions.login(credentials, redirect);
  }

  handleFacebook = () => {
    this.props.actions.loginWithFacebook(
      this.props.location.query[config.routing.redirectKey]
    );
  }

  handleRegister = (username) => {
    const redirect = this.props.location.query[config.routing.redirectKey];
    this.props.actions.registerWithFacebook(username,redirect);
  }
}

const mapState = ({auth}) => ({
  authentication: auth.authentication,
  facebook: auth.facebook,
  register: auth['facebook.register']
});

const mapActions = (dispatch) => ({
  actions: bindActionCreators({
    login,
    loginWithFacebook,
    registerWithFacebook
  }, dispatch)
});

export default flowRight(
  guest,
  connect(mapState, mapActions)
)(LoginView);
