import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import App from './components/App';

// first argument -> root reducer
// second argument -> Store seed (important for server side rendering)
// third argument -> middlewares
const store = createStore(()=>[], {}, applyMiddleware())

ReactDOM.render(
<Provider store={store}>
<App/>
</Provider> , document.querySelector('#root'));
