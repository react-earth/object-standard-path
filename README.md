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

type Object = {
  value: string;
  array: {
    value: string;
  }[];
};

type ObjectPath = Path<Object>;
// result: "value" | "array" | `array[${number}]` | `array[${number}].value`

type ObjectPathValue = PathValue<Object, 'array[0]'>;
// result: { value: string }
```

### Use utils: objectGet, objectSet

```typescript
import { objectGet, objectSet } from 'object-standard-path';

const object = {
  array: [
    {
      value: 1,
    },
  ],
};

const result = objectGet(object, 'array[0].value');
// result: 1

objectSet(object, 'array[0].value', 2);
// result: { array: [{ value: 2 }] }
```
