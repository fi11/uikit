import React from 'react';
import createStyled from '@uikit/styled';

import getView from './getView';
import compileStyles from './compileStyles';
import createStyleProp from './createStyleProp';

export const styled = createStyled({
  createElement: React.createElement.bind(React),
  compileStyles,
  getView: () => getView(styled),
  createStyleProp,
});

export default styled;