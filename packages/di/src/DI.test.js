import DI from './index';

class Foo {}

class Bar {
  foo;
}

describe('test', () => {
  afterEach(() => {
    DI.dropAll();
  });

  it('simple get', () => {
    DI.provide('Foo', Foo);
    const sut = DI.get('Foo');

    expect(sut instanceof Foo).toBe(true);
    expect(sut !== DI.get('Foo')).toBe(true);
  });

  it('get as singleton', () => {
    DI.provide('Foo', Foo, { isSingleton: true });
    const sut1 = DI.get('Foo');
    const sut2 = DI.get('Foo');

    expect(sut1 === sut2).toBe(true);
  });

  // it('provide with fabric', () => {
  //   DI.provide('@uikit/StyleSheet', { fabric: () => StyleSheet });
  // })
});
