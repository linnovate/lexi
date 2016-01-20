import React, { Component } from 'react';
import { WP_BLOG_NAME, WP_BLOG_DESCRIPTION } from '../wp-data';

export default class Header extends Component {

    render() {
        return (
            <div className="blog-header">
                <div className="container">
                    <h1 className="blog-title">{WP_BLOG_NAME}</h1>
                    <p className="lead blog-description">{WP_BLOG_DESCRIPTION}</p>
                </div>
            </div>
        );
    }
}