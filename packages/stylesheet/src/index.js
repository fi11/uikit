import DI from '@uikit/di';

import compileStyles from './compileStyles';
import createStyleProp from './createStyleProp';

DI.provide('@uikit/compileStyles', null, { fabric: () => compileStyles });
DI.provide('@uikit/createStyleProp', null, { fabric: () => createStyleProp });
