import React, {Component} from 'react';
import {Link} from 'react-router';
import Modal from 'app/components/Modal';
import StaticImg from 'app/components/StaticImg';

export default class SuccessDialogue extends Component {
  render() {
    return (
      <Modal ref="modal" open={this.props.success}>
        <div className="u-text-center">
          <h1 className="u-headerNormal">
            Congratulations!
          </h1>

          <h3 className="u-headerNormal">
            Your post has been successfully published
          </h3>

          <div className="u-spacer-base">
            <Link to={`/posts/${this.props.id}`} className="Btn Btn--info Btn--inverted Btn--borderless">
              See it live!
            </Link>
          </div>

          <div className="u-spacer-base">
            <button type="button" className="Btn Btn--info Btn--inverted Btn--large" onClick={() => window.location.reload()}>
              Create a new post? Click here
            </button>
          </div>
        </div>

        {/*<div className="Grid">
          <div className="Grid-cell u-size6">
            <a href="#">
              <StaticImg
                src="post-success-banner.png"
                alt="Affiliation Program Banner"
                className="ProductPostSuccessBanner" />
            </a>
          </div>

          <div className="Grid-cell u-size6">
            <a href="#">
              <StaticImg
                src="post-success-banner-2.png"
                alt="Affiliation Program Banner"
                className="ProductPostSuccessBanner" />
            </a>
          </div>
        </div>*/}
      </Modal>
    );
  }
}
