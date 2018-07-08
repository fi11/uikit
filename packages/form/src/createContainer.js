import React from 'react';
import propTypes from 'prop-types';
import WithFormState from './WithFormState';

export default (Component, mapStateToProps) => {
  const PureComponent = React.PureComponent;
  const createElement = React.createElement.bind(React);

  class WithConnectedForm extends PureComponent {
    render() {
      return createElement(
        WithFormState,
        { ...this.props, mapStateToProps },
        props => createElement(Component, props, this.props.children),
      );
    }
  }

  return WithConnectedForm;
};
