//App.js
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: false,
            author: '',
            category: '',
            dateAdded: '',
            description: '',
            icon: '',
            link: '',
            name: ''
        };
        //binding all our functions to this class
        this.deleteApp = this.deleteApp.bind(this);
        this.updateApp = this.updateApp.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAppUpdate = this.handleAppUpdate.bind(this);
    }
    updateApp(e) {
        e.preventDefault();
        //brings up the update field when we click on the update link.
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }
    handleAppUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        //if name or description changed, set it. if not, leave null and our PUT request
        //will ignore it.
        let author = (this.state.author) ? this.state.author : null;
        let category = (this.state.category) ? this.state.category : null;
        let description = (this.state.description) ? this.state.description : null;
        let icon = (this.state.icon) ? this.state.icon : null;
        let link = (this.state.link) ? this.state.link : null;
        let name = (this.state.name) ? this.state.name : null;
        let app = { author: author, category: category, description: description, icon: icon, link: link, name: name };
        this.props.onAppUpdate(id, app);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            author: '',
            category: '',
            description: '',
            icon: '',
            link: '',
            name: ''
        })
    }
    deleteApp(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onAppDelete(id);
        console.log('oops deleted');
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }
    handleCategoryChange(e) {
        this.setState({ category: e.target.value });
    }
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
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div style={style.comment}>
                <h3>{this.props.name}</h3>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <a style={style.updateLink} href='#' onClick={this.updateApp}>update</a>
                <a style={style.deleteLink} href='#' onClick={this.deleteApp}>delete</a>
                {(this.state.toBeUpdated)
                    ? (<form onSubmit={this.handleAppUpdate}>
                        <input
                            type='text'
                            placeholder='Update name...'
                            style={style.commentFormAuthor}
                            value={this.state.name}
                            onChange={this.handleNameChange} />
                        <input
                            type='text'
                            placeholder='Update your description...'
                            style={style.commentFormDescription}
                            value={this.state.description}
                            onChange={this.handleDescriptionChange} />
                        <input
                            type='submit'
                            style={style.commentFormPost}
                            value='Update' />
                    </form>)
                    : null}
            </div>
        )
    }
}

export default App;