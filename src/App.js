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
            description: ''
        };
        //binding all our functions to this class
        this.deleteApp = this.deleteApp.bind(this);
        this.updateApp = this.updateApp.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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
        //if author or description changed, set it. if not, leave null and our PUT request
        //will ignore it.
        let author = (this.state.author) ? this.state.author : null;
        let description = (this.state.description) ? this.state.description : null;
        let app = { author: author, description: description };
        this.props.onAppUpdate(id, app);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            author: '',
            description: ''
        })
    }
    deleteApp(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onAppDelete(id);
        console.log('oops deleted');
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div style={style.comment}>
                <h3>{this.props.author}</h3>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <a style={style.updateLink} href='#' onClick={this.updateApp}>update</a>
                <a style={style.deleteLink} href='#' onClick={this.deleteApp}>delete</a>
                {(this.state.toBeUpdated)
                    ? (<form onSubmit={this.handleAppUpdate}>
                        <input
                            type='text'
                            placeholder='Update name...'
                            style={style.commentFormAuthor}
                            value={this.state.author}
                            onChange={this.handleAuthorChange} />
                        <input
                            type='text'
                            placeholder='Update your comment...'
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