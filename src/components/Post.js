import React, { Component } from 'react';
import { Link } from 'react-router';
import { WP_HOME_URL } from '../wp-url';

// Dumb component
export default class Post extends Component {
    createMarkup(html) {
        return {
            __html: html
        };
    }
    createLink(post)
    {
        return post.link.replace(WP_HOME_URL, '');
    }
    render() {
        const { post } = this.props;
        return (
            <div className="blog-post">
                <h2 className="blog-post-title">
                    <Link to={this.createLink(post)}>{post.title.rendered}</Link>
                </h2>
                <p className="blog-post-meta">{post.date}</p>

                <div dangerouslySetInnerHTML={this.createMarkup(post.content.rendered)} />

            </div>
        );
    }
}