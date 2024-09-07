import { Path, PathValue } from './types';

enum PathItemType {
  Object,
  Array,
}

type PathItem = {
  type: PathItemType;
  key: string;
};

const ARRAY_KEY_REG = /\[\d+\]/g;

const isObject = (value: any) => typeof value === 'object';
const isArray = (value: any) => Array.isArray(value);

const deepClone = <T>(source: T): T => {
  if (typeof source !== 'object') {
    return source;
  }
  if (source instanceof Date) {
    return new Date(source.getTime()) as T;
  }
  if (source instanceof Map) {
    const mapClone = new Map();
    source.forEach((value, key) => {
      mapClone.set(deepClone(key), deepClone(value));
    });
    return mapClone as T;
  }
  if (source instanceof Set) {
    const setClone = new Set();
    source.forEach((value) => {
      setClone.add(deepClone(value));
    });
    return setClone as T;
  }
  if (Array.isArray(source)) {
    const arrayClone = source.map((item) => deepClone(item));
    return arrayClone as T;
  }
  const objClone: { [key: string]: any } = {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      objClone[key] = deepClone(source[key]);
    }
  }
  return objClone as T;
};

export const getPathItems = (path: string) => {
  const pathItems: PathItem[] = [];
  path.split('.').forEach((path) => {
    const objectKey = path.replace(ARRAY_KEY_REG, '');
    pathItems.push({
      type: PathItemType.Object,
      key: objectKey,
    });
    path.match(ARRAY_KEY_REG)?.forEach((arrayKey) => {
      pathItems.push({
        type: PathItemType.Array,
        key: arrayKey.replace(/\[|\]/g, ''),
      });
    });
  });
  return pathItems;
};

export const pathGet = <T, P extends Path<T>>(
  object: T,
  path: P,
): PathValue<T, P> => {
  let value: any = object;
  getPathItems(path).forEach((pathItem) => {
    // access to the next level if is object or array
    value = isObject(value) || isArray(value) ? value[pathItem.key] : undefined;
  });
  return value;
};

export const pathSet = <T, P extends Path<T>>(
  object: T,
  path: P,
  value: PathValue<T, P>,
): void => {
  let current: any = object;
  const pathItems = getPathItems(path);
  pathItems.forEach((pathItem, index) => {
    // set value if is the last path
    if (index === pathItems.length - 1) {
      current[pathItem.key] = value;
    } else {
      // create struct if not exists
      if (current[pathItem.key] === undefined) {
        current[pathItem.key] =
          pathItems[index + 1].type === PathItemType.Array ? [] : {};
      }
      current = current[pathItem.key];
    }
  });
};

export const pathSetImmutable = <T, P extends Path<T>>(
  object: T,
  path: P,
  value: PathValue<T, P>,
) => {
  const clonedObject = deepClone(object);
  pathSet(clonedObject, path, value);
  return clonedObject;
};
