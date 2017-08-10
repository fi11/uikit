import DI from '@uikit/di';
import StyleSheet from './StyleSheet';

DI.provide('@uikit/StyleSheet', null, { fabric: () => StyleSheet });