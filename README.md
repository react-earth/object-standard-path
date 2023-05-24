![title](media/repo-header.svg)

# Quick Features 🥳

- Standard path, e.g. `a.b.c[0].d`.
- Provider types & utils Path, PathValue, objectGet, objectSet.
- Built with typescript, type protection, code autocompletion, make your app robust.
- No dependencies, small package size.

# How to use 📖

### Install package

```shell
npm install object-standard-path
```

### Use types: Path, PathValue

```typescript
import { Path, PathValue } from 'object-standard-path';

type Test = {
  value: string;
  array: {
    value: string;
  }[];
};

type TestPath = Path<Test>;
// result: "value" | "array" | `array[${number}]` | `array[${number}].value`

type TestPathValue = PathValue<Test, 'array[0]'>;
// result: { value: string }
```

### Use utils: pathGet, pathSet

```typescript
import { pathGet, pathSet } from 'object-standard-path';

const object = {
  array: [
    {
      value: 1,
    },
  ],
};

const result = pathGet(object, 'array[0].value');
// result: 1

pathSet(object, 'array[0].value', 2);
// result: { array: [{ value: 2 }] }
```
