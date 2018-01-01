//AppForm.js
import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import style from './style';

class AppForm extends Component {
    constructor(props) {
        super(props);
        this.state = { author: '', category: '', dateAdded: '', description: '', icon: '', link: '', name: '' };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        // this.handleDateAddedChange = this.handleDateAddedChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }
    handleCategoryChange(e) {
        this.setState({ category: e.target.value });
    }
    // handleDateAddedChange(e) {
    //     this.setState({ dateAdded: e.target.value });
    // }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    handleIconChange(e) {
        this.setState({ icon: e.target.value });
    }
    handleLinkChange(e) {
        this.setState({ link: e.target.value });
    }
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push('/');
        let author = this.state.author.trim();
        let category = this.state.category.trim();
        // let dateAdded = this.state.dateAdded.trim();
        let description = this.state.description.trim();
        let icon = this.state.icon.trim();
        let link = this.state.link.trim();
        let name = this.state.name.trim();
        // removed !dateAdded in line below
        if (!author || !category || !description || !icon || !link || !name) {
            return;
        }
        //removed dateAdded in two lines below
        this.props.onAppSubmit({ author: author, category: category, description: description, icon: icon, link: link, name: name });
        this.setState({ author: '', category: '', description: '', icon: '', link: '', name: '' });
    }
    render() {
        return (
            <form style={style.commentForm} onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    placeholder='App name...'
                    style={style.commentFormDescription}
                    value={this.state.name}
                    onChange={this.handleNameChange} />
                <input
                    type='text'
                    placeholder='App description...'
                    style={style.commentFormDescription}
                    value={this.state.description}
                    onChange={this.handleDescriptionChange} />
                <input
                    type='text'
                    placeholder='Link to icon...'
                    style={style.commentFormDescription}
                    value={this.state.icon}
                    onChange={this.handleIconChange} />
                <select
                    style={style.commentFormDescription}
                    value={this.state.category}
                    onChange={this.handleCategoryChange}>
                    <option value="education">Education</option>
                    <option value="financial">Financial</option>
                    <option value="funAndGames">Fun and Games</option>
                    <option value="productivity">Productivity</option>
                    <option value="socialAndCommunity">Social and Community</option>
                </select>
                <input
                    type='text'
                    placeholder='Link to app...'
                    style={style.commentFormDescription}
                    value={this.state.link}
                    onChange={this.handleLinkChange} />
                <input
                    type='text'
                    placeholder='Your name...'
                    style={style.commentFormAuthor}
                    value={this.state.author}
                    onChange={this.handleAuthorChange} />
                <input
                    type='submit'
                    style={style.commentFormPost}
                    value='Post' />
            </form>
        )
    }
}

export default AppForm;