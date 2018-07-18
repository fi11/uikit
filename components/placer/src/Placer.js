'use strict';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

const createPortalDomNode = () => {
  if (typeof document === 'undefined') {
    return null;
  }

  const domNode = document.createElement('div');
  domNode.style.position = 'absolute';
  domNode.style.top = '0px';
  domNode.style.left = '0px';

  document.body.appendChild(domNode);

  return domNode;
};

export default class Placer extends React.Component {
  static propTypes = {
    /**
         * Position available presets
         */
    presets: PropTypes.arrayOf(
      PropTypes.shape({
        xAxis: PropTypes.oneOf([
          'outside-left',
          'outside-right',
          'inside-left',
          'inside-right',
          'middle',
        ]),
        yAxis: PropTypes.oneOf([
          'outside-top',
          'outside-bottom',
          'inside-top',
          'inside-bottom',
          'middle',
        ]),
        offsetX: PropTypes.number,
        offsetY: PropTypes.number,
      }),
    ),
    /**
         * Custom target element params
         */
    targetRect: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    /**
         * Z-index of root div
         */
    zIndex: PropTypes.number,
    /**
         * Custom target element DOM node
         */
    targetDOMNode: PropTypes.object,
    /**
         * Factor for detect best position preset
         */
    viewportAccuracyFactor: PropTypes.number,
  };

  static defaultProps = {
    zIndex: 999,
    viewportAccuracyFactor: 0.9,
  };

  constructor(props, ...args) {
    super(props, ...args);
    this._portalDOMNode = null;
  }

  componentWillMount() {
    if (typeof document !== 'undefined' && !this._portalDOMNode) {
      this._portalDOMNode = createPortalDomNode();
    }
  }

  componentWillUnmount() {
    if (this._portalDOMNode) {
      this._portalDOMNode.remove();
      this._portalDOMNode = null;
    }
  }

  _onWrapperMountHandler = (c) => {
    this._wrapperComponent = c;
  };

  _getTargetRect = () => {
    const props = this.props;

    if (props.targetRect) {
      return props.targetRect;
    }

    if (props.targetDOMNode) {
      return this.props.targetDOMNode.getBoundingClientRect();
    }


    const domNode = ReactDOM.findDOMNode(this);
    return domNode ? domNode.getBoundingClientRect() : null;
  };


  _getRootRect = () => {
    if (!this._portalDOMNode) {
      return null;
    }

    return this._portalDOMNode.getBoundingClientRect();
  };

  render() {
    const {
      onPresetSelected,
      presets,
      viewportAccuracyFactor,
      zIndex,
      children,
      content,
    } = this.props;
    return (
      <Fragment>
        {this.props.render ? this.props.render() : children}
        {ReactDOM.createPortal(
          <Wrapper
            zIndex={zIndex}
            getTargetRect={this._getTargetRect}
            getRootRect={this._getRootRect}
            presets={presets}
            viewportAccuracyFactor={viewportAccuracyFactor}
            onDidMount={this._onWrapperMountHandler}
            onPresetSelected={onPresetSelected}
          >
            {content}
          </Wrapper>,
          this._portalDOMNode,
        )}
      </Fragment>
    );
  }
}
