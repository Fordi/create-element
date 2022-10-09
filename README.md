# createElement

Minimalist bridge from data to document.

### What is it?

A function that turns:

```javascript
createElement('div', { className: 'thingy' }, [
  ['span', { style: { fontWeight: 'bold' } }, 'Testing'],
]);
```

into:

```jsx
<div className="thingy">
  <span style="font-weight: bold">Testing</span>
</div>
```

### Call styles

```javascript
createElement(
  type: ComponentType,
  props?: ComponentProps,
  children?: ComponentChildren
)
```

`type` is a tag name (e.g., `"div"`), a namespaced tag name (e.g., `[SVGNS, "path"]`), or a component (see below).  `props` is any POJSO containing element properties.  `children` is a string, or an array of strings, `DOMRepresentation`s, or raw HTML Elements.

`DOMRepresentation` should look familiar, as it's an array of createElement's arguments:

```javascript
[
  type: ComponentType,
  props?: ComponentProps,
  children?: ComponentChildren
]
```

So if you just want to render a component, it's simple:

```javascript
const rendered = createElement(...Component(props));
```

### Components

Kinda like React components, but without the reactivity.  `createElement` is _only_ a bridge from data to DOM - it does not provide re-render capabilities; you'll want to do that in your components manually.  General form is:

```javascript
const Component = (props) => DOMRepresentation
```
