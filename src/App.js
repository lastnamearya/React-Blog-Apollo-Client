import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Posts from './Posts/Posts';
import Post from './Posts/Post';
import NewPost from './Posts/NewPost';
import './App.css';

const defaultState = {
  isEditMode: false
};

const client = new ApolloClient({
  uri: 'https://api-apeast.graphcms.com/v1/cjq3qnpg27ity01bn6r18efw1/master',
  clientState: {
    defaults: defaultState,
    // It's a bug in Apollo as of now, resolvers isn't optional.
    resolvers: {}
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                <h1 className="App-title">GraphQL is Great</h1>
              </Link>
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/post/new" component={NewPost} />
                <Route path="/post/:id" component={Post} />
              </Switch>
            </main>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
