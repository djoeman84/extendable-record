export function flatten(objects) {
  return objects.reduce((prev, nextObj) => Object.assign(prev, nextObj), {});
}

export function getDetaultPropertiesForInstance(instance) {
  const constructors = [];
  for (let o = Object.getPrototypeOf(instance); o != null; o = Object.getPrototypeOf(o)) {
    constructors.unshift(o.constructor);
  }
  const defaultPropertiesList = constructors.map(o => o.defaultProperties);
  return flatten(defaultPropertiesList);
}
