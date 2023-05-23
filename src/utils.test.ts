import { objectGet, objectSet } from './utils';

type TestObjectType = {
  parent: {
    value: number;
    array: number[];
    autoCreateObject?: {
      value?: number;
    };
    autoCreateArray?: {
      value?: number;
    }[];
  };
};

const TEST_OBJECT: TestObjectType = {
  parent: {
    value: 1,
    array: [1],
  },
};

const clone = <T>(obj: T) => JSON.parse(JSON.stringify(obj)) as T;

describe('utils', () => {
  it('objectGet should work correctly', () => {
    expect(objectGet(TEST_OBJECT, 'parent.value')).toEqual(1);
    expect(objectGet(TEST_OBJECT, 'parent.array[0]')).toEqual(1);
    expect(objectGet(TEST_OBJECT, 'parent.autoCreateObject.value')).toEqual(
      undefined,
    );
    expect(objectGet(TEST_OBJECT, 'parent.autoCreateArray[0].value')).toEqual(
      undefined,
    );
  });

  it('objectSet should work correctly', () => {
    const testValue = clone(TEST_OBJECT);
    objectSet(testValue, 'parent.value', 2);
    expect(testValue).toMatchObject({ parent: { value: 2 } });

    const testArray = clone(TEST_OBJECT);
    objectSet(testArray, 'parent.array[1]', 2);
    expect(testArray).toMatchObject({ parent: { array: [1, 2] } });

    const testAutoCreateObject = clone(TEST_OBJECT);
    objectSet(testAutoCreateObject, 'parent.autoCreateObject.value', 1);
    expect(testAutoCreateObject).toMatchObject({
      parent: { autoCreateObject: { value: 1 } },
    });

    const testAutoCreateArray = clone(TEST_OBJECT);
    objectSet(testAutoCreateArray, 'parent.autoCreateArray[0].value', 1);
    expect(testAutoCreateArray).toMatchObject({
      parent: { autoCreateArray: [{ value: 1 }] },
    });
  });
});
