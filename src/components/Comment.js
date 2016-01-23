import React, { Component } from 'react';
import { Link } from 'react-router';
import { BlogData } from '../wp-data';

// Dumb component
export default class Comment extends Component {
    createMarkup(html) {
        return {
            __html: html
        };
    }

    createAvatarLink(comment) {
        return comment.author_avatar_urls ? comment.author_avatar_urls[48] : '';
    }

    render() {
        const { comment } = this.props;
        return (
            <div className="media">
                <a className="pull-left" style={{marginRight: 5}}href="#">
                    <img className="media-object" src={this.createAvatarLink(comment)} alt="" />
                </a>
                <div className="media-body">
                    <h6 className="media-heading">{comment.author_name}
                        {" "}<small className="text-muted">{comment.date}</small>
                    </h6>
                    <div dangerouslySetInnerHTML={this.createMarkup(comment.content.rendered)} />
                </div>
            </div>
        );
    }
}