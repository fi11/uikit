import DI from '@uikit/di';
import Form from './Form';

export default (
  FormComponent,
  { name = 'form', schema, errorCodes = {}, errorStrategy } = {},
  mapStateToProps,
) => {
  const Component = DI.get('@uikit/PureComponent');
  const createElement = DI.get('@uikit/createElement');

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
