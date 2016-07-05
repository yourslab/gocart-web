import React, {Component} from 'react';
import cn from 'classnames';
import Helmet from 'react-helmet';

export default class AppMessagesView extends Component {
  render() {
    return (
      <div>
        <Helmet title="Messages" />

        <div className="Container">
          <div className="Messenger">
            <div className="Messenger-sidebar">
              <div className="Messenger-sidebarCanopy">
                <h4 className="Messenger-sidebarCanopyText">Conversations</h4>
              </div>

              <div className="Messenger-conversationWrapper">
                {[1, 2, 3, 4, 5].map((i) =>
                  <a href="#" className={cn('Messenger-conversation', { 'Messenger-conversation--active': i === 1 })}>
                    <img src="https://placeimg.com/48/48/any" className="Messenger-conversationAvatar" />

                    <div className="Messenger-conversationInfo">
                      <h4 className="Messenger-conversationName">Travis Conner</h4>
                      <div className="Messenger-conversationSummary">Lorem lipsum dolor sit amet..</div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="Messenger-panel"></div>
          </div>
        </div>
      </div>
    );
  }
}
