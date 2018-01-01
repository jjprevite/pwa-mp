//Root.js
import React, { Component } from 'react';

class Root extends Component {
    render() {
        return (
            <main>
                <Route exact path="/" render={() => (
                    <AppBox
                        url='http://localhost:3001/api/apps'
                        pollInterval={2000} />
                )}/>
            </main>
        )
    }
}

export default AppList;