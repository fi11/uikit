import DI from '@uikit/di';

import compileStyles from './compileStyles';
import createStyleProp from './createStyleProp';
import { getSSRStyleSheets } from './StyleSheet';

DI.provide('@uikit/compileStyles', null, { fabric: () => compileStyles });
DI.provide('@uikit/createStyleProp', null, { fabric: () => createStyleProp });
DI.provide('@uikit/getSSRStyleSheets', null, {
  fabric: () => getSSRStyleSheets,
});
