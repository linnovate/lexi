import { COMMENT_ADD_FAILED, COMMENT_ADD_REQUEST, COMMENT_ADD_SUCCESS  } from '../actions/index';

let defaultState = {
    comment: {},
    isFetching: false
};

export default function comment(state = defaultState, action) {
    switch(action.type) {
        case COMMENT_ADD_REQUEST:
            return Object.assign({}, state, action.payload);

        case COMMENT_ADD_SUCCESS:
            return Object.assign({}, state, action.payload);

        case COMMENT_ADD_FAILED:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }

}