import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import AutoClosable from '@uikit/autoclosable';
import Transition from '@uikit/transition';

import { getTailParams } from './helpers';

const RectShapePropType = PropTypes.shape({
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
});

class PopoverContent extends React.Component {
  componentDidMount() {
    this._selfDOMNode = ReactDOM.findDOMNode(this);
  }

  renderPopup = ({ isEnter, isLeave, isUpdate, isAppear, isInit }) => {
    const { renderPopup, currentPreset, tailSize, isShown } = this.props;

    let params = {};
    if (currentPreset) {
      params = getTailParams({
        selfRect: this.getSelfRect(),
        targetRect: this.getTargetRect(),
        currentPreset,
        tailSize,
      });
    }

    return renderPopup({
      isEnter,
      isLeave,
      isUpdate,
      isAppear,
      isInit,
      tail: params,
      isShown,
      actions: this.props.getStateApi(),
    });
  };

  getSelfRect() {
    return this._selfDOMNode
      ? this._selfDOMNode.getBoundingClientRect()
      : undefined;
  }

  getTargetRect() {
    const { targetRect } = this.props;

    return targetRect;
  }

  render() {
    const { isShown } = this.props;

    return (
      <AutoClosable onRequestClose={this.props.onRequestClose}>
        <Transition>{isShown ? this.renderPopup : null}</Transition>
      </AutoClosable>
    );
  }
}

export default PopoverContent;
