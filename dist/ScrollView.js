'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var findDOMNode = require('react-dom').findDOMNode;
//
// import {Component, PropTypes} from 'react';
// import {findDOMNode} from 'react-dom';

var STYLE_AUTO = 'auto';
var STYLE_SHOW = 'show';
var STYLE_HIDE = 'hide';

var IS_LION_SCROLLBAR = /Android|webOS|iPhone|iPad|iPod|OS X|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) && !/Chrome/i.test(window.navigator.userAgent);

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    scrollBarStyle: PropTypes.string,
    defaultScrollTop: PropTypes.number,
    defaultScrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    scrollLeft: PropTypes.number,
    warning: PropTypes.bool,
    onScroll: PropTypes.func,
    disableHScroll: PropTypes.bool,
    disableVScroll: PropTypes.bool
  },
  getInitialState: function getInitialState() {
    return {
      loaded: false,
      vSize: 0,
      vPosition: 0,
      hSize: 0,
      hPosition: 0,
      hide: this.props.scrollBarStyle === STYLE_HIDE,
      alwaysShow: false,
      scrollBarStyle: this.props.scrollBarStyle || 'auto', // auto | show | hide
      hideTimeout: this.props.hideTimeout || 1500,
      defaultScrollTop: this.props.defaultScrollTop || 0,
      defaultScrollLeft: this.props.defaultScrollLeft || 0,
      scrollTop: this.props.scrollTop || -1,
      scrollLeft: this.props.scrollLeft || -1,
      warning: this.props.warning || true
    };
  },
  onScroll: function onScroll() {
    this.onUpdate();
    if (this.props.onScroll) {
      var node = findDOMNode(this.refs.content);
      this.props.onScroll(node.scrollTop, node.scrollLeft);
    }
  },
  onUpdate: function onUpdate() {
    var node = findDOMNode(this.refs.content);
    this.setState({
      vSize: node.offsetHeight / node.scrollHeight,
      vPosition: node.scrollTop / node.scrollHeight,
      hSize: node.offsetWidth / node.scrollWidth,
      hPosition: node.scrollLeft / node.scrollWidth,
      loaded: true,
      hide: this.state.scrollBarStyle === STYLE_HIDE
    });
  },
  onMouseMove: function onMouseMove(e) {
    var node = findDOMNode(this.refs.content);
    var delta, newPosition;
    if (this.direction === 'vertical') {
      delta = (e.pageY - this.start) / node.offsetHeight;
      newPosition = Math.min(Math.max(0, this.startPosition + delta), this.max);
      node.scrollTop = node.scrollHeight * newPosition;
    } else {
      delta = (e.pageX - this.start) / node.offsetWidth;
      newPosition = Math.min(Math.max(0, this.startPosition + delta), this.max);
      node.scrollLeft = node.scrollWidth * newPosition;
    }
    e.stopPropagation();
    e.preventDefault();
  },
  onMouseUp: function onMouseUp(e) {
    document.body.removeEventListener('mousemove', this.onMouseMove);
    document.body.removeEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDown: false
    });
    e.stopPropagation();
    e.preventDefault();
  },
  onVerticalThumbMouseDown: function onVerticalThumbMouseDown(e) {
    this.direction = 'vertical';
    var node = findDOMNode(this.refs.content);
    this.start = e.pageY;
    this.startPosition = this.state.vPosition;
    this.max = (node.scrollHeight - node.offsetHeight) / node.scrollHeight;
    document.body.addEventListener('mousemove', this.onMouseMove);
    document.body.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDown: true
    });
    e.stopPropagation();
    e.preventDefault();
  },
  onHorizontalThumbMouseDown: function onHorizontalThumbMouseDown(e) {
    this.direction = 'horizontal';
    var node = findDOMNode(this.refs.content);
    this.start = e.pageX;
    this.startPosition = this.state.hPosition;
    this.max = (node.scrollWidth - node.offsetWidth) / node.scrollWidth;
    document.body.addEventListener('mousemove', this.onMouseMove);
    document.body.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDown: true
    });
    e.stopPropagation();
    e.preventDefault();
  },

  setAutoHideTimer: function setAutoHideTimer() {
    var _this = this;

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    if (this.state.scrollBarStyle === STYLE_AUTO) {
      this.hideTimer = setTimeout(function () {
        _this.setState({
          hide: true
        });
      }, this.state.hideTimeout);
    }
  },

  onScrollBarMouseEnter: function onScrollBarMouseEnter(e) {
    this.setState({
      mouseEntered: true
    });
  },
  onScrollBarMouseOut: function onScrollBarMouseOut(e) {
    this.setState({
      mouseEntered: false
    });
  },
  componentDidMount: function componentDidMount() {
    this.onUpdate();
    var node = findDOMNode(this.refs.content);
    var state = this.state;
    if (state.defaultScrollTop > 0) {
      node.scrollTop = state.defaultScrollTop;
    }
    if (state.defaultScrollLeft > 0) {
      node.scrollLeft = state.defaultScrollLeft;
    }
    if (state.scrollTop > 0) {
      node.scrollTop = state.scrollTop;
    }
    if (state.scrollLeft > 0) {
      node.scrollLeft = state.scrollLeft;
    }
    if (state.scrollTop >= 0 || state.scrollLeft >= 0 && !state.warning) {
      console.warn('WARNING: After setting scrollTop/scrollLeft, component will use these values in every updating.\nIf you want to set initial scrollTop/scrollLeft, please set defaultScrollLeft/defaultScrollTop.\nYou can set property warning = false to hide this warning.');
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var node = findDOMNode(this.refs.content);
    if (nextProps.scrollTop >= 0) {
      node.scrollTop = nextProps.scrollTop;
    }
    if (nextProps.scrollLeft >= 0) {
      node.scrollLeft = nextProps.scrollLeft;
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    this.setAutoHideTimer();
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.hideTimer);
  },
  render: function render() {
    var contentStyle = {
      overflowX: this.props.disableHScroll ? 'hidden' : 'auto',
      overflowY: this.props.disableVScroll ? 'hidden' : 'auto'
    };
    if (IS_LION_SCROLLBAR) {
      contentStyle.width = '100%';
      contentStyle.height = '100%';
      return React.createElement(
        'div',
        { ref: 'content', style: contentStyle },
        React.createElement(
          'div',
          { style: {
              position: 'relative'
            } },
          this.props.children
        )
      );
    }
    return React.createElement(
      'div',
      { className: 'scroll-view', onScroll: this.onScroll },
      React.createElement(
        'div',
        { ref: 'content', className: 'scroll-content', style: contentStyle },
        this.props.children
      ),
      !this.props.disableHScroll && this.shouldShowScrollBar && React.createElement(
        'div',
        { className: 'track scroll-bar-horizontal',
          onMouseDown: this.onHorizontalThumbMouseDown,
          onMouseEnter: this.onScrollBarMouseEnter,
          onMouseLeave: this.onScrollBarMouseOut },
        React.createElement('div', { className: 'thumb', style: this.horizontalThumbStyle() })
      ),
      !this.props.disableVScroll && this.shouldShowScrollBar && React.createElement(
        'div',
        { className: 'track scroll-bar-vertical',
          onMouseDown: this.onVerticalThumbMouseDown,
          onMouseEnter: this.onScrollBarMouseEnter,
          onMouseLeave: this.onScrollBarMouseOut },
        React.createElement('div', { className: 'thumb', style: this.verticalThumbStyle() })
      )
    );
  },

  shouldShowScrollBar: function shouldShowScrollBar() {
    return this.state.scrollBarStyle !== STYLE_HIDE;
  },

  shouldScrollBarAlwaysShow: function shouldScrollBarAlwaysShow() {
    return this.state.mouseEntered || this.state.mouseDown;
  },

  verticalThumbStyle: function verticalThumbStyle() {
    return {
      height: this.state.vSize * 100 + '%',
      top: this.state.vPosition * 100 + '%',
      display: this.state.vSize < 1 && (this.shouldScrollBarAlwaysShow || !this.state.hide && this.state.loaded) ? 'block' : 'none'
    };
  },

  horizontalThumbStyle: function horizontalThumbStyle() {
    return {
      width: this.state.hSize * 100 + '%',
      left: this.state.hPosition * 100 + '%',
      display: this.state.hSize < 1 && (this.shouldScrollBarAlwaysShow || !this.state.hide && this.state.loaded) ? 'block' : 'none'
    };
  }
});