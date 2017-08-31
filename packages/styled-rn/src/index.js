import '@uikit/styled';
import '@uikit/react';

import DI from '@uikit/di';

import getView from './getView';
import compileStyles from './compileStyles';
import createStyleProps from './createStyleProps';

DI.provide('@uikit/getView', null, { fabric: () => getView });
DI.provide('@uikit/compileStyles', null, { fabric: () => compileStyles });
DI.provide('@uikit/createStyleProps', null, { fabric: () => createStyleProps });
