![title](media/repo-header.svg)

<a href="https://github.com/react-earth/object-standard-path" target="\_parent">
  <img alt="star" src="https://img.shields.io/github/stars/react-earth/object-standard-path.svg?style=social&label=Star" />
</a>
<a href="https://www.npmjs.com/package/object-standard-path" target="\_parent">
  <img src="https://img.shields.io/npm/v/object-standard-path" alt="version">
</a>
<a href="https://www.npmjs.com/package/object-standard-path" target="\_parent">
  <img alt="minzip" src="https://img.shields.io/bundlephobia/minzip/object-standard-path" />
</a>
<a href="https://www.npmjs.com/package/object-standard-path" target="\_parent">
  <img alt="downloads" src="https://img.shields.io/npm/dm/object-standard-path.svg" />
</a>
<a href="https://github.com/react-earth/react-happy-form" target="\_parent">
  <img alt="license" src="https://img.shields.io/npm/l/react-happy-form" />
</a>

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
