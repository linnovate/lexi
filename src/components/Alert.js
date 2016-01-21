import React, {Component, PropTypes, } from 'react';
import { findDOMNode } from 'react-dom'

export default React.createClass({
    propTypes: {
        type: PropTypes.oneOf(['danger', 'success', 'info', 'warning']),
        message: PropTypes.string.isRequired,
        dismissible: PropTypes.bool

    },
    componentWillReceiveProps: function(){
        this.setState({isClosed: false});
    },
    getInitialState: function() {
        return {
            isClosed: false
        };
    },
    render() {
        if (this.state.isClosed) {
            return null;
        }

        const {
            type = 'info',
            dismissible = true,
            message
            } = this.props;

        return (
            <div role="alert" className={['alert', 'alert-' + type, dismissible ? 'alert-dismissible' : ''].join(' ')}>
                { dismissible ? <DismissButton onClick={() => this.setState({isClosed: true})} /> : '' }
                { message }
            </div>
        );
    }
})

class DismissButton extends Component {
    render() {
        return (
            <button type="button" onClick={this.props.onClick} className="close" data={{dismiss:"alert"}} data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        )
    }
}