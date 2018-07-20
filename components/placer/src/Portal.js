import React from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import Wrapper from './Wrapper';
import { PlacerContextConsumer } from './PlacerContext';

export class PlacerPortal extends React.Component {
  state = { isShown: false };

  static propTypes = {
    zIndex: propTypes.number,
    viewportAccuracyFactor: propTypes.number,
    onPresetSelected: propTypes.func,
    presets: propTypes.any,

    targetRect: propTypes.any,
    targetDOMNode: propTypes.any,
  };

  componentWillUnmount() {
    this._removePortalDOMNode();
  }

  componentDidMount() {
    if (this.props.isShown) {
      this.show();
    }
  }

  componentWillReceiveProps({ isShown }) {
    if (isShown !== this.state.isShown) {
      isShown ? this.show() : this.hide();
    }
  }

  show = () => {
    if (
      typeof document !== 'undefined' &&
      !this._portalDOMNode &&
      this._createPortalDOMNode
    ) {
      this._portalDOMNode = this._createPortalDOMNode();
      this.setState({ isShown: true });
    }
  };

  hide = () => {
    this.setState({ isShown: false }, () => {
      this._removePortalDOMNode();
    });
  };

  _removePortalDOMNode() {
    if (this._portalDOMNode) {
      this._portalDOMNode.remove();
      this._portalDOMNode = null;
    }
  }

  _getTargetRect = () => {
    const { targetRect, targetDOMNode, getParentReact } = this.props;

    if (targetRect) {
      return targetRect;
    }

    if (targetDOMNode) {
      return targetDOMNode.getBoundingClientRect();
    }

    return getParentReact();
  };

  _getRootRect = () => {
    if (!this._portalDOMNode) {
      return null;
    }

    return this._portalDOMNode.getBoundingClientRect();
  };

  render() {
    const {
      zIndex,
      viewportAccuracyFactor,
      onPresetSelected,
      presets,
      children,
    } = this.props;
    const { isShown } = this.state;

    if (!isShown) {
      return (
        <PlacerContextConsumer>
          {({ createPortalDOMNode } = {}) => {
            this._createPortalDOMNode = createPortalDOMNode;
            return null;
          }}
        </PlacerContextConsumer>
      );
    }

    return (
      <PlacerContextConsumer>
        {({ createPortalDOMNode } = {}) => {
          this._createPortalDOMNode = createPortalDOMNode;

          return createPortal(
            <Wrapper
              zIndex={zIndex}
              getTargetRect={this._getTargetRect}
              getRootRect={this._getRootRect}
              presets={presets}
              viewportAccuracyFactor={viewportAccuracyFactor}
              onPresetSelected={onPresetSelected}
            >
              {children}
            </Wrapper>,
            this._portalDOMNode,
          );
        }}
      </PlacerContextConsumer>
    );
  }
}
