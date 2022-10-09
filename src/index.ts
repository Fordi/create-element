import {
  ComponentChildren,
  ComponentProps,
  ComponentType,
  DOMRepresentation,
  EventHandler,
  NSTagName,
  TagName,
} from "./types";

const { Node } = globalThis;
const { isArray } = Array;

export const SVGNS = 'http://www.w3.org/2000/svg';

const toArray = <T>(n: T | T[]): T[] => (isArray(n) ? n : [n]);

const isTagName = (n: unknown): boolean => (
  typeof n === 'string'
  && /^[a-zA-Z_][a-zA-Z0-9\-_]*$/.test(n)
  && !/^[Xx][Mm][Ll]/.test(n)
);

const isNsTagName = (t: unknown): boolean => 
  isArray(t)
  && t.length === 2
  && typeof t[0] === 'string'
  && isTagName(t[1]);

const isDomRep = (d: unknown) => 
  isArray(d)
  && (
    typeof d[0] === 'function'
    || isTagName(d[0])
    || isNsTagName(d[0])
  );

const normalizeToDOM = (d: null | Node | DOMRepresentation | number | string | boolean) => {
  if (d === null) return document.createTextNode('');
  if (d instanceof Node) return d;
  if (isDomRep(d)) return createElement(...(d as DOMRepresentation));
  if (typeof d !== 'object') return document.createTextNode(String(d));
  throw Object.assign(new Error(
    'Attempted to normalize invalid DOM object:'
  ), { detail: d });
};

type PropertyHandler = (
  el: Element,
  value: unknown,
  name: string,
  hasNS: boolean,
) => void;

const propertyHandlers: [string | RegExp, PropertyHandler][] = [
  ['className', (el, value: string | string[]) => {
    const cls = [...new Set(toArray(value).filter((a) => a).join(' ').split(' '))].join(' ');
    el.classList.value = cls;
  }],
  ['style', (el: HTMLElement | SVGElement, value: Record<string, string>) => {
    Object.assign(el.style, value);
  }],
  [/^on[A-Z]/, (el, value: EventHandler, name) => {
    el.addEventListener(name.substring(2).toLowerCase(), value);
  }],
];

const defaultPropHandler: PropertyHandler = (el, value: string, name: string, hasNS: boolean) => {
  if (hasNS) {
    el.setAttribute(name, value);
  } else {
    const attName = name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    el.setAttribute(attName, value);
  }
};

const getPropHandler = (name: string): PropertyHandler => {
  const special = propertyHandlers.find(([matcher]) => (
    (typeof matcher === 'string' && name === matcher)
    || (matcher instanceof RegExp && matcher.test(name))
  ));
  if (special) return special[1];
  return defaultPropHandler;
};

const createElement = (
  type: ComponentType,
  props: ComponentProps,
  children: ComponentChildren
): Node => {
  if (type instanceof Function) {
    return normalizeToDOM(type({ ...props, children }));
  }
  const hasNS = isNsTagName(type);
  const el: Element = hasNS
    ? document.createElementNS(...(type as NSTagName))
    : document.createElement(type as TagName);

  Object.keys(props).forEach((name) => {
    getPropHandler(name)(el, props[name], name, hasNS);
  });
  toArray(children).forEach((child) => {
    const norm = normalizeToDOM(child);
    if (norm) el.appendChild(norm);
  });
  return el;
};

export default createElement;