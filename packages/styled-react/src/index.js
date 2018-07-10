import React from 'react';
import { compileStyles, createStyleProp } from '@uikit/stylesheet';
export { createRegistry } from '@uikit/stylesheet';
import createStyled from '@uikit/styled';
import getView from './getView';

let Provider;
let Consumer;

try {
  const Context = React.createContext({});
  Consumer = Context.Consumer;
  Provider = Context.Provider;
} catch (e) {
  console.error(e);
}

export const StyledProvider = Provider;

export const styled = createStyled({
  createElement: React.createElement.bind(React),
  compileStyles,
  getView: () => getView(styled),
  createStyleProp,
  ContextConsumer: Consumer,
});

export default styled;

export const withTag = (target, tagName) => {
  const result = styled(target, {});
  result.setTagName(tagName);

  return result;
};
