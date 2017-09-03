import DI from '@uikit/di';
import getContextShape from './getContextShape';
import Validator from './Validator';
import Store from './Store';

export default (
  FormComponent,
  { name = 'form', schema, errorCodes = {}, errorStrategy } = {},
  mapStateToProps,
) => {
  const hasMapStateToProps = typeof mapStateToProps === 'function';
  const Component = DI.get('@uikit/PureComponent');

  const getState = (form, props) => {
    return hasMapStateToProps ? mapStateToProps(form, { ...props }) || {} : {};
  };

  return class FormContainer extends Component {
    constructor(props, ...args) {
      super(props, ...args);

      let validator;

      if (schema) {
        validator = new Validator();
        validator.schema = schema;
      }

      this.form = new Store({
        name,
        validator,
        errorCodes,
        errorStrategy,
      });

      this._getFormName = () => name;

      this.state = getState(this.form, props);
      this.onSubmit = this.onSubmit.bind(this);
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
        },
      };
    }

    getStore() {
      if (!this.form) {
        throw new Error(
          `Form error: form state does't exist, you must check component unmount status in asynchronous function`,
        );
      }

      return this.form;
    }

    componentDidMount() {
      const store = this.getStore();

      this.setState(getState(this.form, this.props));

      this._unregister = store._dispatcher.register(() => {
        if (hasMapStateToProps) {
          this.setState(getState(this.form, this.props));
        }
      });
    }

    componentWillUnmount() {
      this.form = null;

      this._unregister && this._unregister();
    }

    onSubmit() {
      const { onSubmit } = this.props;

      this.getStore().markAsSubmitted();
      onSubmit && onSubmit();
    }

    render() {
      const createElement = DI.get('@uikit/createElement');
      return createElement(FormComponent, {
        ...this.props,
        ...this.state,
        onSubmit: this.onSubmit,
        form: this.getChildContext().formState,
      });
    }
  };
};
