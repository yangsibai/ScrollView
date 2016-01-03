'use strict';
;(function (global) {
    if (typeof module !== 'undefined' && module.exports) {
        var React = require('react');
    }
    var ScrollView = React.createClass({
        render: function () {
            return (
                <div className="scroll-view">
                    <div className="trace">
                        <div className="thumb"></div>
                    </div>
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            )
        }
    });
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ScrollView;
    } else {
        global.ScrollView = ScrollView;
    }
}(this));

