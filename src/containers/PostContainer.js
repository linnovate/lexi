import React, { Component } from 'react';
import { fetchPost } from '../actions';
import { connect } from 'react-redux';
import Post from '../components/Post';
import Spinner from 'react-spinkit';

@connect (state => ({post: state.post.post, isFetching: state.post.isFetching}), {fetchPost})

export default class PostContainer extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.params.postName);
    }

    render() {
        const { post, isFetching } = this.props;
        if (post === null)
            return(<div></div>);
        else if (isFetching)
            return (<Spinner spinnerName='three-bounce' noFadeIn style={{position: 'fixed', top: '50%', left: '40%'}} />);
        else
            scroll(0, 0);
            return (<Post post={post} key={post.id}/>);
    }
}