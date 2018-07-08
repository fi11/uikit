import React from 'react';
import propTypes from 'prop-types';
import Field from './Field';

export default FieldComponent => {
  const Component = React.PureComponent;
  const createElement = React.createElement.bind(React);

  class FieldContainer extends Component {
    render() {
      return createElement(Field, this.props, props =>
        createElement(FieldComponent, props, this.props.children),
      );
    }
  }

  return FieldContainer;
};
