import DI from '@uikit/di';
import getContextShape from './getContextShape';
const PureComponent = DI.get('@uikit/PureComponent');
const propTypes = DI.get('@uikit/PropTypes');

class WithFormState extends PureComponent {
  static contextTypes = {
    formState: getContextShape(),
  };

  static propTypes = {
    mapStateToProps: propTypes.func,
  };

  constructor(props, ...args) {
    super(props, ...args);
    const { mapStateToProps } = props;

    if (typeof props.children !== 'function') {
      throw new Error(
        'Form error: children of WithFormState component must be a function',
      );
    }

    this.form = this.context.formState;
    this.hasMapStateToProps = typeof mapStateToProps === 'function';
    this.mapStateToProps = mapStateToProps;

    this.state = this.getState(this.form, props);
  }

  getState(form, props) {
    return this.hasMapStateToProps
      ? this.mapStateToProps(form, props) || {}
      : {};
  }

  componentDidMount() {
    this._removeListener = this.context.formState.registerCallback(() => {
      this.setState(this.getState(this.form, this.props));
    });
  }

  componentWillUnmount() {
    this._removeListener && this._removeListener();
  }

  render() {
    return this.props.children({
      ...this.props,
      ...this.state,
    });
  }
}

export default WithFormState;
