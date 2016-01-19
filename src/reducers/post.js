import { RECEIVE_POST, REQUEST_POST  } from '../actions/index';

let defaultState = {
    post: {},
    isFetching: true
};

export default function post(state = defaultState, action) {
    switch(action.type) {
        case REQUEST_POST:
            return Object.assign({}, state, {post: {}, isFetching: true});

        case RECEIVE_POST:
            const { post } = action.payload;
            return Object.assign({}, state, {post: post, isFetching: false});

        default:
            return state;
    }

}