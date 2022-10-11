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

### Component generator

If you want to convert an SVG or HTML file to the start of a component, it's easy:

`undo-icon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <path d="M256 0a256 256 0 1 1 0 512 256 256 0 0 1 0-512zm-32 352v-64s128-32 192 64c0-106-86-192-192-192V96L96 224l128 128z"/>
</svg>
```

```bash
$ npm i -g @fordi-org/xtc
$ xtc -i undo-icon.svg -n UndoIcon

> Writing UndoIcon.js
```

`UndoIcon.js`

```javascript
const SVG = "http://www.w3.org/2000/svg";

const UndoIcon = () => (
  [[SVG, "svg"], {
    xmlns: SVG,
    width: "512",
    height: "512"
  }, [
    [[SVG, "path"], {
      d: "M256 0a256 256 0 1 1 0 512 256 256 0 0 1 0-512zm-32 352v-64s128-32 192 64c0-106-86-192-192-192V96L96 224l128 128z"
    }]
  ]]
);

export default UndoIcon;
```
