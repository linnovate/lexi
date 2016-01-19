import React, { Component } from 'react';

// Dumb component
export default class PageNotFound extends Component {
    render() {
        return (
            <div className="blog-post">
                <div className="alert alert-danger">Page Not Found</div>
            </div>
        );
    }
}