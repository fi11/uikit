import React from 'react';
import propTypes from 'prop-types';
import Form from './Form';

export default (
  FormComponent,
  { name = 'form', schema, errorCodes = {}, errorStrategy } = {},
  mapStateToProps,
) => {
  const Component = React.PureComponent;
  const createElement = React.createElement.bind(React);

  return class FormContainer extends Component {
    render() {
      return createElement(
        Form,
        {
          ...this.props,
          name,
          schema,
          errorCodes,
          errorStrategy,
          mapStateToProps,
        },
        props => createElement(FormComponent, props, this.props.children),
      );
    }
  };
};
