'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import addEventListener from '@uikit/utils/lib/addEventListener';

export default class AutoClosable extends React.Component {
  static propTypes = {
    /**
		 * On close event handler
		 */
    onRequestClose: PropTypes.func,
    /**
		 * Optional parent dom node, click event on parent dom node don't fire close event
		 */
    parentDOMNode: PropTypes.object,
  };

  componentDidMount() {
    const props = this.props;
    const parentNode = props.parentDOMNode;

    this._node = ReactDOM.findDOMNode(this);

    this._removeOutsideClickListener = addEventListener(
      document,
      'click',
      event => {
        if (
          !(parentNode && parentNode.contains(event.target)) &&
          !this._node.contains(event.target)
        ) {
          this._emitClose();
        }
      },
    );

    this._removeKeyDownlickListener = addEventListener(
      document,
      'keydown',
      event => {
        if (event.keyCode === 27) {
          this._emitClose();
        }
      },
    );
  }

  _emitClose() {
    const props = this.props;
    props.onRequestClose && props.onRequestClose();
  }

  componentWillUnmount() {
    this._removeOutsideClickListener &&
      this._removeOutsideClickListener.remove();
    this._removeKeyDownlickListener && this._removeKeyDownlickListener.remove();
  }

  render() {
    return this.props.children;
  }
}
