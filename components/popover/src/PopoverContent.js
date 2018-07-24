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

const emptyTailParams = {};

class PopoverContent extends React.Component {
  componentDidMount() {
    this._selfDOMNode = ReactDOM.findDOMNode(this);
    this._actions = this.props.getStateApi();
  }

  renderPopup = ({ isEnter, isLeave, isUpdate, isAppear, isInit }) => {
    const { renderPopup, currentPreset, tailSize, isShown } = this.props;
    const targetRect = this.getTargetRect();
    let params = emptyTailParams;

    if (currentPreset) {
      params = getTailParams({
        selfRect: this.getSelfRect(),
        targetRect,
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
      targetRect,
      actions: this._actions,
    });
  };

  getSelfRect() {
    return this._selfDOMNode
      ? this._selfDOMNode.getBoundingClientRect()
      : undefined;
  }

  getTargetRect() {
    return this.props.targetRect;
  }

  render() {
    const { isShown, getControlDOMNode } = this.props;
    const controlDOMNode = getControlDOMNode();

    return (
      <AutoClosable
        parentDOMNode={controlDOMNode}
        onRequestClose={this.props.onRequestClose}
      >
        <Transition>{isShown ? this.renderPopup : null}</Transition>
      </AutoClosable>
    );
  }
}

export default PopoverContent;
