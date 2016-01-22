import React, {Component, PropTypes } from 'react';

export default class Alert extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['danger', 'success', 'info', 'warning']),
        message: PropTypes.string.isRequired,
        dismissible: PropTypes.bool

    }

    constructor(...args) {
        super(...args);
        this.state = {isClosed: false};
    }

    componentWillReceiveProps() {
        this.setState({isClosed: false});
    }

    render() {
        if (this.state.isClosed) {
            return null;
        }

        const { type = 'info', dismissible = true, message } = this.props;

        return (
            <div className={['alert', 'alert-' + type, dismissible ? 'alert-dismissible' : ''].join(' ')}>
                { dismissible ? <DismissButton onClick={() => this.setState({isClosed: true})} /> : '' }
                { message }
            </div>
        );
    }
}

class DismissButton extends Component {
    render() {
        return (
            <button type="button" onClick={this.props.onClick} className="close">
                <span>&times;</span>
            </button>
        )
    }
}