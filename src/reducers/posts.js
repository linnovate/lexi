import { RECEIVE_POSTS, REQUEST_POSTS } from '../actions/index';

const defaultState = {
    posts: [],
    pageNum: 1,
    isFetching: false,
    totalPages: 1
};

export default function posts(state = defaultState, action) {
    switch(action.type) {

        case REQUEST_POSTS:
            return Object.assign({}, state, {isFetching: true, pageNum: action.payload.pageNum});

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