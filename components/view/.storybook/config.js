import { configure } from '@storybook/react';

[
  //require.context('../packages', true, /story\.jsx$/),
  require.context('../src', true, /story\.jsx$/),
].forEach(req => configure(() => req.keys().forEach(req), module));

