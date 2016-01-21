import { WP_API_URL } from '../wp-data';

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
            .then(response => response.json())
            .then(commentsData =>
                dispatch(commentsGetSuccess(postId, commentsData))
            ).catch(error => {
                const response = error.response;
                if (response === undefined) {
                    dispatch(commentsGetFailed(postId, error));
                } else {
                    response.json()
                        .then(json => {
                            error.status = response.status;
                            error.statusText = response.statusText;
                            error.message = json.message;
                            dispatch(commentsGetFailed(postId, error));
                        });
                }
            });
    }
}