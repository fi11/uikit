import DI from '@uikit/di';
import styled from './styled';

DI.provide('@uikit/styled', null, { fabric: () => styled });

export const getSSRStyleSheets = () => DI.get('@uikit/getSSRStyleSheets')();
export default styled;
