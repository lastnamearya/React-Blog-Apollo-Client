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
  query allPosts($first: Int!, $skip: Int!) {
    posts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      body
    }
  }
`;

export default class Posts extends Component {
  state = {
    first: 3
  };

  handleLoading = () => {
    this.setState(prevState => ({
      first: prevState.first + 3
    }));
  };

  render() {
    return (
      <div>
        <Link className="button" to={'/post/new'}>
          New Post
        </Link>
        <ol className="posts-listing">
          <Query
            query={POSTS_QUERY_FIRST_FIVE}
            variables={{ first: this.state.first, skip: 0 }}
          >
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
        <button onClick={this.handleLoading} className="button">
          Load More
        </button>
      </div>
    );
  }
}
