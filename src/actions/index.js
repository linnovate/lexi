import fetch from 'isomorphic-fetch';
import { WP_API_URL } from '../wp-url';

export const REQUEST_PAGE = 'REQUEST_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POST = 'REQUEST_POST';

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

const POSTS_PER_PAGE = 10;

function receivePage(pageName, pageData) {
    return {
        type: RECEIVE_PAGE,
        payload: {
            pageName: pageName,
            page: pageData || {error: true}
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

export function fetchPost(postName) {
    return dispatch => {
        dispatch(requestPost(postName));
        return fetch(WP_API_URL + '/posts?filter[name]=' + postName)
            .then(response => response.json())
            .then(posts => dispatch(receivePost(posts[0]))
            );
    }
}

function receivePost(post) {
    return {
        type: RECEIVE_POST,
        payload: {
            post: post
        }
    };
}