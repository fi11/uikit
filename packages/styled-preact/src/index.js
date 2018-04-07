import '@uikit/stylesheet';
import styled from '@uikit/styled';
import '@uikit/preact';

import DI from '@uikit/di';
import getView from './getView';

DI.provide('@uikit/getView', null, { fabric: () => getView });

export default styled;
