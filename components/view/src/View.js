import styled from '@uikit/styled';
import DI from '@uikit/di';

const View = styled({});
DI.provide('@uikit/View', null, { fabric: () => View });

export default View;
