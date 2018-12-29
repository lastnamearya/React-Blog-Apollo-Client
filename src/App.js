import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import logo from './logo.svg';
import Posts from './Posts/Posts';
import Post from './Posts/Post';
import NewPost from './Posts/NewPost';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-apeast.graphcms.com/v1/cjq3qnpg27ity01bn6r18efw1/master'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                <h3 className="App-title">GraphQL is Great</h3>
              </Link>
            </header>

            <Link to={'/post/new'}>New Post</Link>

            <Switch>
              <Route exact path="/" component={Posts} />
              <Route exact path="/post/new" component={NewPost} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
