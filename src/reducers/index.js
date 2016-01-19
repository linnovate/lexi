import { combineReducers } from 'redux';
import page from './page';
import posts from './posts';
import post from './post';
// TODO: try to import * from './' instead of importing individual reducers

const rootReducer = combineReducers({
    page,
    post,
    posts
});

export default rootReducer;