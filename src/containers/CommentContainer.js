import React, { Component } from 'react';
import { fetchPost, addComment } from '../actions';
import { connect } from 'react-redux';
import Post from '../components/Post';
import Spinner from 'react-spinkit';
import CommentForm from '../components/CommentForm';

@connect (state => ({comment: state.comment.comment, error: state.comment.error, isFetching: state.comment.isFetching}), {addComment})

export default class CommentContainer extends Component {

    render() {
        return (
            <div>
                <CommentForm
                    onSubmit={comment => this.props.addComment(Object.assign(comment, {comment_post_ID: this.props.postId}))}/>
            </div>
        );
    }
}