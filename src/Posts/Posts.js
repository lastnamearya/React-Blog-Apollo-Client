import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 5, skip: $skip) {
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
          <Query query={POSTS_QUERY}>
            {({ data, loading, fetchMore, error }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Something went wrong</p>;

              const { posts } = data;

              return (
                <React.Fragment>
                  {posts.map(post => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                  ))}
                  <button
                    className="button"
                    onClick={() =>
                      fetchMore({
                        variables: {
                          skip: posts.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            posts: [...prev.posts, ...fetchMoreResult.posts]
                          });
                        }
                      })
                    }
                  >
                    Show More
                  </button>
                </React.Fragment>
              );
            }}
          </Query>
        </ol>
      </div>
    );
  }
}
