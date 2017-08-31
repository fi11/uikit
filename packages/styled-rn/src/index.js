import '@uikit/styled';
import '@uikit/react';

import DI from '@uikit/di';

import getView from './getView';
import compileStyles from './compileStyles';
import createStyleProp from './createStyleProp';

DI.provide('@uikit/getView', null, { fabric: () => getView });
DI.provide('@uikit/compileStyles', null, { fabric: () => compileStyles });
DI.provide('@uikit/createStyleProp', null, { fabric: () => createStyleProp });
