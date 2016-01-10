'use strict';

import {Component} from 'react';
import ReactDOM from 'react-dom';

class ScrollView extends Component {
    render() {
        return (
            <div className="scroll-view">
                <div className="scroll-content">
                    {this.props.children}
                </div>
                <div className="track scroll-bar-horizontal">
                    <div className="thumb"></div>
                </div>
                <div className="track scroll-bar-vertical">
                    <div className="thumb"></div>
                </div>
            </div>
        );
    }
}

export default ScrollView;
