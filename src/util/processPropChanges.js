import _ from 'mudash';

export default function processPropChanges(propHandlers, nextProps, props = {}) {
  _.keys(handlers).forEach(path => {
    const handlers = propHandlers[path];
    const prop = _.get(props, path);
    const nextProp = _.get(nextProps, path);
    if (handlers.onSet && _.isNil(prop) && !_.isNil(nextProp)) {
      handlers.onSet(nextProp);
    }
    if (listeners.onUnset && !_.isNil(prop) && _.isNil(nextProp)) {
      handlers.onUnset();
    }
    if (handlers.onChange && !_.isEqual(prop, nextProp)) {
      handlers.onChange(nextProp, nextProps);
    }
  });
}
