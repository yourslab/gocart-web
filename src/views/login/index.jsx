import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import linkState from 'react-link-state';
import flowRight from 'lodash/flowRight';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from 'app/modules/auth';
import guest from 'app/components/Permission/guest';
import StaticImg from 'app/components/StaticImg';
import ButtonLoader from 'app/components/ButtonLoader';

class LoginView extends Component {
  state = {
    username: '',
    password: ''
  };

  render() {
    const {state} = this.props;

    return (
      <div className="PortalWrapper">
        <Helmet title="Sign In" />

        <div className="PortalWrapper-side">
        </div>

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
              <form onSubmit={this.handle} formNoValidate>
                {state.message ? <div className="Alert Alert--danger">{state.message}</div> : null}

                <div className="FormGroup FormGroup--narrow">
                  <input type="text" className="FormInput FormInput--large" placeholder="Email Address" valueLink={linkState(this, 'username')} />
                </div>

                <div className="FormGroup FormGroup--narrow">
                  <input type="password" className="FormInput FormInput--large" placeholder="Password" valueLink={linkState(this, 'password')} />
                </div>

                <div className="FormGroup FormGroup--narrow">
                  <ButtonLoader className="Btn Btn--success Btn--large Btn--block" loading={state.loading}>
                    Login
                  </ButtonLoader>
                </div>

                <p className="u-text-muted u-text-center">
                  or
                </p>

                <div className="FormGroup FormGroup--narrow">
                  <button className="Btn Btn--facebook Btn--large Btn--block">
                    Sign In using Facebook
                  </button>
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

  handle = (evt) => {
    evt.preventDefault();
    this.props.dispatch(login(this.state));
  }
}

export default flowRight(
  guest,
  connect(({auth}) => ({ state: auth.authentication }))
)(LoginView);
