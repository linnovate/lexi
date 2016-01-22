import { WP_API_URL } from '../wp-data';
import {checkStatus} from './'
export const COMMENTS_GET_REQUEST = Symbol();
export const COMMENTS_GET_SUCCESS = Symbol();
export const COMMENTS_GET_FAILED = Symbol();

function commentsGetRequest(postId) {
    return {
        type: COMMENTS_GET_REQUEST,
        payload: {
            postId: postId,
            comments: [],
            isFetching: true,
            error: null
        }
    }
}

function commentsGetSuccess(postId, comments) {
    return {
        type: COMMENTS_GET_SUCCESS,
        payload: {
            postId: postId,
            comments: comments,
            isFetching: false,
            error: null
        }
    }
}

function commentsGetFailed(postId, error) {
    return {
        type: COMMENTS_GET_FAILED,
        payload: {
            postId: postId,
            comments: [],
            error: error,
            isFetching: false
        }
    }
}

export default function fetchComments(postId) {
    return function (dispatch) {
        dispatch(commentsGetRequest(postId));
        return fetch(WP_API_URL + '/comments?post=' + postId + '&per_page=50')
            .then(checkStatus)
            .then(response => response.json())
            .then(commentsData =>
                dispatch(commentsGetSuccess(postId, commentsData))
            ).catch(error => dispatch(commentsGetFailed(postId, error)));
    }
}