import { configure } from '@storybook/react';

[
  require.context('../src', true, /story\.jsx$/),
].forEach(req => configure(() => req.keys().forEach(req), module));

