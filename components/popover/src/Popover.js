'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Placer from '@uikit/placer';
import PopoverContent from './PopoverContent';
import Transition from '@uikit/transition';

class Popover extends React.Component {
  state = { isShown: false, currentPreset: null };

  componentDidMount() {
    this._selfRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
  }

  toggle = () => {
    if (this.state.isShown) {
      this.hide();
    } else {
      this.show();
    }
  };

  show = () => {
    this.setState({ isShown: true });
  };

  hide = () => {
    this.setState({ isShown: false });
  };

  onRequestClose = () => {
    if (this.props.isAutoClosable) {
      this.hide();
    }
  };

  _onPresetSelected = currentPreset => {
    this.setState({
      currentPreset,
    });
  };

  render() {
    const { isShown, currentPreset } = this.state;
    const { presets } = this.props;

    if (isShown) {
      return (
        <Placer
          onPresetSelected={this._onPresetSelected}
          presets={presets}
          content={
            <PopoverContent
              {...this.props}
              isShown={isShown}
              presets={
                presets || [{ xAxis: 'middle', yAxis: 'outside-bottom' }]
              }
              targetRect={this._selfRect}
              currentPreset={currentPreset}
              onRequestClose={this.onRequestClose}
            />
          }
        >
          {this.props.children({
            show: this.show,
            hide: this.hide,
            toggle: this.toggle,
          })}
        </Placer>
      );
    }

    return this.props.children({
      show: this.show,
      hide: this.hide,
      toggle: this.toggle,
    });
  }
}

export default Popover;
