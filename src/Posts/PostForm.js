import React, { Component } from 'react';

export default class PostForm extends Component {
  state = {
    title: '',
    body: ''
  };

  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };

  resetFields = () => {
    this.setState({ title: '', body: '' });
  };

  render() {
    const { title, body } = this.state;
    const { onSubmit } = this.props;
    return (
      <form
        onSubmit={evt => {
          evt.preventDefault();
          onSubmit({
            variables: {
              title,
              body
            }
          })
            .then(() => this.resetFields)
            .catch(error => console.log(error));
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
      </form>
    );
  }
}
