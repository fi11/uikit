import DI from '@uikit/di';
import getContextShape from './getContextShape';

export default (Component, mapStateToProps) => {
  const hasMapStateToProps = typeof mapStateToProps === 'function';
  const PureComponent = DI.get('@uikit/PureComponent');

  class WithConnectedForm extends PureComponent {
    static contextTypes = {
      formState: getContextShape(),
    };

    constructor(props, ...args) {
      super(props, ...args);
      const form = this.context.formState;
      this.state = hasMapStateToProps ? mapStateToProps(form, props) || {} : {};
    }

    componentDidMount() {
      const form = this.context.formState;
      this._removeListener = this.context.formState.registerCallback(() => {
        if (hasMapStateToProps) {
          const props = mapStateToProps(form, this.props);
          if (props && Object.keys(props).length) {
            this.setState(props);
          }
        }
      });
    }

    componentWillUnmount() {
      this._removeListener && this._removeListener();
    }

    render() {
      const createElement = DI.get('@uikit/createElement');
      return createElement(Component, { ...this.props, ...this.state });
    }
  }

  return WithConnectedForm;
};
