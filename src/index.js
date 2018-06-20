import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import createSagaMiddleware from 'redux-saga';

import mySaga from './sagas'
import reducers from './reducers';

import Articles from './components/articles';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    applyMiddleware(promiseMiddleware),
    applyMiddleware(sagaMiddleware)
)

const App = () => (
    <Provider store={store}>
    	<Articles />
    </Provider>
)

sagaMiddleware.run(mySaga);

ReactDOM.render(<App />, document.getElementById('root'));
