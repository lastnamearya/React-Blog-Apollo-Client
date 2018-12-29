import React, { Component } from 'react';
// import PostForm from './PostForm';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export default class NewPost extends Component {
  state = {
    title: '',
    body: ''
  };

  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>Post Form</h1>
        <Mutation
          mutation={NEW_POST}
          refetchQueries={[
            {
              query: REFETCH
            }
          ]}
          awaitRefetchQueries={true}
          // variables={{
          //   title,
          //   body
          // }}
        >
          {(createPost, { loading, error }) => (
            <form
              onSubmit={evt => {
                evt.preventDefault();
                createPost({
                  variables: {
                    title,
                    body
                  }
                });
              }}
            >
              <input
                name="title"
                type="text"
                onChange={this.handleInput}
                value={title}
                placeholder="title"
              />
              <textarea
                name="body"
                type="text"
                onChange={this.handleInput}
                value={body}
                placeholder="body"
              />
              <button type="submit">Submit</button>
              {loading && <p>Loading...</p>}
              {error && <p>Something went wrong.</p>}
            </form>
          )}
        </Mutation>
        {/* <PostForm /> */}
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

const REFETCH = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;
