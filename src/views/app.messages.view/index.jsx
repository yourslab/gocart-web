import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import flowRight from 'lodash/flowRight';
import linkState from 'react-link-state';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {resolve} from 'react-resolver';
import lang from 'app/lang';
import scrollToBottom from 'app/utils/scrollToBottom';
import Infinite from 'app/components/Infinite';
import UserImg from 'app/components/UserImg';
import ButtonLoader from 'app/components/ButtonLoader';

class AppMessagesHomeView extends Component {
  state = {
    message: {
      data: [],
      offset: 0,
      loading: false,
      last: false,
      error: ''
    },

    send: {
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

    this.handleRequest(nextProps.routeParams.id);
  }

  render() {
    const {auth, conversation} = this.props;
    const {message, send} = this.state;

    return (
      <div className="Messenger-panelInner">
        <Helmet title={conversation.name || 'Message'} />

        <div className="Messenger-panelCanopy">
          <Link to={`/@${conversation.username}`} className="Messenger-panelCanopyHeading">
            <h2 className="Messenger-panelCanopyHeadingText">
              {conversation.name}
            </h2>
          </Link>
        </div>

        <Infinite reverse container callback={this.handleRequest} className="Messenger-messageWrapper" ref="messenger">
          {message.data.map((message) => {
            const timestamp = moment(message.time_sent);
            const user = message.from_user === auth.id ? auth : conversation;

            return (
              <div className="Messenger-message" key={`message-${message.id}`}>
                <UserImg src={user.prof_pic_link} username={user.username} className="Messenger-messageAvatar" />

                <div className="Messenger-messageInfo">
                  <h4 className="Messenger-messageUser">
                    {user.name}
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
              valueLink={linkState(this, 'send.input')}
              className="Messenger-chatbox"
              placeholder="Write a reply..." />

            <div className="Messenger-chatboxActions">
              <div>
                {send.loading ? <div className="Spinner" /> : null}
              </div>

              <div>
                <ButtonLoader loading={send.loading} className="Btn Btn--primary Btn--small">
                  Send
                </ButtonLoader>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleRequest = (id = this.props.routeParams.id) => {
    const {loading, last} = this.state.message;

    if ( loading || last ) {
      return;
    }

    this.setState(({message}) => ({
      message: {
        ...message,
        loading: true,
        error: ''
      }
    }));

    const offset = id === this.props.routeParams.id
      ? this.state.message.offset
      : 0;

    const {auth} = this.props;

    return axios.get(`/user/${auth.id}/messages/${id}?start=${offset}&end=${offset + 19}`)
      .then((res) => {
        // We'll place this here instead of before the request
        // so we have less chances for a "flickr".
        const $messenger = findDOMNode(this.refs.messenger);
        // We'll take the last scroll from bottom
        this.last = $messenger.scrollHeight - $messenger.scrollTop;

        this.setState(({message}) => ({
          message: {
            ...message,
            // 1. If we view another message, we'll set the old
            // data array with the response data. Otherwise,
            // we'll append to existing data.
            data: offset === 0
              ? res.data
              : [...message.data, ...res.data],
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
        this.setState(({message}) => ({
          message: {
            ...message,
            // If a "last-page" errors occurs when
            // we view another message, we'll empty the data.
            data: offset === 0 ? [] : message.data,
            loading: false,
            error: lang.errors.server
          }
        }));

        return Promise.reject(res);
      });
  }

  handleSendMessage = (evt) => {
    evt.preventDefault();

    const {loading, input} = this.state.send;

    if ( loading || !input.length ) {
      return;
    }

    this.setState(({send}) => ({
      send: {
        ...send,
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
        this.setState(({message, send}) => ({
          message: {
            ...message,
            data: [res.data, ...message.data],
            loading: false,
            offset: message.offset + 1
          },

          send: {
            ...send,
            input: '',
            loading: false
          }
        }), () => {
          scrollToBottom(findDOMNode(this.refs.messenger));
        });

        // Update conversation from `app.messages` parent route
        this.props.onUpdateConversation(routeParams.id, res.data);

        return res;
      })
      .catch((res) => {
        this.setState(({send}) => ({
          send: {
            ...send,
            loading: false,
            error: lang.errors.server
          }
        }));

        return Promise.reject(res);
      });
  }
}

export default flowRight(
  connect(({auth}) => ({ auth: auth.user })),

  resolve('conversation', (props) =>
    axios.get(`/user/${props.auth.id}/conversations?to_id=${props.routeParams.id}`)
      .then((res) => res.data[0]))
)(AppMessagesHomeView);
