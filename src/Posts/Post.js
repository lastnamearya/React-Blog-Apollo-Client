import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import UpdatePost from './UpdatePost';
import EditMode from './EditMode';

export const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      title
      id
      body
      check
    }
    isEditMode @client
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($check: Boolean, $id: ID!) {
    updatePost(where: { id: $id }, data: { check: $check }) {
      check
    }
  }
`;

export default class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Something went wrong.</p>;

          const { post, isEditMode } = data;

          return (
            <div>
              <EditMode isEditMode={isEditMode} />
              {isEditMode ? (
                <section>
                  <h1>Edit Post</h1>
                  <UpdatePost post={post} />
                </section>
              ) : (
                <section>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                  <Mutation
                    mutation={UPDATE_POST}
                    variables={{
                      id: post.id,
                      check: !post.check
                    }}
                    optimisticResponse={{
                      __typename: 'Mutation',
                      updatePost: {
                        __typename: 'Post',
                        check: !post.check
                      }
                    }}
                    // This updatePost coming from our optimisticResponse
                    update={(cache, { data: { updatePost } }) => {
                      const data = cache.readQuery({
                        query: POST_QUERY,
                        variables: {
                          id: post.id
                        }
                      });
                      data.post.check = updatePost.check;
                      // Now on Successfully adding, it's time to write actual to our database.
                      cache.writeQuery({
                        query: POST_QUERY,
                        data: {
                          ...data,
                          post: data.post
                        }
                      });
                    }}
                  >
                    {UpdatePost => (
                      <input
                        type="checkbox"
                        onChange={UpdatePost}
                        checked={post.check}
                      />
                    )}
                  </Mutation>
                </section>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}
