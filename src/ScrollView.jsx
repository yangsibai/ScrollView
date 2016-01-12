'use strict';

import {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

const STYLE_AUTO = 'auto';
const STYLE_SHOW = 'show';
const STYLE_HIDE = 'hide';

class ScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            vSize: 0,
            vPosition: 0,
            hSize: 0,
            hPosition: 0,
            hide: this.props.scrollBarStyle === STYLE_HIDE,
            alwaysShow: false
        };

        this.onScroll = () => {
            this.onUpdate();
            if (this.props.onScroll) {
                var node = findDOMNode(this.refs.content);
                this.props.onScroll(node.scrollTop, node.scrollLeft);
            }
        };

        this.onUpdate = ()=> {
            var node = findDOMNode(this.refs.content);
            this.setState({
                vSize: node.offsetHeight / node.scrollHeight,
                vPosition: node.scrollTop / node.scrollHeight,
                hSize: node.offsetWidth / node.scrollWidth,
                hPosition: node.scrollLeft / node.scrollWidth,
                loaded: true,
                hide: this.props.scrollBarStyle === STYLE_HIDE
            });
        };

        var start, startPosition, max, direction;

        var onMouseMove = (e)=> {
            var node = findDOMNode(this.refs.content);
            var delta, newPosition;
            if (direction === 'vertical') {
                delta = (e.pageY - start) / node.offsetHeight;
                newPosition = Math.min(Math.max(0, startPosition + delta), max);
                node.scrollTop = node.scrollHeight * newPosition;
            } else {
                delta = (e.pageX - start) / node.offsetWidth;
                newPosition = Math.min(Math.max(0, startPosition + delta), max);
                node.scrollLeft = node.scrollWidth * newPosition;
            }
            e.stopPropagation();
            e.preventDefault();
        };

        var onMouseUp = (e) => {
            document.body.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseup', onMouseUp);
            this.setState({
                mouseDown: false
            });
            e.stopPropagation();
            e.preventDefault();
        };

        this.onVerticalThumbMouseDown = (e)=> {
            direction = 'vertical';
            var node = findDOMNode(this.refs.content);
            start = e.pageY;
            startPosition = this.state.vPosition;
            max = (node.scrollHeight - node.offsetHeight) / node.scrollHeight;
            document.body.addEventListener('mousemove', onMouseMove);
            document.body.addEventListener('mouseup', onMouseUp);
            this.setState({
                mouseDown: true
            });
            e.stopPropagation();
            e.preventDefault();
        };

        this.onHorizontalThumbMouseDown = (e)=> {
            direction = 'horizontal';
            var node = findDOMNode(this.refs.content);
            start = e.pageX;
            startPosition = this.state.hPosition;
            max = (node.scrollWidth - node.offsetWidth) / node.scrollWidth;
            document.body.addEventListener('mousemove', onMouseMove);
            document.body.addEventListener('mouseup', onMouseUp);
            this.setState({
                mouseDown: true
            });
            e.stopPropagation();
            e.preventDefault();
        };

        this.hideTimer = null;

        this.setAutoHideTimer = () => {
            if (this.hideTimer) {
                clearTimeout(this.hideTimer);
                this.hideTimer = null;
            }

            if (this.props.scrollBarStyle === STYLE_AUTO) {
                this.hideTimer = setTimeout(()=> {
                    this.setState({
                        hide: true
                    });
                }, this.props.hideTimeout);
            }
        };

        this.onScrollBarMouseEnter = (e) => {
            this.setState({
                mouseEntered: true
            });
        };

        this.onScrollBarMouseOut = (e) => {
            this.setState({
                mouseEntered: false
            });
        };
    }

    componentDidMount() {
        this.onUpdate();
        var node = findDOMNode(this.refs.content);
        var props = this.props;
        if (props.defaultScrollTop > 0) {
            node.scrollTop = props.defaultScrollTop;
        }
        if (props.defaultScrollLeft > 0) {
            node.scrollLeft = props.defaultScrollLeft;
        }
        if (props.scrollTop > 0) {
            node.scrollTop = props.scrollTop;
        }
        if (props.scrollLeft > 0) {
            node.scrollLeft = props.scrollLeft;
        }
        if (props.scrollTop >= 0 || props.scrollLeft >= 0 && !props.warning) {
            console.warn(`\
WARNING: After setting scrollTop/scrollLeft, component will use these values in every updating.
If you want to set initial scrollTop/scrollLeft, please set defaultScrollLeft/defaultScrollTop.
You can set property warning = false to hide this warning.`);
        }
    }

    componentWillReceiveProps(nextProps) {
        var node = findDOMNode(this.refs.content);
        if (nextProps.scrollTop >= 0) {
            node.scrollTop = nextProps.scrollTop;
        }
        if (nextProps.scrollLeft >= 0) {
            node.scrollLeft = nextProps.scrollLeft;
        }
    }

    componentDidUpdate() {
        this.setAutoHideTimer();
    }

    render() {
        return (
            <div className="scroll-view" onScroll={this.onScroll}>
                <div ref="content" className="scroll-content">
                    {this.props.children}
                </div>
                {
                    this.shouldShowScrollBar &&
                    <div className="track scroll-bar-horizontal"
                         onMouseDown={this.onHorizontalThumbMouseDown}
                         onMouseEnter={this.onScrollBarMouseEnter}
                         onMouseLeave={this.onScrollBarMouseOut}>
                        <div className="thumb" style={this.horizontalThumbStyle}></div>
                    </div>
                }
                {
                    this.shouldShowScrollBar &&
                    <div className="track scroll-bar-vertical"
                         onMouseDown={this.onVerticalThumbMouseDown}
                         onMouseEnter={this.onScrollBarMouseEnter}
                         onMouseLeave={this.onScrollBarMouseOut}>
                        <div className="thumb" style={this.verticalThumbStyle}></div>
                    </div>
                }
            </div>
        );
    }

    get shouldShowScrollBar() {
        return this.props.scrollBarStyle !== STYLE_HIDE;
    }

    get shouldScrollBarAlwaysShow() {
        return this.state.mouseEntered || this.state.mouseDown;
    }

    get verticalThumbStyle() {
        return {
            height: this.state.vSize * 100 + '%',
            top: this.state.vPosition * 100 + '%',
            display: this.state.vSize < 1
            && (this.shouldScrollBarAlwaysShow || (!this.state.hide && this.state.loaded))
                ? 'block' : 'none'
        };
    }

    get horizontalThumbStyle() {
        return {
            width: this.state.hSize * 100 + '%',
            left: this.state.hPosition * 100 + '%',
            display: this.state.hSize < 1
            && ( this.shouldScrollBarAlwaysShow || (!this.state.hide && this.state.loaded))
                ? 'block' : 'none'
        };
    }
}

ScrollView.defaultProps = {
    scrollBarStyle: 'auto', // auto | show | hide
    hideTimeout: 1500,
    defaultScrollTop: 0,
    defaultScrollLeft: 0,
    scrollTop: -1,
    scrollLeft: -1,
    warning: true
};

ScrollView.propTypes = {
    scrollBarStyle: PropTypes.string,
    defaultScrollTop: PropTypes.number,
    defaultScrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    scrollLeft: PropTypes.number,
    warning: PropTypes.bool,
    onScroll: PropTypes.func
};

export default ScrollView;
