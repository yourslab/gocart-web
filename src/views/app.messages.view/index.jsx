import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import linkState from 'react-link-state';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import lang from 'app/lang';
import scrollToBottom from 'app/utils/scrollToBottom';
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

        <div className="Messenger-messageWrapper" ref="messenger">
          {conversation.data.map((message) => {
            const timestamp = moment(message.timestamp);

            return (
              <div className="Messenger-message" key={`message-${message.id}`}>
                <img src="https://placeimg.com/40/40/any" className="Messenger-messageAvatar" />

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
        </div>

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
        this.setState(({conversation}) => ({
          conversation: {
            ...conversation,
            // If a "last-page" errors occurs when
            // we view another message, we'll set the old
            // data array with the response data. Otherwise,
            // we'll append to existing data.
            data: offset === 0
              ? res.data
              // We'll `reverse` data order ourselves
              // because the API doesn't return any
              // other order other than "by recent".
              : [res.data.reverse(), ...conversation],
            loading: false,
            offset: offset + 20
          }
        }), () => {
          if ( offset === 0 ) {
            scrollToBottom(this.refs.messenger);
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
          scrollToBottom(this.refs.messenger);
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
