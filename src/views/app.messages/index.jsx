import React, {cloneElement, Component} from 'react';
import cn from 'classnames';
import axios from 'axios';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import Infinite from 'app/components/Infinite';
import UserImg from 'app/components/UserImg';

class AppMessagesView extends Component {
  state = {
    data: [],
    loading: false,
    offset: 0,
    error: '',
    last: false
  };

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    const {data, loading} = this.state;

    return (
      <div>
        <div className="Container">
          <div className="Messenger">
            <div className="Messenger-sidebar">
              <div className="Messenger-sidebarCanopy">
                <h4 className="Messenger-sidebarCanopyText">Conversations</h4>
              </div>

              <Infinite callback={this.handleRequest} className="Messenger-conversationWrapper">
                {data.map((conversation, i) => {
                  // User ID
                  // Since `from_user` and to_user` switches depending on the last sender,
                  // we'll check if `from_id` is the same as the auth user's id.
                  const id = this.props.auth.id === conversation.from_user
                    ? conversation.to_user
                    : conversation.from_user;

                  return (
                    <Link to={`/messages/${id}`} className="Messenger-conversation" activeClassName="Messenger-conversation--active" key={`message-${conversation.id}`}>
                      <UserImg src={conversation.prof_pic_link} username={conversation.username} className="Messenger-conversationAvatar" />

                      <div className="Messenger-conversationInfo">
                        <h4 className="Messenger-conversationName">{conversation.name}</h4>
                        <div className="Messenger-conversationSummary">{conversation.message}</div>
                      </div>
                    </Link>
                  );
                })}

                {loading ? <div className="Messenger-conversationLoader">
                  <div className="Spinner" />
                </div>: null}
              </Infinite>
            </div>

            <div className="Messenger-panel">
              {cloneElement(this.props.children, {
                onUpdateConversation: this.handleUpdateConversation
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleRequest = () => {
    if ( this.state.loading || this.state.last ) {
      return;
    }

    this.setState({
      loading: true,
      error: ''
    });

    const {offset} = this.state;

    return axios.get(`/user/${this.props.auth.id}/conversations?start=${offset}&end=${offset + 19}`)
      .then((res) => {
        this.setState({
          data: [...res.data, ...this.state.data],
          loading: false,
          offset: offset + 20
        });

        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState({
            loading: false,
            error: lang.errors.server
          });
        } else {
          this.setState({
            loading: false,
            last: true
          });
        }
        return Promise.reject(res);
      })
  }

  handleUpdateConversation = (id, data) => {
    this.setState(    {
      // We'll use a `double-equals` here to simplify
      // code for the user. Since the id is most
      // likely coming from `routeParams`, which makes
      // it a string by default.
      data: this.state.data.map((conversation) => conversation.to_user == id
        ? {
          ...conversation,
          message: data.message,
          time_sent: data.time_sent
        } : conversation)
    });
  }
}

export default connect(({auth}) => ({ auth: auth.user }))(AppMessagesView);
