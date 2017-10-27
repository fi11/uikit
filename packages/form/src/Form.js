import DI from '@uikit/di';
import getContextShape from './getContextShape';
import Validator from './Validator';
import Store from './Store';
import * as errorStrategies from './errorStrategies';

const Component = DI.get('@uikit/PureComponent');
const propTypes = DI.get('@uikit/PropTypes');

class Form extends Component {
  static propTypes = {
    name: propTypes.string,
    schema: propTypes.object,
    errorCodes: propTypes.object,
    errorStrategy: propTypes.oneOf([
      errorStrategies.ON_BLUR,
      errorStrategies.ON_BLUR_AND_SUBMIT,
      errorStrategies.ON_SUBMIT,
      errorStrategies.ON_TOUCH_AND_SUBMIT,
    ]),
    mapStateToProps: propTypes.func,
  };

  static defaultProps = {
    name: 'form',
    errorCodes: {},
  };

  constructor(props, ...args) {
    super(props, ...args);

    if (typeof props.children !== 'function') {
      throw new Error(
        'Form error: children of Form component must be a function',
      );
    }

    this.configure(props);
    this.state = this.getState(this.form, props);
    this.onSubmit = this.onSubmit.bind(this);

    console.log('this form', this.form);
    console.log('this state', this.state);
  }

  static childContextTypes = {
    formState: getContextShape(),
  };

  getChildContext() {
    return {
      formState: {
        getValues: () => {
          return this.getStore().getValues();
        },
        getChanges: () => {
          return this.getStore().getChanges();
        },
        getErrors() {
          return this.getStore().getErrors();
        },
        getErrorText() {
          return this.getStore().getErrorText();
        },
        registerCallback: callback => {
          return this.getStore().registerCallback(callback);
        },
        isValid: () => {
          return this.getStore().isValid();
        },
        isDisabled: () => {
          return this.getStore().isFormDisabled();
        },
        isDirty: () => {
          return !!Object.keys(this.getStore().getChanges() || {}).length;
        },
        isSubmitting() {
          return this.getStore().isSubmitting();
        },
        setValues: values => {
          this.getStore().setValues(values);
        },
        showError: (name, errorText) => {
          this.getStore().showFieldError(name, errorText);
        },
        getStore: () => {
          return this.getStore();
        },
        disableForm: () => {
          this.getStore().setDisabledStatus(true);
        },
        enableForm: () => {
          this.getStore().setDisabledStatus(false);
        },
        submit: () => {
          this.getStore().markAsSubmitting();
        },
        done: () => {
          this.getStore().markAsSubmitted();
        },
        setInitValues: (values, isSilent) => {
          Object.keys(values).forEach(name => {
            this.getStore().initField(name, values[name], isSilent);
          });
        },
      },
    };
  }

  componentDidMount() {
    const store = this.getStore();

    this.setState(this.getState(this.form, this.props));

    this._unregister = store._dispatcher.register(() => {
      if (this.hasMapStateToProps) {
        this.setState(this.getState(this.form, this.props));
      }
    });
  }

  componentWillUnmount() {
    this.form = null;
    this._unregister && this._unregister();
  }

  configure(props) {
    const {
      name = 'form',
      schema,
      errorCodes = {},
      errorStrategy,
      mapStateToProps,
    } = props;

    this.formName = name;

    if (schema) {
      this.validator = new Validator();
      this.validator.schema = schema;
    }

    this.form = new Store({
      name,
      validator: this.validator,
      errorCodes,
      errorStrategy,
    });

    this.hasMapStateToProps = typeof mapStateToProps === 'function';
    this.mapStateToProps = mapStateToProps;
  }

  getStore() {
    if (!this.form) {
      throw new Error(
        `Form error: form state does't exist, you must check component unmount status in asynchronous function`,
      );
    }

    return this.form;
  }

  getState(form, props) {
    return this.hasMapStateToProps
      ? this.mapStateToProps(form, { ...props }) || {}
      : {};
  }

  getFormName() {
    return this.formName;
  }

  onSubmit() {
    const { onSubmit } = this.props;

    this.getStore().markAsSubmitted();
    onSubmit && onSubmit(this.getChildContext().formState);
  }

  render() {
    return this.props.children({
      ...this.props,
      ...this.state,
      onSubmit: this.onSubmit,
      form: this.getChildContext().formState,
    });
  }
}

export default Form;
