import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class AppMessagesHomeView extends Component {
  render() {
    return (
      <div className="Messenger-panelInner">
        <Helmet title="Message" />

        <div className="Messenger-panelCanopy">
          <a href="#" className="Messenger-panelCanopyHeading">
            <h2 className="Messenger-panelCanopyHeadingText">
              Travis Conner
            </h2>
          </a>
        </div>

        <div className="Messenger-messageWrapper">
          {[1, 2, 3, 4, 5].map(() => <div className="Messenger-message">
            <img src="https://placeimg.com/40/40/any" className="Messenger-messageAvatar" />

            <div className="Messenger-messageInfo">
              <h4 className="Messenger-messageUser">
                Travis Conner
              </h4>

              <p className="Messenger-messageText">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="Messenger-messageMeta">
              <small>08:57 PM &nbsp; 12-09-2016</small>
            </div>
          </div>)}
        </div>

        <div className="Messenger-chatboxContainer">
          <form>
            <textarea className="Messenger-chatbox" placeholder="Write a reply..." />

            <div className="Messenger-chatboxActions">
              <button className="Btn Btn--primary Btn--small">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
