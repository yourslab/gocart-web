import React, {Component, PropTypes} from 'react';
import ReactModal from 'react-modal';
import cn from 'classnames';
import StaticImg from 'app/components/StaticImg';

// Remove RM's default styling
ReactModal.defaultStyles = {
  overlay: {},
  content: {}
};

// ReactModal.setAppElement('#main');

/**
 * @example Stateful modal
 * <Modal ref="modal" />
 * this.refs.modal.open();
 * this.refs.modal.hide();
 *
 * Useful in most cases (usually we don't need to control
 * the state of the modal or sync it with another state)
 *
 * @example Stateless modal
 * <Modal open={this.state.open} onClose={this.handleClose} />
 * This is useful when we need to control the state of the modal
 *
 * @REFACTOR Instead of a stateless modal, we can
 * put hooks (like onOpen, onClose)
 */
export default class Modal extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
  };

  state = {
    open: false
  };

  componentDidMount() {
    if ( this.props.open ) {
      this.open();
    }
  }

  componentWillReceiveProps(props) {
    if ( props.open !== undefined ) {
      this.setState({ open: props.open });
    }
  }

  render() {
    const {onClose, size} = this.props;
    const close = onClose || this.close;

    return (
      <ReactModal
        closeTimeoutMS={300}
        isOpen={this.state.open}
        onRequestClose={close}
        className={cn({'ReactModal__Content--small': size === 'sm'}, {'ReactModal__Content--large': size === 'lg'})}
        style={!isNaN(size) ? { content: { width: size } } : null}>
        <div className="ReactModal__closeButton">
          <button onClick={close} className="PlainBtn">
            <StaticImg src="icons/close_white@1x.png" />
          </button>
        </div>
        {this.props.children}
      </ReactModal>
    );
  }

  open = () => {
    this.setState({ open: true });
  }

  close = () => {
    this.setState({ open: false })
  }
}
