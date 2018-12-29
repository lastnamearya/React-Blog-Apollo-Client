import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UpdatePost from './UpdatePost';

export const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      title
      id
      body
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

          const { post } = data;

          return (
            <div>
              <section>
                <h1>{post.title}</h1>
              </section>
              <section>
                <h1>Edit Post</h1>
                <UpdatePost id={post.id} />
              </section>
            </div>
          );
        }}
      </Query>
    );
  }
}
