import '@uikit/react';
import React from 'react';
import { storiesOf } from '@storybook/react';

import { createContainer, createFieldContainer, createFormContainer } from '../index';
import Form from './Form';
import TextField from './TextField';
import Button from './Button';
import schema from './schema';
import errorCodes from './errorCodes';
import { errorStrategies } from '../index';

const TextFieldContainer = createFieldContainer(TextField);
const Submit = createContainer(Button, (form, { title, isDisabledOnInvalid = true } = {}) => ({
  disabled: (isDisabledOnInvalid && !form.isValid()) || form.isSubmitting(),
  onClick: () => {
    form.submit();

    setTimeout(() => {
      form.done();
    }, 2000);
  },
  title: form.isSubmitting() ? 'submitting...' : title,
}));

const FormContainer = createFormContainer(Form, { schema, errorCodes }, (form) => ({ isValid: form.isValid() }));
const OnlyOnSubmit = createFormContainer(Form, { schema, errorCodes, errorStrategy: errorStrategies.ON_SUBMIT });
const OnlyOnBlur = createFormContainer(Form, { schema, errorCodes, errorStrategy: errorStrategies.ON_BLUR });
const OnlyOnBlurAndSubmit = createFormContainer(Form, { schema, errorCodes, errorStrategy: errorStrategies.ON_BLUR_AND_SUBMIT });
const Submitting = createFormContainer(Form, { schema, errorCodes  });

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
        <TextFieldContainer value={"123"} name="foo" />
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
    <FormContainer>
      <div>
        <TextFieldContainer value={''} name="foo" />
        <TextFieldContainer value={''}  name="bar" />
        <Submit isDisabledOnInvalid={false} title="submit" />
      </div>
    </FormContainer>,
  )
  .add('only on submitted', () =>
    <OnlyOnSubmit>
      <div>
        <TextFieldContainer value={''} name="foo" />
        <TextFieldContainer value={''}  name="bar" />
        <Submit isDisabledOnInvalid={false} title="submit" />
      </div>
    </OnlyOnSubmit>,
  )
  .add('only on blur', () =>
    <OnlyOnBlur>
      <div>
        <TextFieldContainer value={''} name="foo" />
        <TextFieldContainer value={''}  name="bar" />
        <Submit isDisabledOnInvalid={false} title="submit" />
      </div>
    </OnlyOnBlur>,
  )
  .add('only on blur and submit', () =>
    <OnlyOnBlurAndSubmit>
      <div>
        <TextFieldContainer value={''} name="foo" />
        <TextFieldContainer value={''}  name="bar" />
        <Submit isDisabledOnInvalid={false} title="submit" />
      </div>
    </OnlyOnBlurAndSubmit>,
  )
  .add('submitting', () =>
    <Submitting>
      <div>
        <TextFieldContainer value={"123"} name="foo" />
        <TextFieldContainer value={"bar"}  name="bar" />
        <Submit isDisabledOnInvalid={false} title="submit" />
      </div>
    </Submitting>,
  );
