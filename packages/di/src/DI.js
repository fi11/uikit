let interfacesBank;
let singletonsBank;

const initBanks = () => {
  interfacesBank = {};
  singletonsBank = {};
};

initBanks();

export default class DIManager {
  static provide(Interface, Class, config = {}) {
    if (Class && typeof Class === 'object') {
      config = Class;
    }

    interfacesBank[Interface] = { Class, config };
    return Class || Interface;
  }

  static get(Interface, args = null) {
    if (!Interface) {
      throw new Error(
        'DI error: Interface argument is required, may be you forget export class from module',
      );
    }

    if (args && !Array.isArray(args)) {
      throw new Error('DI error: "args" argument must be an Array');
    }

    const decl = interfacesBank[Interface];

    if (!decl) {
      throw new Error(
        `DI error: you must provide class or instance for "${Interface}"`,
      );
    }

    const config = decl.config || {};

    args = args || config.args || [];
    let instance = config.isSingleton && singletonsBank[Interface];

    if (!instance) {
      const TargetClass = decl.Class;

      if (
        typeof TargetClass !== 'function' &&
        typeof config.fabric !== 'function'
      ) {
        throw new Error(
          `DI error: you must provide "${Interface}" class before inject it, may be you forget export it`,
        );
      }

      if (typeof config.fabric === 'function') {
        instance = config.fabric();
      } else {
        instance = new TargetClass(...args);
      }

      if (config.deps) {
        Object.keys(config.deps).forEach(propName => {
          try {
            instance[propName] = DIManager.get(config.deps[propName]);
          } catch (err) {
            if (
              typeof console !== 'undefined' &&
              typeof console.error === 'function'
            ) {
              console.error(err);
            }

            throw new Error(
              `DI error: can't inject ${propName} for ${TargetClass.name ||
                'Unknown'} class`,
            );
          }
        });
      }

      if (config.isSingleton) {
        singletonsBank[Interface] = instance;
      }
    }

    return instance;
  }

  static dropAll() {
    initBanks();
  }

  static drop(Interface) {
    if (!interfacesBank[Interface]) {
      throw new Error(
        'DIManager error: before drop target, you must provide this target',
      );
    }

    interfacesBank[Interface] = null;

    if (singletonsBank[Interface]) {
      singletonsBank[Interface] = null;
    }
  }
}
