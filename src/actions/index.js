import fetch from 'isomorphic-fetch';
import { WP_API_URL } from '../wp-data';

export const REQUEST_PAGE = 'REQUEST_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POST = 'REQUEST_POST';

export const COMMENT_ADD_REQUEST = 'COMMENT_SUBMIT_REQUEST';
export const COMMENT_ADD_SUCCESS = 'COMMENT_SUBMIT_SUCCESS';
export const COMMENT_ADD_FAILED = 'COMMENT_SUBMIT_FAILED';

const POSTS_PER_PAGE = 10;

function commentAddRequest(comment) {
    return {
        type: COMMENT_ADD_REQUEST,
        payload: {
            comment: comment,
            isFetching: true
        }
    }
}

function commentAddSuccess(comment) {
    alert("ok");
    return {
        type: COMMENT_ADD_SUCCESS,
        payload: {
            comment: comment,
            isFetching: false
        }
    }
}

function commentAddFailed(comment, error) {
    return {
        type: COMMENT_ADD_FAILED,
        payload: {
            comment: comment,
            error: error,
            isFetching: false
        }
    }
}

function requestPost(postName) {
    return {
        type: REQUEST_POST,
        payload: {
            postName: postName
        }
    }
}
function requestPage(pageName) {
    return {
        type: REQUEST_PAGE,
        payload: {
            pageName: pageName
        }
    }
}
function requestPosts(pageNum) {
    return {
        type: REQUEST_POSTS,
        payload: {
            pageNum: pageNum
        }
    }
}

function receivePage(pageName, pageData) {
    return {
        type: RECEIVE_PAGE,
        payload: {
            pageName: pageName,
            page: pageData || {error: true}
        }
    };
}

function receivePosts(pageNum, totalPages, posts) {
    return {
        type: RECEIVE_POSTS,
        payload: {
            pageNum: pageNum,
            totalPages: totalPages,
            posts: posts
        }
    };
}
function receivePost(post) {
    return {
        type: RECEIVE_POST,
        payload: {
            post: post
        }
    };
}
export function fetchPageIfNeeded(pageName) {
    return function (dispatch, getState) {
        if (shouldFetchPage(getState(), pageName)) {
            dispatch(requestPage(pageName));
            return fetch(WP_API_URL + '/pages?filter[name]=' + pageName)
                .then(response => response.json())
                .then(pages => dispatch(receivePage(pageName, pages[0])));
        }
    }
}

function shouldFetchPage(state, pageName) {
    const pages = state.page;
    return !pages.hasOwnProperty(pageName);
}

export function fetchPosts(pageNum = 1) {
    return function (dispatch) {
        dispatch(requestPosts(pageNum));
        return fetch(WP_API_URL + '/posts?filter[paged]=' + pageNum + '&filter[posts_per_page]=' + POSTS_PER_PAGE)
            .then(response =>
                Promise.all([response.headers.get('X-WP-TotalPages'), response.json()])
            )
            .then(postsData =>
                dispatch(receivePosts(pageNum, postsData[0], postsData[1]))
            );
    }
}

export function fetchPost(postName) {
    return dispatch => {
        dispatch(requestPost(postName));
        return fetch(WP_API_URL + '/posts?filter[name]=' + postName)
            .then(response => response.json())
            .then(posts => dispatch(receivePost(posts[0]))
            );
    }
}

export function addComment(commentData) {
    return dispatch => {
        dispatch(commentAddRequest(commentData));
        return fetch(WP_API_URL + '/comments',{
            method: 'POST',
            body: JSON.stringify(commentData)
        })
            .then(response => response.json())
            .then(comment => dispatch(commentAddSuccess(comment)))
            .catch(error => {
                const response = error.response;
                if (response === undefined) {
                    dispatch(commentAddFailed(commentData, error));
                } else {
                    response.json()
                        .then(json => {
                            error.status = response.status;
                            error.statusText = response.statusText;
                            error.message = json.message;
                            dispatch(commentAddFailed(commentData, error));
                        });
                }
            });
    }
}