import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchComments from '../actions/comments';
import { Link } from 'react-router';
import Comment from '../components/Comment';
import Spinner from 'react-spinkit';

@connect (state => ({...state.comments, comment: state.comment.comment}))

// Smart component
export default class CommentsContainer extends Component {

    static propTypes = {
        currentPostId: React.PropTypes.number
    };

    componentWillMount() {
        const { dispatch, postId, currentPostId } = this.props;
        if (currentPostId && (postId != currentPostId || !postId)) {
            dispatch(fetchComments(currentPostId));
        }
    }

    componentWillReceiveProps(nextProps){
        if (
            nextProps.comment &&
            nextProps.comment.id &&
            nextProps.comment.post == this.props.currentPostId &&
            nextProps.comment != this.props.comment &&
            nextProps.comment.status == "approved"
        ) {
            nextProps.comments.push(nextProps.comment);
        }
    }

    buildComments(comments) {
        return comments.map(comment =>
            <Comment comment={comment} key={comment.id}/>
        );
    }

    render() {
        const { currentPostId, comments, isFetching } = this.props;
        if (!currentPostId) {
            return null
        }
        return (
            isFetching
                ? <Spinner spinnerName='double-bounce'/>
                :
                <div className="comment-listing">
                    <hr />
                    <h4>{comments.length ? "Comments" : "No comments yet"}</h4>
                    {this.buildComments(comments)}
                </div>
        );
    }
}