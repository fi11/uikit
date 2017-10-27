import DI from '@uikit/di';
import Field from './Field';

export default FieldComponent => {
  const Component = DI.get('@uikit/PureComponent');
  const createElement = DI.get('@uikit/createElement');

  class FieldContainer extends Component {
    render() {
      return createElement(Field, this.props, props =>
        createElement(FieldComponent, props, this.props.children),
      );
    }
  }

  return FieldContainer;
};
