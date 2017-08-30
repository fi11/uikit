import DI from '@uikit/di';
import StyleSheet from './StyleSheet';

import compileStyles from './compileStyles';
import createStyleProps from './createStyleProps';

DI.provide('@uikit/StyleSheet', null, { fabric: () => StyleSheet });
DI.provide('@uikit/compileStyles', null, { fabric: () => compileStyles });
DI.provide('@uikit/createStyleProps', null, { fabric: () => createStyleProps });