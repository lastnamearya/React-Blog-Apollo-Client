import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PostForm from './PostForm';

export default class UpdatePost extends Component {
  render() {
    const { post } = this.props;
    return (
      <Mutation
        mutation={UPDATE_POST}
        refetchQueries={[
          {
            query: REFETCH_POSTS
          }
        ]}
        awaitRefetchQueries={true}
      >
        {(updatePost, result, loading, error) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Something went wrong.</p>;

          const onSuccess = () =>
            result.client.writeData({ data: { isEditMode: false } });

          console.log(result);

          return (
            <PostForm post={post} onSuccess={onSuccess} onSubmit={updatePost} />
          );
        }}
      </Mutation>
    );
  }
}

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(
      where: { id: $id }
      data: { status: PUBLISHED, title: $title, body: $body }
    ) {
      title
      body
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
