import React, { Component } from 'react';
import linkState from 'react-link-state';
import Modal from 'app/components/Modal';
import ButtonLoader from 'app/components/ButtonLoader';

export default class DeletePostForm extends Component {
  componentWillReceiveProps(nextProps) {
    if ( nextProps.state.prompt === this.props.state.prompt ) {
      return;
    }

    if ( nextProps.state.prompt ) {
      this.refs.modal.open();
    } else {
      this.refs.modal.close();
    }
  }

  componentWillUnmount() {
    this.refs.modal.close();
  }

  render() {
    const {id, state, onDelete, onCloseDeletePrompt} = this.props;

    return (
      <Modal size="sm" ref="modal" onClose={onCloseDeletePrompt}>
        <div className="u-text-center">
          <h1>Are you sure to delete this post</h1>

          <ButtonLoader className="Btn Btn--primary" loading={state.loading} onClick={onDelete}>
            Confirm
          </ButtonLoader>
        </div>
      </Modal>
    );
  }
}
