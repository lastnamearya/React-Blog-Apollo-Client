import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Posts from './Posts/Posts';
import Post from './Posts/Post';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-apeast.graphcms.com/v1/cjq3qnpg27ity01bn6r18efw1/master'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/post/:id" component={Post} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
