import React from 'react';
import { compileStyles, createStyleProp } from '@uikit/stylesheet';
import createStyled from '@uikit/styled';

import getView from './getView';

export const styled = createStyled({
  createElement: React.createElement.bind(React),
  compileStyles,
  getView: () => getView(styled),
  createStyleProp,
});

export default styled;

export const withTag = (target, tagName) => {
  const result = styled(target, {});
  result.setTagName(tagName);

  return result;
};
