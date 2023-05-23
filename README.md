![title](media/repo-header.svg)

# Quick Features 🥳

- Standard path, e.g. `a.b.c[0].d`.
- Provider types & utils Path, PathValue, objectGet, objectSet.
- Built with typescript, type protection, code autocompletion, make your app robust.
- No dependencies, small package size.

# How to use 📖

### Install package

```bash
npm install object-standard-path
```

### Use types: Path, PathValue

```typescript
type Object = {
  value: string;
  array: {
    value: string;
  }[];
};

type ObjectPath = Path<Object>;
/**
 * You will get path type:
 * "value" | "array" | `array[${number}]` | `array[${number}].value`
 */

type ObjectPathValue = PathValue<Object, 'array[0]'>;
/**
 * You will get path value type:
 * { value: string }
 */
```

### Use utils: objectGet, objectSet

```typescript
const object = {
  array: [
    {
      value: 1,
    },
  ],
};

// Provides type protection
const result /* number */ = objectGet(
  object,
  'array[0].value' /* valid path */,
);
objectSet(object, 'array[0].value' /* valid path */, 2 /* number*/);
```
