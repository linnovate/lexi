import React, { Component } from 'react';
import { fetchPost } from '../actions/index';
import { connect } from 'react-redux';
import Post from '../components/Post';
import Spinner from 'react-spinkit';
import CommentContainer from './CommentContainer';
import CommentsContainer from './CommentsContainer';

@connect (state => ({...state.post}))

export default
class PostContainer extends Component {

    componentWillMount() {
        console.log(this.props);
        const {dispatch, params} = this.props;
        dispatch(fetchPost(params.postName))
    }

    render() {
        const { post, isFetching } = this.props;
        console.log(post.id);
        if (isFetching)
            return (<Spinner spinnerName='three-bounce' style={{position:'fixed',top:'50%',left:'40%'}}/>);
        else if (!post.id)
            return (<div></div>);
        else
            scroll(0, 0);
        return (
            <div>
                <Post post={post} key={post.id}/>
                <CommentContainer postId={this.props.post.id}/>
                {post.id ? <CommentsContainer currentPostId={post.id} /> : ""}
            </div>
        );
    }
}