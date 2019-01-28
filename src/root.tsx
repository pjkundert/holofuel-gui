import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import TransactionOverviewContainer from './containers/TransactionOverviewContainer';

import TestApp from './containers/MainAppContainer';

const Root = ({ store, history }: { store: Store, history: any }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/testapp' component={TestApp} />
        <Route path='/' component={TransactionOverviewContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root;
