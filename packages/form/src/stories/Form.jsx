import React, { Component } from 'react';

export default class Form extends Component {
  componentDidMount() {
    const { form, hasError, isDisabled, isValid } = this.props;
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
        isSubmitting: form.isSubmitting(),
      });
    });
  }
  render() {
    const { children, isValid } = this.props;
    return (
      <div>
        <div>{children}</div>
        { typeof isValid !== 'undefined' && (
          <div style={{ marginTop: 20 }}>{isValid ? '👍' : '👎'}</div>
        )}
      </div>
    )
  }
}