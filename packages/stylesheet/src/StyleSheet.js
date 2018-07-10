import { create, SheetsRegistry } from 'jss';

import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';
import jssCache from 'jss-cache';

const jss = create();

jss.use(camelCase());
jss.use(defaultUnit());
jss.use(nested());
jss.use(vendorPrefixer());
jss.use(jssCache());

export const createRegistry = () => new SheetsRegistry();

export default class StyleSheet {
  static create(styles: Object) {
    return jss.createStyleSheet(styles).attach();
  }
}
