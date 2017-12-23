//AppList.js
import React, { Component } from 'react';
import App from './App';
import style from './style';

class AppList extends Component {
    render() {
        let appNodes = this.props.data.map(app => {
            return (
                <App
                    author={app.author}
                    uniqueID={app['_id']}
                    onAppDelete={this.props.onAppDelete}
                    onAppUpdate={this.props.onAppUpdate}
                    key={app['_id']}>
                    {app.description}
                </App>
            )
        })
        return (
            <div style={style.commentList}>
                {appNodes}
            </div>
        )
    }
}

export default AppList;