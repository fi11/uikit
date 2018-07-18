'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Placer from '@uikit/placer';
import PopoverContent from './PopoverContent';

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: !!props.isShown,
      currentPreset: (props.presets || [])[0],
    };

    this._actions = this._getStateApi();
  }

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

  _getStateApi = () => {
    return {
      show: this.show,
      hide: this.hide,
      toggle: this.toggle,
    };
  };

  render() {
    const { isShown, currentPreset } = this.state;
    const { presets } = this.props;

    const render = this.props.render || this.props.children;

    return (
      <Placer
        isShown={isShown}
        onPresetSelected={this._onPresetSelected}
        presets={presets}
        content={
          <PopoverContent
            {...this.props}
            isShown={isShown}
            getStateApi={this._getStateApi}
            presets={presets || [{ xAxis: 'middle', yAxis: 'outside-bottom' }]}
            targetRect={this._selfRect}
            currentPreset={currentPreset}
            onRequestClose={this.onRequestClose}
          />
        }
      >
        {render({ isShown, actions: this._actions })}
      </Placer>
    );
  }
}

export default Popover;
