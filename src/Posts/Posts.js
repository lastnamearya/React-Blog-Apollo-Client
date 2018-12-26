import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;

export default class Posts extends Component {
  render() {
    return (
      <ul>
        <Query query={POSTS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Something went wrong</p>;

            const { posts } = data;
            return posts.map(post => (
              <li key={post.id}>
                <Link
                  to={`/post/${post.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <h1>{post.title}</h1>
                </Link>
              </li>
            ));
          }}
        </Query>
      </ul>
    );
  }
}
