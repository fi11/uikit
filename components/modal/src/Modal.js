'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Teleport, { TeleportContext } from '@uikit/teleport';
import Transition from '@uikit/transition';
import AutoClosable from '@uikit/autoclosable';

const rootStyles = {
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: 9999,
  background: 'transparent',
  overflow: 'auto',
};

const getParentDOMNodeWithScroll = parentDOMNode => {
  if (!parentDOMNode) {
    return null;
  }

  const clientWidth = parentDOMNode.clientWidth;
  const clientHeight = parentDOMNode.clientHeight;

  const scrollWidth = parentDOMNode.scrollWidth;
  const scrollHeight = parentDOMNode.scrollHeight;

  if (clientWidth === undefined) {
    return null;
  }

  if (clientWidth || clientHeight) {
    const isCanScroll = ['overflow', 'overflow-x', 'overflow-y'].some(key => {
      return /auto|scroll/.test(window.getComputedStyle(parentDOMNode)[key]);
    });

    if (
      isCanScroll &&
      (clientWidth !== scrollWidth || clientHeight !== scrollHeight)
    ) {
      return parentDOMNode;
    }
  }

  return getParentDOMNodeWithScroll(parentDOMNode.parentNode);
};

export default class Modal extends React.Component {
  static propTypes = {
    isShown: PropTypes.bool,
    onDidClose: PropTypes.func,
    onDidShow: PropTypes.func,
    isAutoClosable: PropTypes.bool,
    onRequestClose: PropTypes.func,
  };

  constructor(props, ...args) {
    super(props, ...args);

    this.state = {
      isShown: false,
    };

    this._onShowHandler = this._onShowHandler.bind(this);
    this._onCloseHandler = this._onCloseHandler.bind(this);
    this._onDidLeaveHandler = this._onDidLeaveHandler.bind(this);
    this._isBodyScrollDisabled = null;
    this._prevBodyOverflow = null;

    this._onDidShowCallbacks = [];
    this._onDidHideCallbacks = [];
  }

  componentDidMount() {
    this.props.isShown && this.show();
  }

  componentWillUnmount() {
    this._enableRootScroll();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShown !== this.props.isShown) {
      nextProps.isShown ? this.show() : this.hide();
    }
  }

  show(callback: () => void) {
    callback && this._onDidShowCallbacks.push(callback);

    this.setState({ isShown: true }, () => this._disableRootScroll());
  }

  hide(callback: () => void) {
    callback && this._onDidHideCallbacks.push(callback);

    this.setState({ isShown: false });
  }

  _renderChildren() {
    const props = this.props;

    return React.Children.map(props.children, child => {
      if (child && child.type && child.type.__MODAL_HEADER__) {
        return React.cloneElement(child, {
          onClose: props.onClose,
        });
      }

      return child;
    });
  }

  _disableRootScroll() {
    if (typeof document !== 'undefined' && !this._isBodyScrollDisabled) {
      let parentDOMNodeWithScroll = this._getParentDOMNodeWithScroll();

      this._isBodyScrollDisabled = true;
      this._prevBodyOverflow = parentDOMNodeWithScroll.style.overflow;
      parentDOMNodeWithScroll.style.overflow = 'hidden';
    }
  }

  _enableRootScroll() {
    if (typeof document !== 'undefined' && this._isBodyScrollDisabled) {
      this._isBodyScrollDisabled = false;

      this._getParentDOMNodeWithScroll().style.overflow = this._prevBodyOverflow;
    }
  }

  _onShowHandler() {
    const callbacks = this._onDidShowCallbacks;

    this._onDidShowCallbacks = [];

    callbacks.forEach(callback => callback());

    this.props.onDidShow && this.props.onDidShow();
  }

  _onCloseHandler() {
    const { isAutoClosable, onRequestClose } = this.props;

    isAutoClosable && onRequestClose && onRequestClose();
  }

  _onDidLeaveHandler() {
    const callbacks = this._onDidHideCallbacks;

    this._onDidHideCallbacks = [];
    callbacks.forEach(callback => callback());

    this._enableRootScroll();
    this.props.onDidClose && this.props.onDidClose();
  }

  _getParentDOMNodeWithScroll() {
    if (!this._parentDOMNodeWithScroll) {
      const rootDOMNode = this._getRootDOMNode();

      this._parentDOMNodeWithScroll =
        (rootDOMNode && getParentDOMNodeWithScroll(rootDOMNode)) ||
        document.getElementsByTagName('body')[0];
    }

    return this._parentDOMNodeWithScroll;
  }

  _getRootDOMNode() {
    if (!this._teleport) {
      return null;
    }

    if (!this._rootDOMNode) {
      this._rootDOMNode = this._teleport.getRootDOMNode();
    }

    return this._rootDOMNode;
  }

  _renderOverlay = props => {
    const { overlayRenderer } = this.props;
    return typeof overlayRenderer === 'function'
      ? overlayRenderer({ ...props })
      : null;
  };

  _renderBody = props => {
    const { bodyRenderer, children } = this.props;
    return typeof bodyRenderer === 'function'
      ? bodyRenderer({ ...props, children })
      : children;
  };

  render() {
    const { enterTimeout, leaveTimeout, updateTimeout, timeout } = this.props;
    const { isShown } = this.state;

    return (
      <Teleport ref={c => (this._teleport = c)}>
        <Transition
          timeout={timeout}
          enterTimeout={enterTimeout}
          leaveTimeout={leaveTimeout}
          updateTimeout={updateTimeout}
          isImmediatelyUpdate={true}
          onDidEnter={this._onShowHandler}
          onDidLeave={this._onDidLeaveHandler}
        >
          {isShown ? (
            ({ isEnter, isLeave, isUpdate, isAppear, isInit }) => (
              <div style={rootStyles}>
                {this._renderOverlay({
                  isEnter,
                  isLeave,
                  isUpdate,
                  isAppear,
                  isInit,
                })}
                <AutoClosable onRequestClose={this._onCloseHandler}>
                  {this._renderBody({
                    isEnter,
                    isLeave,
                    isUpdate,
                    isAppear,
                    isInit,
                  })}
                </AutoClosable>
              </div>
            )
          ) : null}
        </Transition>
      </Teleport>
    );
  }
}
