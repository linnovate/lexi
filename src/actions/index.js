import fetch from 'isomorphic-fetch';
import {reset} from 'redux-form';
import { WP_API_URL } from '../wp-data';
export * from './comments'

export const REQUEST_PAGE_FAILED = 'REQUEST_PAGE_FAILED';
export const REQUEST_PAGE = 'REQUEST_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POSTS_FAILED = 'REQUEST_POSTS_FAILED';
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
            isFetching: true,
            error: null
        }
    }
}

function commentAddSuccess(comment) {
    return {
        type: COMMENT_ADD_SUCCESS,
        payload: {
            comment: comment,
            isFetching: false,
            error: null
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
function requestPageFailed(pageName, error) {
    return {
        type: REQUEST_PAGE_FAILED,
        payload: {
            pageName: pageName,
            error: error
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
function requestPostsFailed(pageNum, error) {
    return {
        type: REQUEST_POSTS_FAILED,
        payload: {
            pageNum: pageNum,
            error: error
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
                .then(checkStatus)
                .then(response => response.json())
                .then(checkResponseEmpty)
                .then(pages => dispatch(receivePage(pageName, pages[0])))
                .catch(error => dispatch(requestPageFailed(pageName, error)));
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
            .then(checkStatus)
            .then(response => Promise.all([response.headers.get('X-WP-TotalPages'), response.json()]))
            .then(postsData => dispatch(receivePosts(pageNum, postsData[0], postsData[1])))
            .catch(error => dispatch(requestPostsFailed(pageNum, error)));
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
        return fetch(WP_API_URL + '/comments', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentData)
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(comment => dispatch(commentAddSuccess(comment)))
            .then(() => dispatch(reset('comment')))
            .catch(error => dispatch(commentAddFailed(commentData, error)));
    }
}

function checkStatus(response) {
    console.log("Status: " + response.status);
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function checkResponseEmpty(response) {
    if (response.length > 0) {
        return response
    } else {
        var error = new Error("Not Found")
        throw error
    }
}
