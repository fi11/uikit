import '@uikit/react';
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import FormState, { rules } from './index';

console.log('#### FormState', FormState);
const form = new FormState();

const customRule = (code, eq) => {
  return (key, data) => {
    return { code: code, isValid: data[key] === eq};
  };
};

const schema = {
  foo: [rules.required(), customRule('oops :(', '123')],
};

const errorCodes = {
  REQUIRED: (name) => `field "${name}" is required`,
};

const TextField = ({ value, onChange, onBlur, onFocus, errorText, disabled }) => (
  <div style={{ marginBottom: 9 }} >
    <input value={value} onChange={({ target }) => onChange(target.value)} onBlur={onBlur} onFocus={onFocus} disabled={disabled} />
    <span style={{ color: 'red', marginLeft: 8 }}>{errorText}</span>
  </div>
);


const Button = ({ title, ...props }) => (
  <button {...props}>{title}</button>
);

const TextFieldContainer = form.createFieldContainer(TextField);
const Submit = form.createContainer(Button, (form) => ({ disabled: !form.isValid() }));

class Form extends Component {
  componentDidMount() {
    const { form, hasError, isDisabled } = this.props;
    if (hasError) {
      setTimeout(() => {
        form.showError('foo', 'ops!');
      }, 2000);
    }

    if (isDisabled) {
      setTimeout(() => {
        form.disableForm();
        setTimeout(() => {
          form.enableForm();
        }, 2000)
      }, 2000);
    }

    form.registerCallback((payload) => {
      console.log('On form event:', {
        payload,
        values: form.getValues(),
        changes: form.getChanges(),
        errors: form.getErrors(),
        isValid: form.isValid(),
        isDisabled: form.isDisabled(),
      });
    });
  }
  render() {
    return this.props.children;
  }
}

const FormContainer = form.createFormContainer(Form, { schema, errorCodes });
storiesOf('Test', module)
  .add('main', () =>
    <FormContainer>
      <div>
        <TextFieldContainer value={"foo"} name="foo" />
        <TextFieldContainer value={"bar"}  name="bar" />
        <Submit title="submit" />
      </div>
    </FormContainer>,
  )
  .add('show error', () =>
    <FormContainer hasError>
      <div>
        <TextFieldContainer value={"foo"} name="foo" />
        <TextFieldContainer value={"bar"}  name="bar" />
        <Submit title="submit" />
      </div>
    </FormContainer>,
  )
  .add('disable', () =>
    <FormContainer isDisabled>
      <div>
        <TextFieldContainer value={"foo"} name="foo" />
        <TextFieldContainer value={"bar"}  name="bar" />
        <Submit title="submit" />
      </div>
    </FormContainer>,
  )
  .add('submitted', () =>
    <FormContainer isDisabled>
      <div>
        <TextFieldContainer value={"foo"} name="foo" />
        <TextFieldContainer value={"bar"}  name="bar" />
        <Submit title="submit" />
      </div>
    </FormContainer>,
  );
