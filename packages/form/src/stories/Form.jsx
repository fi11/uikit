import React, { Component } from 'react';

export default class Form extends Component {
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