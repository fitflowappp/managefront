/**
 * Created by john on 2016/5/16.
 */
import 'es6-shim';
import 'console-polyfill';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { Router,browserHistory  } from 'react-router';
import routes from './routes';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;
//es6 ie9兼容


const store = configureStore(initialState);
render(
        <Provider store={store}>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </Provider>,
    document.getElementById('root')
);
