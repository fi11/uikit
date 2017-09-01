import '@uikit/react';
import React from 'react';
import { storiesOf } from '@storybook/react';

import { connectField, connectForm, connect  } from '../index';
import Form from './Form';
import TextField from './TextField';
import Button from './Button';
import schema from './schema';
import errorCodes from './errorCodes';

const TextFieldContainer = connectField(TextField);
const Submit = connect(Button, (form) => ({ disabled: !form.isValid() }));
const FormContainer = connectForm(Form, { schema, errorCodes });

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
