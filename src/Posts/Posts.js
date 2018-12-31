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

const POSTS_QUERY_FIRST_FIVE = gql`
  query allPosts {
    posts(orderBy: createdAt_DESC, first: 5) {
      id
      title
      body
    }
  }
`;

export default class Posts extends Component {
  render() {
    return (
      <div>
        <Link className="button" to={'/post/new'}>
          New Post
        </Link>
        <ol className="posts-listing">
          <Query query={POSTS_QUERY_FIRST_FIVE}>
            {({ data, loading, error }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Something went wrong</p>;

              const { posts } = data;
              return posts.map(post => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </li>
              ));
            }}
          </Query>
        </ol>
      </div>
    );
  }
}
