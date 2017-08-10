import DI from '@uikit/di';
import styled from './styled';

DI.provide('@uikit/styled', null, { fabric: () => styled });

export default styled;
