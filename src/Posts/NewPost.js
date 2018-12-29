import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PostForm from './PostForm';

export default class NewPost extends Component {
  render() {
    return (
      <div>
        <h1>Post Form</h1>
        <Mutation
          mutation={NEW_POST}
          refetchQueries={[
            {
              query: REFETCH_POSTS
            }
          ]}
          awaitRefetchQueries={true}
        >
          {(createPost, { loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Something went wrong.</p>;

            return <PostForm onSubmit={createPost} />;
          }}
        </Mutation>
      </div>
    );
  }
}

const NEW_POST = gql`
  mutation addPost($title: String!, $body: String!) {
    createPost(data: { status: PUBLISHED, title: $title, body: $body }) {
      title
      body
      id
    }
  }
`;

const REFETCH_POSTS = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;
