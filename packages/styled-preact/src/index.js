import '@uikit/stylesheet';
import '@uikit/styled';
import '@uikit/preact';

import DI from '@uikit/di';
import getView from './getView';

DI.provide('@uikit/getView', null, { fabric: () => getView });
