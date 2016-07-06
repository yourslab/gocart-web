import React, {Component} from 'react';
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
                {data.map((message, i) =>
                  <Link to={`/messages/${message.to_user}`} className="Messenger-conversation" activeClassName="Messenger-conversation--active" key={`message-${i}`}>
                    <UserImg src={message.prof_pic_link} username={message.username} className="Messenger-conversationAvatar" />

                    <div className="Messenger-conversationInfo">
                      <h4 className="Messenger-conversationName">{message.name}</h4>
                      <div className="Messenger-conversationSummary">{message.message}</div>
                    </div>
                  </Link>
                )}

                {loading ? <div className="Messenger-conversationLoader">
                  <div className="Spinner" />
                </div>: null}
              </Infinite>
            </div>

            <div className="Messenger-panel">
              {this.props.children}
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
}

export default connect(({auth}) => ({ auth: auth.user }))(AppMessagesView);
