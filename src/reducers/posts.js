import { RECEIVE_POSTS, REQUEST_POSTS, REQUEST_POSTS_FAILED } from '../actions/index';

const defaultState = {
    posts: [],
    pageNum: 1,
    isFetching: false,
    totalPages: 1,
    error: null
};

export default function posts(state = defaultState, action) {
    switch(action.type) {

        case REQUEST_POSTS:
            return Object.assign({}, state, {isFetching: true, pageNum: action.payload.pageNum});

        case REQUEST_POSTS_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                pageNum: action.payload.pageNum,
                error: action.payload.error
            });

        case RECEIVE_POSTS:
            const { pageNum, totalPages, posts } = action.payload;

            return Object.assign({}, state, {
                posts: posts,
                pageNum: pageNum,
                isFetching: false,
                totalPages: parseInt(totalPages)
            });

        default:
            return state;
    }

}