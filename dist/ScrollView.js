'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _reactDom = require('react-dom');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE_AUTO = 'auto';
var STYLE_SHOW = 'show';
var STYLE_HIDE = 'hide';

var ScrollView = function (_Component) {
    _inherits(ScrollView, _Component);

    function ScrollView(props) {
        _classCallCheck(this, ScrollView);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollView).call(this, props));

        _this.state = {
            loaded: false,
            vSize: 0,
            vPosition: 0,
            hSize: 0,
            hPosition: 0,
            hide: _this.props.scrollBarStyle === STYLE_HIDE
        };

        _this.onScroll = function () {
            _this.onUpdate();
        };

        _this.onUpdate = function () {
            var node = (0, _reactDom.findDOMNode)(_this.refs.content);
            _this.setState({
                vSize: node.offsetHeight / node.scrollHeight,
                vPosition: node.scrollTop / node.scrollHeight,
                hSize: node.offsetWidth / node.scrollWidth,
                hPosition: node.scrollLeft / node.scrollWidth,
                loaded: true,
                hide: _this.props.scrollBarStyle === STYLE_HIDE
            });
        };

        var start, startPosition, max, direction;

        var onMouseMove = function onMouseMove(e) {
            var node = (0, _reactDom.findDOMNode)(_this.refs.content);
            var delta, newPosition;
            if (direction === 'vertical') {
                delta = (e.pageY - start) / node.offsetHeight;
                newPosition = Math.min(Math.max(0, startPosition + delta), max);
                _this.setState({
                    vPosition: newPosition,
                    hide: _this.props.scrollBarStyle === STYLE_HIDE
                }, function () {
                    node.scrollTop = node.scrollHeight * newPosition;
                    _this.setAutoHideTimer();
                });
            } else {
                delta = (e.pageX - start) / node.offsetWidth;
                newPosition = Math.min(Math.max(0, startPosition + delta), max);
                _this.setState({
                    hPosition: newPosition
                }, function () {
                    node.scrollLeft = node.scrollWidth * newPosition;
                    _this.setAutoHideTimer();
                });
            }
            e.stopPropagation();
            e.preventDefault();
        };

        function onMouseUp(e) {
            document.body.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseup', onMouseUp);
            e.stopPropagation();
            e.preventDefault();
        }

        _this.onVerticalThumbMouseDown = function (e) {
            direction = 'vertical';
            var node = (0, _reactDom.findDOMNode)(_this.refs.content);
            start = e.pageY;
            startPosition = _this.state.vPosition;
            max = (node.scrollHeight - node.offsetHeight) / node.scrollHeight;
            document.body.addEventListener('mousemove', onMouseMove);
            document.body.addEventListener('mouseup', onMouseUp);
            e.stopPropagation();
            e.preventDefault();
        };

        _this.onHorizontalThumbMouseDown = function (e) {
            direction = 'horizontal';
            var node = (0, _reactDom.findDOMNode)(_this.refs.content);
            start = e.pageX;
            startPosition = _this.state.hPosition;
            max = (node.scrollWidth - node.offsetWidth) / node.scrollWidth;
            document.body.addEventListener('mousemove', onMouseMove);
            document.body.addEventListener('mouseup', onMouseUp);
            e.stopPropagation();
            e.preventDefault();
        };

        _this.hideTimer = null;

        _this.setAutoHideTimer = function () {
            if (_this.hideTimer) {
                clearTimeout(_this.hideTimer);
                _this.hideTimer = null;
            }

            if (_this.props.scrollBarStyle === STYLE_AUTO) {
                _this.hideTimer = setTimeout(function () {
                    _this.setState({
                        hide: true
                    });
                }, _this.props.hideTimeout);
            }
        };
        return _this;
    }

    _createClass(ScrollView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onUpdate();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.setAutoHideTimer();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'scroll-view', onScroll: this.onScroll },
                React.createElement(
                    'div',
                    { ref: 'content', className: 'scroll-content' },
                    this.props.children
                ),
                React.createElement(
                    'div',
                    { className: 'track scroll-bar-horizontal',
                        style: this.horizontalScrollBarStyle,
                        onMouseDown: this.onHorizontalThumbMouseDown },
                    React.createElement('div', { className: 'thumb', style: this.horizontalThumbStyle })
                ),
                React.createElement(
                    'div',
                    { className: 'track scroll-bar-vertical',
                        style: this.verticalScrollBarStyle,
                        onMouseDown: this.onVerticalThumbMouseDown },
                    React.createElement('div', { className: 'thumb', style: this.verticalThumbStyle })
                )
            );
        }
    }, {
        key: 'horizontalScrollBarStyle',
        get: function get() {
            return {
                display: !this.state.hide && this.state.loaded && this.state.hSize !== 1 ? 'block' : 'none'
            };
        }
    }, {
        key: 'verticalScrollBarStyle',
        get: function get() {
            return {
                display: !this.state.hide && this.state.loaded && this.state.vSize !== 1 ? 'block' : 'none'
            };
        }
    }, {
        key: 'verticalThumbStyle',
        get: function get() {
            return {
                height: this.state.vSize * 100 + '%',
                top: this.state.vPosition * 100 + '%'
            };
        }
    }, {
        key: 'horizontalThumbStyle',
        get: function get() {
            return {
                width: this.state.hSize * 100 + '%',
                left: this.state.hPosition * 100 + '%'
            };
        }
    }]);

    return ScrollView;
}(_react.Component);

ScrollView.defaultProps = {
    scrollBarStyle: 'auto', // auto | show | hide
    hideTimeout: 1500
};

ScrollView.propTypes = {
    scrollBarStyle: _react.PropTypes.string
};

exports.default = ScrollView;
module.exports = exports['default'];