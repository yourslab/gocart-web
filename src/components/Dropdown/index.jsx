import React, {cloneElement, Component, PropTypes} from 'react';
import {Gateway} from 'react-gateway';
import ClickOutside from 'react-click-outside';

/**
 * @todo Support positions (beside left; top, right, bottom)
 */
export default class index extends Component {
  static propTypes = {
    menu: PropTypes.element.isRequired
  };

  state = {
    open: false,
    top: 0,
    left: 0
  };

  componentDidMount() {
    document.addEventListener('keyup', this.handleEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleEscape);
  }

  render() {
    const {open, top, left} = this.state;

    return (
      <div>
        <ClickOutside onClickOutside={this.handleClickOutside} onClick={this.handleClick}>
          {cloneElement(this.props.children, { ref: 'render' })}
        </ClickOutside>

        {open ? (
          <Gateway into="global">
            <ClickOutside onClickOutside={this.handleClickOutside}>
              <div style={{ position: 'absolute', top, left }}>
                {this.props.menu}
              </div>
            </ClickOutside>
          </Gateway>
        ): null}
      </div>
    );
  }

  handleEscape = (evt) => {
    const key = evt.which || evt.keyCode;

    if ( key === 13 && this.state.open ) {
      this.setState({ open: false });
    }
  }

  handleClick = () => {
    console.log(this.state.open);

    if ( !this.state.open ) {
      this.setState({ open: true }, () => {
        const box = this.refs.render.getBoundingClientRect();

        this.setState({
          top: box.top + box.height,
          left: box.left
        });
      });
    }
  }

  handleClickOutside = () => {
    console.log('Out');

    // if ( this.state.open ) {
    //   this.setState({ open: false });
    // }
  }
}
