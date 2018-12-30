import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    post: PropTypes.object
  };

  static defaultProps = {
    post: {}
  };

  state = {
    id: this.props.post.id || '',
    title: this.props.post.title || '',
    body: this.props.post.body || ''
  };

  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };

  resetFields = () => {
    this.setState({ title: '', body: '', id: '' });
  };

  render() {
    const { title, body, id } = this.state;
    const { onSubmit } = this.props;
    return (
      <form
        onSubmit={evt => {
          evt.preventDefault();
          onSubmit({
            variables: {
              title,
              body,
              id
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
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
