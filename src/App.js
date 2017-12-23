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
            text: ''
        };
        //binding all our functions to this class
        this.deleteApp = this.deleteApp.bind(this);
        this.updateApp = this.updateApp.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
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
        //if author or text changed, set it. if not, leave null and our PUT request
        //will ignore it.
        let author = (this.state.author) ? this.state.author : null;
        let text = (this.state.text) ? this.state.text : null;
        let comment = { author: author, text: text };
        this.props.onAppUpdate(id, comment);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            author: '',
            text: ''
        })
    }
    deleteApp(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onAppDelete(id);
        console.log('oops deleted');
    }
    handleTextChange(e) {
        this.setState({ text: e.target.value });
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
                            style={style.commentFormText}
                            value={this.state.text}
                            onChange={this.handleTextChange} />
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