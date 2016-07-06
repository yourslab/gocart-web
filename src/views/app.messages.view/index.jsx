import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import linkState from 'react-link-state';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import lang from 'app/lang';
import scrollToBottom from 'app/utils/scrollToBottom';
import Infinite from 'app/components/Infinite';
import UserImg from 'app/components/UserImg';
import ButtonLoader from 'app/components/ButtonLoader';

class AppMessagesHomeView extends Component {
  state = {
    conversation: {
      data: [],
      offset: 0,
      loading: false,
      last: false,
      error: ''
    },

    message: {
      loading: false,
      error: '',
      input: ''
    }
  };

  // Keep track of last scroll before updating the data.
  // So, we can retain our last scroll.
  // @REFACTOR: Make an abstraction:
  // `const last = scroll(node); last.store(); last.restore()`
  last = 0;

  componentDidMount() {
    this.handleRequest();
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.routeParams.id === nextProps.routeParams.id ) {
      return;
    }

    this.handleRequest(0);
  }

  render() {
    const {conversation, message} = this.state;
    const user = conversation.data[0] || {};

    return (
      <div className="Messenger-panelInner">
        <Helmet title={user.name || 'Message'} />

        <div className="Messenger-panelCanopy">
          <Link to={`/@${user.username}`} className="Messenger-panelCanopyHeading">
            <h2 className="Messenger-panelCanopyHeadingText">
              {user.name}
            </h2>
          </Link>
        </div>

        <Infinite reverse container callback={this.handleRequest} className="Messenger-messageWrapper" ref="messenger">
          {conversation.data.map((message) => {
            const timestamp = moment(message.timestamp);

            return (
              <div className="Messenger-message" key={`message-${message.id}`}>
                <UserImg src={message.prof_pic_link} username={message.username} className="Messenger-messageAvatar" />

                <div className="Messenger-messageInfo">
                  <h4 className="Messenger-messageUser">
                    {message.name}
                  </h4>

                  <p className="Messenger-messageText">
                    {message.message}
                  </p>
                </div>

                <div className="Messenger-messageMeta">
                  <small>{timestamp.format('hh:mm:ss')} &nbsp; {timestamp.format('MM-DD-YYYY')}</small>
                </div>
              </div>
            );
          })}
        </Infinite>

        <div className="Messenger-chatboxContainer">
          <form onSubmit={this.handleSendMessage}>
            <textarea
              valueLink={linkState(this, 'message.input')}
              className="Messenger-chatbox"
              placeholder="Write a reply..." />

            <div className="Messenger-chatboxActions">
              <div>
                {message.loading ? <div className="Spinner" /> : null}
              </div>

              <div>
                <ButtonLoader loading={message.loading} className="Btn Btn--primary Btn--small">
                  Send
                </ButtonLoader>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleRequest = (offset = this.state.conversation.offset) => {
    const {loading, last} = this.state.conversation;

    if ( loading || last ) {
      return;
    }

    this.setState(({conversation}) => ({
      conversation: {
        ...conversation,
        loading: true,
        error: ''
      }
    }));

    const {auth, routeParams} = this.props;

    return axios.get(`/user/${auth.id}/messages/${routeParams.id}?start=${offset}&end=${offset + 19}`)
      .then((res) => {
        // We'll `reverse` data order ourselves
        // because the API doesn't return any
        // other order other than "by recent".
        const data = res.data.reverse();

        // We'll place this here instead of before the request
        // so we have less chances for a "flickr".
        const $messenger = findDOMNode(this.refs.messenger);
        // We'll take the last scroll from bottom
        this.last = $messenger.scrollHeight - $messenger.scrollTop;

        this.setState(({conversation}) => ({
          conversation: {
            ...conversation,
            // If a "last-page" errors occurs when
            // we view another message, we'll set the old
            // data array with the response data. Otherwise,
            // we'll append to existing data.
            data: offset === 0
              ? data
              : [...data, ...conversation.data],
            loading: false,
            offset: offset + 20
          }
        }), () => {
          if ( offset === 0 ) {
            scrollToBottom($messenger);
          } else {
            $messenger.scrollTop = $messenger.scrollHeight - this.last;
          }
        });

        return res;
      })
      .catch((res) => {
        this.setState(({conversation}) => ({
          conversation: {
            ...conversation,
            // If a "last-page" errors occurs when
            // we view another message, we'll empty the data.
            data: offset === 0 ? [] : conversation.data,
            loading: false,
            error: lang.errors.server
          }
        }));

        return Promise.reject(res);
      });
  }

  handleSendMessage = (evt) => {
    evt.preventDefault();

    const {loading, input} = this.state.message;

    if ( loading || !input.length ) {
      return;
    }

    this.setState(({message}) => ({
      message: {
        ...message,
        loading: true,
        error: ''
      }
    }));

    const {auth, routeParams} = this.props;

    return axios.post('/user/messages', {
        to_user: this.props.routeParams.id,
        from_user: this.props.auth.id,
        message: input
      })
      .then((res) => {
        this.setState(({conversation, message}) => ({
          conversation: {
            ...conversation,
            data: [...conversation.data, res.data],
            loading: false,
            offset: conversation.offset + 1
          },

          message: {
            ...message,
            input: '',
            loading: false
          }
        }), () => {
          scrollToBottom(findDOMNode(this.refs.messenger));
        });

        return res;
      })
      .catch((res) => {
        this.setState(({message}) => ({
          message: {
            ...message,
            loading: false,
            error: lang.errors.server
          }
        }));

        return Promise.reject(res);
      });
  }
}

export default connect(({auth}) => ({ auth: auth.user }))(AppMessagesHomeView);
