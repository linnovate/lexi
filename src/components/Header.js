import React, { Component } from 'react';

const {BlogInfo} = window;

export default class Header extends Component {

    render() {
        return (
            <div className="blog-header">
                <div className="container">
                    <h1 className="blog-title">{BlogInfo.name}</h1>
                    <p className="lead blog-description">{BlogInfo.description}</p>
                </div>
            </div>
        );
    }
}