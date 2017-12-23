//AppList.js
import React, { Component } from 'react';
import App from './App';
import style from './style';

class AppList extends Component {
    render() {
        let commentNodes = this.props.data.map(comment => {
            return (
                <App
                    author={comment.author}
                    uniqueID={comment['_id']}
                    onAppDelete={this.props.onAppDelete}
                    onAppUpdate={this.props.onAppUpdate}
                    key={comment['_id']}>
                    {comment.text}
                </App>
            )
        })
        return (
            <div style={style.commentList}>
                {commentNodes}
            </div>
        )
    }
}

export default AppList;