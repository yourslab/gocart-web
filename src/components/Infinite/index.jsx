import React, {Component, PropTypes} from 'react';
import {scrollTop, height} from 'dom-helpers';

/**
 * A basic and simple InfiniteScroll implementation
 */
export default class Infinite extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    offset: PropTypes.number,
    disabled: PropTypes.bool,
    container: PropTypes.bool
  };

  static defaultProps = {
    offset: 200,
    disabled: false,
    container: false
  };

  // The scrolling container.
  // If the container is window, this is set to window.
  // Otherwise, set to the container element.
  get scroller() {
    return this.props.container
      ? this.refs.container
      : window;
  }

  // The container.
  // If the container is window, this is set to body.
  // Otherwise, set to the container element.
  get container() {
    return this.props.container 
      ? this.refs.container 
      : document.querySelector('html, body');
  }

  componentDidMount() {
    this.scroller.addEventListener('scroll', this.handle);
  }

  componentWillUnmount() {
    this.scroller.removeEventListener('scroll', this.handle);
  }

  render() {
    const {children, ...props} = this.props;
    return <div ref="container" {...props}>{children}</div>;
  }

  handle = () => {
    const {container, scroller} = this;
    const {disabled, offset, callback} = this.props;

    if ( this.props.disabled ) {
      return;
    }

    const totalScroll = scrollTop(scroller);
    const containerBottom = container.scrollHeight;
    const scrollerHeight = height(scroller);

    if ( totalScroll + offset >= containerBottom - scrollerHeight ) {
      callback();
    }
  }
}
