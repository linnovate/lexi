import { RECEIVE_PAGE, REQUEST_PAGE } from '../actions/index';

export const DEFAULT_PAGE = 'defaultPage';

let defaultState = {};

export default function page(state = defaultState, action) {

    switch(action.type) {

        case REQUEST_PAGE:
            return Object.assign({}, state, {[action.payload.pageName]: {isFetching: true}});

        case RECEIVE_PAGE:
            const { pageName, page } = action.payload;
            return Object.assign({}, state, {[pageName]: page});

        default:
            return state;
    }
}