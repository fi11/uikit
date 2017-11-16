import DI from '@uikit/di';
import styled from './styled';

DI.provide('@uikit/styled', null, { fabric: () => styled });

export const getSSRStyleSheets = () => DI.get('@uikit/getSSRStyleSheets')();
export const withTag = (target, tagName) => {
  const result = styled(target, {});
  result.setTagName(tagName);

  return result;
};
export default styled;
