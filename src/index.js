import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import LexiTheme from './containers/LexiTheme';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import PageContainer from './containers/PageContainer';
import '../sass/bootstrap.css';
import '../sass/bootstrap-blog.css';
import "react-progress-2/main.css";

const history = new createBrowserHistory();
const store = configureStore();
let rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={LexiTheme}>
                <IndexRoute component={PostsContainer} />
                <Route path=":pageName" component={PageContainer} />
                <Route path="posts/:pageNum" component={PostsContainer} />
                <Route path=":year/:month/:day/:postName/" component={PostContainer} />
            </Route>
        </Router>
    </Provider>,
    rootElement
);