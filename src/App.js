import React, { Component } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-apeast.graphcms.com/v1/cjq3qnpg27ity01bn6r18efw1/master'
});

const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      body
    }
  }
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header> */}
          <Query query={POSTS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return <p>Loading...</p>;

              const { posts } = data;
              return posts.map(post => <h1>{post.title}</h1>);
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
