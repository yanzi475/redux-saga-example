import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import Counter from './Counter'
import reducer from './reducers'
import { sagas } from './rootSagas';
const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);

// const store = createStore(reducer)
const store = createStore(reducers, composeWithDevTools(middlewares));
let tasks = sagaMiddleware.run(sagas);

const onTasksException = () => {
  tasks.toPromise().catch(e => {
    tasks.cancel();
    tasks = sagaMiddleware.run(sagas);
    onTasksException();
  });
};
onTasksException();

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)


import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './store';
import routes, { DEFAULT_ROUTE, menus } from './routes';
// import { DEFAULT_ROUTE } from './routes'
import App from 'modules/app';
import Login from 'modules/login';

export default () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route
        path="/"
        component={props => (
          <App
            {...props}
            routes={routes}
            menus={menus}
            defaultRoute={DEFAULT_ROUTE}
          />
        )}
      />
    </Switch>
  </Router>
);
