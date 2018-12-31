import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const defaultState = {
  isEditMode: false
};

// In case of SSR, data needs to be supplimented into our Cache or this the place where we can bring our defaults in
const cache = new InMemoryCache();

// It makes sure that our cache first persists then it makes our Client to load.

persistCache({
  cache,
  storage: window.localStorage
}).then(() => {
  const client = new ApolloClient({
    // We need to add the cache, in our ApolloClient config
    cache,
    uri: 'https://api-apeast.graphcms.com/v1/cjq3qnpg27ity01bn6r18efw1/master',
    clientState: {
      defaults: defaultState,
      // It's a bug in Apollo as of now, resolvers isn't optional.
      resolvers: {}
    }
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
