import React, { Component } from 'react';

// Dumb component
export default class Page extends Component {
    createMarkup(html) {
        return {
            __html: html
        }

    }

    render() {
        const { page } = this.props;

        return (
            <div className="blog-post">
                <h1 className="blog-post-title">{page.title.rendered}</h1>
                <div dangerouslySetInnerHTML={this.createMarkup(page.content.rendered)} />
            </div>
        );
    }
}