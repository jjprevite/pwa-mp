//AppForm.js
import React, { Component } from 'react';
import style from './style';

class AppForm extends Component {
    constructor(props) {
        super(props);
        this.state = { author: '', description: '' };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        let author = this.state.author.trim();
        let description = this.state.description.trim();
        if (!description || !author) {
            return;
        }
        this.props.onAppSubmit({ author: author, description: description });
        this.setState({ author: '', description: '' });
    }
    render() {
        return (
            <form style={style.commentForm} onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    placeholder='Your name...'
                    style={style.commentFormAuthor}
                    value={this.state.author}
                    onChange={this.handleAuthorChange} />
                <input
                    type='text'
                    placeholder='Say something...'
                    style={style.commentFormDescription}
                    value={this.state.description}
                    onChange={this.handleDescriptionChange} />
                <input
                    type='submit'
                    style={style.commentFormPost}
                    value='Post' />
            </form>
        )
    }
}

export default AppForm;