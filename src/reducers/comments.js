import { COMMENTS_GET_FAILED, COMMENTS_GET_REQUEST, COMMENTS_GET_SUCCESS  } from '../actions/index';

let defaultState = {
    comments: [],
    postId: null,
    isFetching: false,
    error: null
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case COMMENTS_GET_REQUEST:
        case COMMENTS_GET_SUCCESS:
        case COMMENTS_GET_FAILED:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}