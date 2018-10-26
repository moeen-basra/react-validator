// @flow
import { find, isCallable, isNullOrUndefined, isTextInput } from './index';

// Gets the model object on the vnode.
export function findModel (vnode) {
  if (!vnode.data) {
    return null;
  }

  // Component Model
  if (vnode.data.model) {
    return vnode.data.model;
  }

  return !!(vnode.data.directives) && find(vnode.data.directives, d => d.name === 'model');
}

export function findModelNodes (vnode) {
  if (findModel(vnode)) {
    return [vnode];
  }

  if (Array.isArray(vnode.children)) {
    return vnode.children.reduce((nodes, node) => {
      const candidates = [...findModelNodes(node)];
      if (candidates.length) {
        nodes.push(...candidates);
      }

      return nodes;
    }, []);
  }

  return [];
}

// Resolves v-model config if exists.
export function findModelConfig (vnode) {
  if (!vnode.componentOptions) return null;

  return vnode.componentOptions.Ctor.options.model;
};

// Adds a listener to vnode listener object.
export function addListenerToObject (obj, eventName, handler) {
  // Has a single listener.
  if (isCallable(obj[eventName])) {
    const prevHandler = obj[eventName];
    obj[eventName] = [prevHandler];
  }

  // has other listeners.
  if (Array.isArray(obj[eventName])) {
    obj[eventName].push(handler);
    return;
  }

  // no listener at all.
  if (isNullOrUndefined(obj[eventName])) {
    obj[eventName] = [handler];
  }
}

// Adds a listener to a native HTML vnode.
function addListenerToHTMLNode (node, eventName, handler) {
  if (isNullOrUndefined(node.data.on)) {
    node.data.on = {};
  }

  addListenerToObject(node.data.on, eventName, handler);
}

// Adds a listener to a Vue component vnode.
function addListenerToComponentNode (node, eventName, handler) {
  /* istanbul ignore next */
  if (!node.componentOptions.listeners) {
    node.componentOptions.listeners = {};
  }

  addListenerToObject(node.componentOptions.listeners, eventName, handler);
};

export function addListenerToVNode (vnode, eventName, handler) {
  if (vnode.componentOptions) {
    addListenerToComponentNode(vnode, eventName, handler);
  }

  addListenerToHTMLNode(vnode, eventName, handler);
};

// Determines if `change` should be used over `input` for listeners.
export function getInputEventName (vnode, model) {
  // Is a component.
  if (vnode.componentOptions) {
    const { event } = findModelConfig(vnode) || { event: 'input' };

    return event;
  }

  // Lazy Models typically use change event
  if (model && model.modifiers && model.modifiers.lazy) {
    return 'change';
  }

  // is a textual-type input.
  if (vnode.data.attrs && isTextInput({ type: vnode.data.attrs.type || 'text' })) {
    return 'input';
  }

  return 'change';
}

export function normalizeSlots (slots, ctx) {
  return Object.keys(slots).reduce((arr, key) => {
    slots[key].forEach((vnode) => {
      if (!vnode.context) {
        slots[key].context = ctx;
        if (!vnode.data) {
          vnode.data = {};
        }
        vnode.data.slot = key;
      }
    });

    return arr.concat(slots[key]);
  }, []);
}
