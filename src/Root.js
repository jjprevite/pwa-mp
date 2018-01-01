import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBox from './AppBox';
import AppForm from './AppForm';

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.handleAppSubmit = this.handleAppSubmit.bind(this);
        this.pollInterval = null;
    }
    handleAppSubmit(app) {
        let apps = this.state.data;
        app.id = Date.now();
        let newApps = apps.concat([app]);
        this.setState({ data: newApps });
        axios.post('http://localhost:3001/api/apps', app)
            .catch(err => {
                console.error(err);
                this.setState({ data: apps });
            });
    }
    componentWillUnmount() {
        this.pollInterval && clearInterval(this.pollInterval);
        this.pollInterval = null;
    }
    render(){
        return (
            <Router>
                <main>
                    <Route exact path="/" render={() => (
                        <AppBox
                            url='http://localhost:3001/api/apps'
                            pollInterval={2000}
                        />
                    )}/>
                    <Route exact path ="/form" render={() => (
                        <AppForm onAppSubmit={this.handleAppSubmit} />
                    )} />
                    <Route path="/apps/:app_id" render={() => (
                        <AppForm/>
                    )} />
                </main>
            </Router>
        );
    }
}

export default Root;
