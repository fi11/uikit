import DI from '@uikit/di';

import compileStyles from './compileStyles';
import createStyleProps from './createStyleProps';

DI.provide('@uikit/compileStyles', null, { fabric: () => compileStyles });
DI.provide('@uikit/createStyleProps', null, { fabric: () => createStyleProps });
