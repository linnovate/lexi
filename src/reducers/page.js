import { RECEIVE_PAGE, REQUEST_PAGE, REQUEST_PAGE_FAILED } from '../actions';

let defaultState = {};

export default function page(state = defaultState, action) {

    switch(action.type) {

        case REQUEST_PAGE:
            return Object.assign({}, state, {[action.payload.pageName]: {isFetching: true}});

        case REQUEST_PAGE_FAILED:
            return Object.assign({}, state, {
                [action.payload.pageName]: {isFetching: false, error: action.payload.error}
            });

        case RECEIVE_PAGE:
            const { pageName, page } = action.payload;
            return Object.assign({}, state, {[pageName]: page});

        default:
            return state;
    }
}