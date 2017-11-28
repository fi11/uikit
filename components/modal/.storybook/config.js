import { configure } from '@storybook/react';
import '@uikit/styled-react';

[
  require.context('../src', true, /story\.js$/),
].forEach(req => configure(() => req.keys().forEach(req), module));

