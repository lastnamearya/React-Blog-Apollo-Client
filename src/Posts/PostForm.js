import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

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
    const { id } = this.props;
    console.log(id);
    return (
      <form
        onSubmit={evt => {
          evt.preventDefault();
          onSubmit(
            id
              ? {
                  variables: {
                    id,
                    title,
                    body
                  }
                }
              : {
                  variables: {
                    title,
                    body
                  }
                }
          )
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
