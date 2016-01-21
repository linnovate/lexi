import React, { Component } from 'react';
import { fetchPost, addComment } from '../actions';
import { connect } from 'react-redux';
import Post from '../components/Post';
import Spinner from 'react-spinkit';
import CommentForm from '../components/CommentForm';
import Alert from '../components/Alert';

@connect (state =>
    ({comment: state.comment.comment, error: state.comment.error, isFetching: state.comment.isFetching}),
    {addComment})

export default class CommentContainer extends Component {

    alert = null;

    componentWillReceiveProps(nextProps){
        if (nextProps.isFetching) {
            this.alert = null;
        } else {
            this.alert = {
                message: nextProps.error ? 'Error!' : 'Comment added',
                type: nextProps.error ? 'danger' : 'success'
            }
        }
    }

    render() {
        return (
            <div>
                { this.alert ? <Alert type={this.alert.type} message={this.alert.message} dismissible={true}/> : '' }
                <CommentForm
                    onSubmit={comment => this.props.addComment(Object.assign(comment, {post: this.props.postId}))} />
            </div>
        );
    }
}