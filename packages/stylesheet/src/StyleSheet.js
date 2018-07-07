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

const sheets = new SheetsRegistry();
export const getSSRStyleSheets = () => sheets.toString();

export default class StyleSheet {
  static create(styles: Object) {
    const sheet = jss.createStyleSheet(styles).attach();
    sheets.add(sheet);

    return sheet.classes;
  }

  static getSSRStyleSheets = getSSRStyleSheets;
}
