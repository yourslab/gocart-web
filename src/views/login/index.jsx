import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import linkState from 'react-link-state';
import flowRight from 'lodash/flowRight';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import config from 'app/config';
import {login, loginWithFacebook} from 'app/modules/auth';
import facebook from 'app/utils/facebook';
import {guest} from 'app/components/Permission';
import StaticImg from 'app/components/StaticImg';
import ButtonLoader from 'app/components/ButtonLoader';

class LoginView extends Component {
  state = {
    username: '',
    password: ''
  };

  componentDidMount() {
    // @REFACTOR: Make a high-level abstraction for the
    // FB Login (Make a wrapper component).
    facebook.init();
  }

  render() {
    const {authentication, facebook} = this.props;

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
              <form onSubmit={this.handle} formNoValidate>
                {authentication.message
                  ? <div className="Alert Alert--danger u-spacer-base">
                    {/* @REFACTOR: We need a better way to handle activation errors haha */}
                    {authentication.message === 'Your account is not yet activated'
                      ? <span>Your account is not yet activated. You may request for the activation link <Link to="/pin-request">here</Link>.</span>
                      : authentication.message}
                  </div>
                  : null}

                <div className="FormGroup FormGroup--narrow">
                  <input type="text" className="FormInput FormInput--large" placeholder="Username" valueLink={linkState(this, 'username')} />
                </div>

                <div className="FormGroup FormGroup--narrow">
                  <input type="password" className="FormInput FormInput--large" placeholder="Password" valueLink={linkState(this, 'password')} />
                </div>

                <div className="FormGroup FormGroup--narrow">
                  <ButtonLoader className="Btn Btn--success Btn--large Btn--block" loading={authentication.loading}>
                    Login
                  </ButtonLoader>
                </div>

                <p className="u-text-muted u-text-center">
                  or
                </p>

                <div className="FormGroup FormGroup--narrow">
                  <ButtonLoader className="Btn Btn--facebook Btn--large Btn--block" type="button" onClick={this.handleFacebook} loading={facebook.loading}>
                    <StaticImg src="icons/facebook.svg" alt="Icon" className="Btn-icon" />
                    Sign In using Facebook
                  </ButtonLoader>
                </div>
              </form>
            </div>

            <hr className="PortalWrapper-separator" />

            <div className="PortalWrapper-contentFooterText">
              New to GoCart? <Link to="/registration" className="PortalWrapper-contentFooterLink">Sign Up!</Link>
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

  handle = (evt) => {
    evt.preventDefault();
    this.props.actions.login(this.state, this.props.location.query[config.routing.redirectKey]);
  }

  handleFacebook = () => {
    this.props.actions.loginWithFacebook(this.props.location.query[config.routing.redirectKey]);
  }
}

const mapState = ({auth}) => ({
  authentication: auth.authentication,
  facebook: auth.facebook
});

const mapActions = (dispatch) => ({
  actions: bindActionCreators({
    login,
    loginWithFacebook
  }, dispatch)
});

export default flowRight(
  guest,
  connect(mapState, mapActions)
)(LoginView);
