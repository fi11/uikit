import { create } from 'jss';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';

const jss = create();

jss.use(camelCase());
jss.use(defaultUnit());
jss.use(nested());
jss.use(vendorPrefixer());

export default class StyleSheet {
  static create(styles: Object) {
    const sheet = jss.createStyleSheet(styles).attach();

    return sheet.classes;
  }

  static getServerSideStyleSheets() {
    return jss.sheets.toString();
  }
}
