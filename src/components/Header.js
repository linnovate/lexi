import React, { Component } from 'react';
import { BlogData } from '../wp-data';

export default class Header extends Component {

    render() {
        return (
            <div className="blog-header">
                <div className="container">
                    <h1 className="blog-title">{BlogData.blogName}</h1>
                    <p className="lead blog-description">{BlogData.blogDescription}</p>
                </div>
            </div>
        );
    }
}