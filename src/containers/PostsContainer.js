import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router';
import Post from '../components/Post';
import Spinner from 'react-spinkit';

@connect (state => ({
    posts: state.posts.posts,
    pageNum: state.posts.pageNum,
    isFetching: state.posts.isFetching,
    totalPages: state.posts.totalPages
}), {fetchPosts})

// Smart component
export default class PostsContainer extends Component {

    componentDidMount() {
        const { pageNum = 1 } = this.props.params;
        this.props.fetchPosts(pageNum);
    }

    componentWillReceiveProps(nextProps) {
        const currentPageNum = this.props.params.pageNum || 1;
        const newPageNum = nextProps.params.pageNum || 1;
        if (currentPageNum != newPageNum) {
            this.props.fetchPosts(newPageNum);
        }
    }


    buildPosts(posts) {
        return posts.map(post =>
            <Post post={post} key={post.id}/>
        );
    }

    handlePaginationClick(pageNum) {
        scroll(0, 0);
    }

    buildPagination(pageNum, totalPages) {
        const prevText = "Previous";
        const nextText = "Next";
        const base = "/posts";

        let prevLink = {
            link: <a>{prevText}</a>,
            enabled: false
        };

        let nextLink = {
            link: <Link to={base + "/" + (pageNum + 1)}
                        onClick={() => this.handlePaginationClick(pageNum + 1)}>{nextText}</Link>,
            enabled: true
        };

        if (pageNum > 1 && pageNum < totalPages) {
            prevLink.link = <Link to={base + "/" + (pageNum - 1)}
                                  onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
            prevLink.enabled = true;
        } else if (pageNum == totalPages) {
            nextLink.link = <a>{nextText}</a>;
            nextLink.enabled = false;
            if (totalPages > 1) {
                prevLink.link = <Link to={base + "/" + (pageNum - 1)}
                                      onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
                prevLink.enabled = true;
            }

        }

        return (
            <nav>
                <ul className="pager">
                    <li key="prevLink" className={prevLink.enabled ? "" : "disabled"}>{prevLink.link}</li>
                    {" "}
                    <li key="nextLink" className={nextLink.enabled ? "" : "disabled"}>{nextLink.link}</li>
                </ul>
            </nav>
        );
    }

    render() {
        const { posts, totalPages, isFetching, pageNum = 1 } = this.props;
        return (
            isFetching
                ? <Spinner spinnerName='three-bounce' style={{position: 'fixed', top: '50%', left: '40%'}}/>
                :
                <div className="article-listing">
                    {this.buildPosts(posts)}
                    {this.buildPagination(parseInt(pageNum), totalPages)}
                </div>
        );
    }
}