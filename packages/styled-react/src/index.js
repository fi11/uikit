import '@uikit/stylesheet';
import '@uikit/styled';
import '@uikit/react';
import styled from '@uikit/styled';

import DI from '@uikit/di';
import getView from './getView';

DI.provide('@uikit/getView', null, { fabric: () => getView });

export default styled;