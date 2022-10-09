/**
 * Must match /^[a-zA-Z_][a-zA-Z0-9\-_]*$/, and not match /^[Xx][Mm][Ll]/
 * Consistent with XML tag naming rules.
 * It'd be real nice if TS supported RegEx'd string/enum types.  Just saying.
 */
export type TagName = string;

export type NSTagName = [string, TagName];

export type Component = (props?: Record<string, unknown>) => DOMRepresentation | Node | string | null;

export type EventHandler = (event: Event) => boolean | undefined;

export type Properties = Record<string, string> & {
  style?: Record<string, string>;
  className?: string | string[];
  // Event handlers.  Not comprehensive.
  onClick?: EventHandler;
  onKeyUp?: EventHandler;
  onKeyDown?: EventHandler;
  onKeyPress?: EventHandler;
  onMouseOver?: EventHandler;
  onMouseEnter?: EventHandler;
  onMouseOut?: EventHandler;
  onMouseLeave?: EventHandler;
  onMouseUp?: EventHandler;
  onMouseDown?: EventHandler;
  onDblClick?: EventHandler;
  onChange?: EventHandler;
  onFocus?: EventHandler;
  onFocusIn?: EventHandler;
  onFocusOut?: EventHandler;
  onScroll?: EventHandler;
  onWheel?: EventHandler;
  onTouchStart?: EventHandler;
  onTouchMove?: EventHandler;
  onTouchEnd?: EventHandler;
  onTouchCancel?: EventHandler;
  onError?: EventHandler;
  onLoad?: EventHandler;
  onPointerCancel?: EventHandler;
  onPointerEnter?: EventHandler;
  onPointerLeave?: EventHandler;
  onPointerMove?: EventHandler;
  onPointerOut?: EventHandler;
  onPointerOver?: EventHandler;
  onPointerUp?: EventHandler;
  onPointerDown?: EventHandler;
  onTransitionStart?: EventHandler;
  onTransitionCancel?: EventHandler;
  onTransitionRun?: EventHandler;
  onTransitionEnd?: EventHandler;
  onSubmit?: EventHandler;
  onFormData?: EventHandler;
  onReset?: EventHandler;
};

export type ComponentType = TagName | NSTagName | Component;
export type ComponentProps = Properties | undefined;
export type ComponentChild = string | Node | DOMRepresentation | null | undefined;
export type ComponentChildren = ComponentChild[] | undefined;

export type DOMRepresentation = [ComponentType, ComponentProps, ComponentChildren];
 
