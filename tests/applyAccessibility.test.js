const {applyAccessibility, defaultConfig} = require('../index');
const { objMock, objMockAccessible } = require('../mocks/objMock');
const { benefitMock, benefitMockAccessible } = require('../mocks/benefitMock');

let testObj;

describe('Accessible object', () => {
  beforeAll(() => {
    testObj = applyAccessibility(objMock);
  });

  test('should be truthy obj and create accessibility property', () => {
    expect(testObj).toBeTruthy();
    expect(testObj).toHaveProperty(defaultConfig.propName);
  });

  test('should have one more property', () => {
    expect(Object.keys(testObj).length).toBe(Object.keys(objMock).length + 1);
  });

  test('should keep all nested objects keys', () => {
    expect(Object.keys(testObj.address).length).toBe(
      Object.keys(testObj.accessibility.address).length
    );
    expect(Object.keys(testObj.address).length).toBe(
      Object.keys(objMock.address).length
    );
  });

  test('should keep arrays length', () => {
    expect(testObj.arr.length).toBe(testObj.accessibility.arr.length);
    expect(testObj.arr.length).toBe(objMock.arr.length);

    expect(testObj.arr[4].length).toBe(testObj.accessibility.arr[4].length);
    expect(testObj.arr[4].length).toBe(objMock.arr[4].length);
  });

  test('should translate $ and % symbols', () => {
    let testSymbols = {
      text: 'Test% $ymbols $100, $200 , $ 300 and 50%, 60% 70 %',
    };
    testSymbols = applyAccessibility(testSymbols);

    expect(testSymbols.accessibility.text).toBe(
      'Test porciento pesos ymbols pesos 100, pesos 200 , pesos 300 and 50 porciento , 60 porciento 70 porciento'
    );
    expect(testSymbols.text).toBe(
      'Test% $ymbols $100, $200 , $ 300 and 50%, 60% 70 %'
    );
  });

  test('should not translate emails and urls even if them have dictionary keys', () => {
    // Generic obj
    expect(testObj.link).toBe(testObj.accessibility.link);
    expect(testObj.link).toBe(objMock.link);

    expect(testObj.email).toBe(testObj.accessibility.email);
    expect(testObj.email).toBe(objMock.email);
  });

  test('should keep boolean values', () => {
    expect(testObj.active).toBeTruthy();
    expect(testObj.accessibility.active).toBeTruthy();
    expect(testObj.online).toBeFalsy();
    expect(testObj.accessibility.online).toBeFalsy();
    expect(testObj.active).toBe(testObj.accessibility.active);
    expect(testObj.online).toBe(testObj.accessibility.online);
    expect(testObj.online).toBe(objMock.online);
    expect(testObj.online).toBe(objMock.online);
  });

  test('should keep numbers', () => {
    expect(testObj.price).not.toBeNaN();
    expect(testObj.accessibility.price).not.toBeNaN();
    expect(testObj.arr[4][1]).not.toBeNaN();
    expect(testObj.accessibility.arr[4][1]).not.toBeNaN();
    expect(testObj.price).toBe(200);
    expect(testObj.accessibility.price).toBe(200);
    expect(testObj.arr[4][1]).toBe(200);
    expect(testObj.accessibility.arr[4][1]).toBe(200);
  });

  test('should not modify the rest of the object', () => {
    const { accessibility, ...rest } = testObj;
    expect(objMock).toEqual(rest);
  });

  test('should be equal to accessible mock', () => {
    expect(testObj).toEqual(objMockAccessible);
  });
});
