import DI from '@uikit/di';
import getContextShape from './getContextShape';
import Validator from './Validator';

export default (
  FormComponent,
  form,
  { schema, errorCodes = {} } = {},
  mapStateToProps,
) => {
  const hasMapStateToProps = typeof mapStateToProps === 'function';
  const Component = DI.get('@uikit/Component');

  return class FormContainer extends Component {
    constructor(props, ...args) {
      super(props, ...args);

      let validator;

      if (schema) {
        validator = new Validator();
        validator.schema = schema;
      }

      const formName = form.init({ name: props.formName, validator, errorCodes });
      this._getFormName = () => formName;

      this.state = hasMapStateToProps ? mapStateToProps(form, { ...props }) || {} : {};

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
          registerCallback: (callback) => {
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
            this.getStore().markAsSubmitted();
          },
        },
      };
    }

    getStore() {
      return form.getStore(this._getFormName());
    }

    componentDidMount() {
      const store = this.getStore();

      this._unregister = store._dispatcher.register(() => {
        if (hasMapStateToProps) {
          const newProps = mapStateToProps(form, { ...(this.props || {}) });

          if (newProps) {
            this.setState(newProps);
          }
        }
      });
    }

    componentWillUnmount() {
      form.removeStore(this._getFormName());

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
