'use strict';

import {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import './style.less';

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
            hide: this.props.scrollBarStyle === STYLE_HIDE
        };

        this.onScroll = () => {
            this.onUpdate();
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
                this.setState({
                    vPosition: newPosition,
                    hide: this.props.scrollBarStyle === STYLE_HIDE
                }, ()=> {
                    node.scrollTop = node.scrollHeight * newPosition
                    this.setAutoHideTimer();
                });
            } else {
                delta = (e.pageX - start) / node.offsetWidth;
                newPosition = Math.min(Math.max(0, startPosition + delta), max);
                this.setState({
                    hPosition: newPosition
                }, () => {
                    node.scrollLeft = node.scrollWidth * newPosition;
                    this.setAutoHideTimer();
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

        this.onVerticalThumbMouseDown = (e)=> {
            direction = 'vertical';
            var node = findDOMNode(this.refs.content);
            start = e.pageY;
            startPosition = this.state.vPosition;
            max = (node.scrollHeight - node.offsetHeight) / node.scrollHeight;
            document.body.addEventListener('mousemove', onMouseMove);
            document.body.addEventListener('mouseup', onMouseUp);
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
    }

    componentDidMount() {
        this.onUpdate();
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
                <div className="track scroll-bar-horizontal"
                     style={this.horizontalScrollBarStyle}
                     onMouseDown={this.onHorizontalThumbMouseDown}>
                    <div className="thumb" style={this.horizontalThumbStyle}></div>
                </div>
                <div className="track scroll-bar-vertical"
                     style={this.verticalScrollBarStyle}
                     onMouseDown={this.onVerticalThumbMouseDown}>
                    <div className="thumb" style={this.verticalThumbStyle}></div>
                </div>
            </div>
        );
    }

    get horizontalScrollBarStyle() {
        return {
            display: !this.state.hide && this.state.loaded && this.state.hSize !== 1 ? 'block' : 'none'
        }
    }

    get verticalScrollBarStyle() {
        return {
            display: !this.state.hide && this.state.loaded && this.state.vSize !== 1 ? 'block' : 'none'
        };
    }

    get verticalThumbStyle() {
        return {
            height: this.state.vSize * 100 + '%',
            top: this.state.vPosition * 100 + '%'
        };
    }

    get horizontalThumbStyle() {
        return {
            width: this.state.hSize * 100 + '%',
            left: this.state.hPosition * 100 + '%'
        };
    }
}

ScrollView.defaultProps = {
    scrollBarStyle: 'auto', // auto | show | hide
    hideTimeout: 1500
};

ScrollView.propTypes = {
    scrollBarStyle: PropTypes.string
};

export default ScrollView;
