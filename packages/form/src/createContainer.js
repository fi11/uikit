import DI from '@uikit/di';
import WithFormState from './WithFormState';

export default (Component, mapStateToProps) => {
  const PureComponent = DI.get('@uikit/PureComponent');
  const createElement = DI.get('@uikit/createElement');

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
