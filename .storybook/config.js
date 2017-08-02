import { configure } from '@storybook/react';

[
  require.context('../packages', true, /story\.jsx$/),
  require.context('../components', true, /story\.jsx$/),
].forEach(req => configure(() => req.keys().forEach(req), module));

