import DI from '@uikit/di';
import getContextShape from './getContextShape';
import * as STATUSES from './fieldStatuses';

const Component = DI.get('@uikit/PureComponent');
const propTypes = DI.get('@uikit/PropTypes');

class Field extends Component {
  static contextTypes = {
    formState: getContextShape(),
  };

  static propTypes = {
    name: propTypes.string.isRequired,
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  };

  static defaultProps = {
    value: '',
  };

  constructor(props, context) {
    super(props, context);

    if (typeof props.children !== 'function') {
      throw new Error(
        'Form error: children of Field component must be a function',
      );
    }

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    const store = this.getStore(context);

    store.initField(props.name, props.value, true);

    this.state = {
      value: store.getValueEntity(props.name),
      isFormDisabled: store.isFormDisabled(),
      isSubmitting: store.isSubmitting(),
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    const store = this.getStore();
    const { name } = this.props;

    this._unregister = store._dispatcher.register(() => {
      const value = store.getValueEntity(name);
      const isFormDisabled = store.isFormDisabled();
      const isSubmitting = store.isSubmitting();

      if (
        this.state.value !== value ||
        isFormDisabled !== this.state.isFormDisabled
      ) {
        this.setState({
          value,
          isFormDisabled,
          isSubmitting,
        });
      }
    });
  }

  componentWillReceiveProps({ value = null, name }) {
    value  = value || null;
    const store = this.getStore();
    if (value !== store.getInitValue(name)) {
      store.initField(name, value);
    }
  }

  componentWillUnmount() {
    this._unregister && this._unregister();
  }

  onChange(value) {
    const store = this.getStore();
    store.setValues({ [this.props.name]: value });
  }

  onBlur() {
    this.getStore().addStatus(this.props.name, STATUSES.BLURRED_STATUS, true);
  }

  getStore() {
    if (!this.context.formState) {
      throw new Error(
        'Form field error: you must provide context for form field, use "createFormContainer" or "connectForm" decorator',
      );
    }

    return this.context.formState.getStore();
  }

  render() {
    const store = this.getStore();
    const { name, isDisabled: ownIsDisabled, disabled, ...props } = this.props;
    const entity = store.getValueEntity(name);
    const value = entity.getValue() || '';

    const isDisabled = this.state.isFormDisabled || ownIsDisabled || disabled;

    return this.props.children({
      ...props,
      disabled: isDisabled,
      isDisabled,
      isSubmitting: this.state.isSubmitting,
      errorText: store.getErrorText(name),
      name,
      value,
      onChange: this.onChange,
      onBlur: this.onBlur,
    });
  }
}

export default Field;
