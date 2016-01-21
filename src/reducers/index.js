import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import page from './page';
import posts from './posts';
import post from './post';
import comment from './comment';
import comments from './comments';
// TODO: try to import * from './' instead of importing individual reducers

const rootReducer = combineReducers({
    page,
    post,
    posts,
    comment,
    comments,
    form: formReducer
});

export default rootReducer;