"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _useCallbackRef3 = _interopRequireDefault(require("@restart/hooks/useCallbackRef"));

var _useMergedRefs = _interopRequireDefault(require("@restart/hooks/useMergedRefs"));

var _popper = require("./popper");

var _usePopper2 = _interopRequireDefault(require("./usePopper"));

var _useRootClose = _interopRequireDefault(require("./useRootClose"));

var _useWaitForDOMRef = _interopRequireDefault(require("./useWaitForDOMRef"));

var _mergeOptionsWithPopperConfig = _interopRequireDefault(require("./mergeOptionsWithPopperConfig"));

/**
 * Built on top of `Popper.js`, the overlay component is
 * great for custom tooltip overlays.
 */
var Overlay = /*#__PURE__*/_react["default"].forwardRef(function (props, outerRef) {
  var flip = props.flip,
      offset = props.offset,
      placement = props.placement,
      _props$containerPaddi = props.containerPadding,
      containerPadding = _props$containerPaddi === void 0 ? 5 : _props$containerPaddi,
      _props$popperConfig = props.popperConfig,
      popperConfig = _props$popperConfig === void 0 ? {} : _props$popperConfig,
      Transition = props.transition;

  var _useCallbackRef = (0, _useCallbackRef3["default"])(),
      rootElement = _useCallbackRef[0],
      attachRef = _useCallbackRef[1];

  var _useCallbackRef2 = (0, _useCallbackRef3["default"])(),
      arrowElement = _useCallbackRef2[0],
      attachArrowRef = _useCallbackRef2[1];

  var mergedRef = (0, _useMergedRefs["default"])(attachRef, outerRef);
  var container = (0, _useWaitForDOMRef["default"])(props.container);
  var target = (0, _useWaitForDOMRef["default"])(props.target);

  var _useState = (0, _react.useState)(!props.show),
      exited = _useState[0],
      setExited = _useState[1];

  var _usePopper = (0, _usePopper2["default"])(target, rootElement, (0, _mergeOptionsWithPopperConfig["default"])({
    placement: placement,
    enableEvents: !!props.show,
    containerPadding: containerPadding || 5,
    flip: flip,
    offset: offset,
    arrowElement: arrowElement,
    popperConfig: popperConfig
  })),
      styles = _usePopper.styles,
      attributes = _usePopper.attributes,
      popper = (0, _objectWithoutPropertiesLoose2["default"])(_usePopper, ["styles", "attributes"]);

  if (props.show) {
    if (exited) setExited(false);
  } else if (!props.transition && !exited) {
    setExited(true);
  }

  var handleHidden = function handleHidden() {
    setExited(true);

    if (props.onExited) {
      props.onExited.apply(props, arguments);
    }
  }; // Don't un-render the overlay while it's transitioning out.


  var mountOverlay = props.show || Transition && !exited;
  (0, _useRootClose["default"])(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent
  });

  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null;
  }

  var child = props.children((0, _extends2["default"])({}, popper, {
    show: !!props.show,
    props: (0, _extends2["default"])({}, attributes.popper, {
      style: styles.popper,
      ref: mergedRef
    }),
    arrowProps: (0, _extends2["default"])({}, attributes.arrow, {
      style: styles.arrow,
      ref: attachArrowRef
    })
  }));

  if (Transition) {
    var onExit = props.onExit,
        onExiting = props.onExiting,
        onEnter = props.onEnter,
        onEntering = props.onEntering,
        onEntered = props.onEntered;
    child = /*#__PURE__*/_react["default"].createElement(Transition, {
      "in": props.show,
      appear: true,
      onExit: onExit,
      onExiting: onExiting,
      onExited: handleHidden,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered
    }, child);
  }

  return container ? /*#__PURE__*/_reactDom["default"].createPortal(child, container) : null;
});

Overlay.displayName = 'Overlay';
Overlay.propTypes = {
  /**
   * Set the visibility of the Overlay
   */
  show: _propTypes["default"].bool,

  /** Specify where the overlay element is positioned in relation to the target element */
  placement: _propTypes["default"].oneOf(_popper.placements),

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `target` element is where
   * the overlay is positioned relative to.
   */
  target: _propTypes["default"].any,

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: _propTypes["default"].any,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: _propTypes["default"].bool,

  /**
   * A render prop that returns an element to overlay and position. See
   * the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
   *
   * @type {Function ({
   *   show: boolean,
   *   placement: Placement,
   *   update: () => void,
   *   forceUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *     [string]: string | number,
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     [string]: string | number,
   *   },
   * }) => React.Element}
   */
  children: _propTypes["default"].func.isRequired,

  /**
   * Control how much space there is between the edge of the boundary element and overlay.
   * A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
   */
  containerPadding: _propTypes["default"].number,

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: _propTypes["default"].object,

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: _propTypes["default"].bool,

  /**
   * Specify event for toggling overlay
   */
  rootCloseEvent: _propTypes["default"].oneOf(['click', 'mousedown']),

  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled: _propTypes["default"].bool,

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type func
   */
  onHide: function onHide(props) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (props.rootClose) {
      var _PropTypes$func;

      return (_PropTypes$func = _propTypes["default"].func).isRequired.apply(_PropTypes$func, [props].concat(args));
    }

    return _propTypes["default"].func.apply(_propTypes["default"], [props].concat(args));
  },

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  // @ts-ignore
  transition: _propTypes["default"].elementType,

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: _propTypes["default"].func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: _propTypes["default"].func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: _propTypes["default"].func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: _propTypes["default"].func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: _propTypes["default"].func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: _propTypes["default"].func
};
var _default = Overlay;
exports["default"] = _default;
module.exports = exports.default;