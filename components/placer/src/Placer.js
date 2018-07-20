'use strict';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { PlacerPortal } from './Portal';

export class Placer extends React.Component {
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

  _getSelfReact = () => {
    const domNode = ReactDOM.findDOMNode(this);
    return domNode ? domNode.getBoundingClientRect() : null;
  };

  render() {
    const {
      onPresetSelected,
      presets,
      viewportAccuracyFactor,
      zIndex,
      content,
      targetRect,
      targetDOMNode,
      isShown = true,
      children,
      render,
    } = this.props;

    return (
      <Fragment>
        {render ? render() : children}
        <PlacerPortal
          isShown={isShown}
          zIndex={zIndex}
          presets={presets}
          viewportAccuracyFactor={viewportAccuracyFactor}
          onPresetSelected={onPresetSelected}
          getParentReact={this._getSelfReact}
          targetRect={targetRect}
          targetDOMNode={targetDOMNode}
        >
          {content}
        </PlacerPortal>
      </Fragment>
    );
  }
}

export default Placer;
