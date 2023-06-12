import { pathGet, pathSetImmutable } from './utils';

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

describe('utils', () => {
  it('pathGet should work correctly', () => {
    expect(pathGet(TEST_OBJECT, 'parent.value')).toEqual(1);
    expect(pathGet(TEST_OBJECT, 'parent.array[0]')).toEqual(1);
    expect(pathGet(TEST_OBJECT, 'parent.autoCreateObject.value')).toEqual(
      undefined,
    );
    expect(pathGet(TEST_OBJECT, 'parent.autoCreateArray[0].value')).toEqual(
      undefined,
    );
  });

  it('pathSet/pathSetImmutable should work correctly', () => {
    expect(pathSetImmutable(TEST_OBJECT, 'parent.value', 2)).toMatchObject({
      parent: { value: 2 },
    });

    expect(pathSetImmutable(TEST_OBJECT, 'parent.array[1]', 2)).toMatchObject({
      parent: { array: [1, 2] },
    });

    expect(
      pathSetImmutable(TEST_OBJECT, 'parent.autoCreateObject.value', 1),
    ).toMatchObject({
      parent: { autoCreateObject: { value: 1 } },
    });

    expect(
      pathSetImmutable(TEST_OBJECT, 'parent.autoCreateArray[0].value', 1),
    ).toMatchObject({
      parent: { autoCreateArray: [{ value: 1 }] },
    });
  });
});
