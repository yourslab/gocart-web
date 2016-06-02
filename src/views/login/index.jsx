import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import StaticImg from 'app/components/StaticImg';

export default class LoginView extends Component {
  render() {
    return (
      <div className="PortalWrapper">
        <Helmet title="Sign Up" />

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
              <form>
                <div className="FormGroup FormGroup--narrow">
                  <input type="text" className="FormInput FormInput--large" placeholder="Email Address" />
                </div>

                <div className="FormGroup FormGroup--narrow">
                  <input type="password" className="FormInput FormInput--large" placeholder="Password" />
                </div>

                <div className="FormGroup FormGroup--narrow">
                  <button className="Btn Btn--success Btn--large Btn--block">
                    Login
                  </button>
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
}
