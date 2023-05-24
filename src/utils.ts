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
