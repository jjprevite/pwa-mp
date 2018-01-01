import React, { Component } from 'react';
import axios from 'axios';
import AppList from './AppList';
import AppForm from './AppForm';
import style from './style';

class AppBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadAppsFromServer = this.loadAppsFromServer.bind(this);
        this.handleAppSubmit = this.handleAppSubmit.bind(this);
        this.handleAppDelete = this.handleAppDelete.bind(this);
        this.handleAppUpdate = this.handleAppUpdate.bind(this);
        this.pollInterval = null;
    }
    loadAppsFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
            })
    }
    handleAppDelete(id) {
        axios.delete(`${this.props.url}/${id}`)
            .then(res => {
                console.log('App deleted');
            })
            .catch(err => {
                console.error(err);
            });
    }
    handleAppUpdate(id, app) {
        //sends the app id and new author/description to our api
        axios.put(`${this.props.url}/${id}`, app)
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.loadAppsFromServer();
        if (!this.pollInterval) {
            this.pollInterval = setInterval(this.loadAppsFromServer, this.props.pollInterval)
        }
    }
    //when incorporating into another project
    //(with react-router for instance),
    //this will prevent error messages every 2 seconds
    //once the AppBox is unmounted
    componentWillUnmount() {
        this.pollInterval && clearInterval(this.pollInterval);
        this.pollInterval = null;
    }
    render() {
        return (
            <div style={style.commentBox}>
                <h2 style={style.title}>Web App Store</h2>
                <p style={style.tagLine}>The only marketplace for progressive web apps</p>
                <form style={style.searchForm}>
                    <input style={style.searchField} type="search"/>
                </form>
                <p style={style.tagLine}><a href="/form">Want to add your app?</a></p>
                <AppList
                    onAppDelete={this.handleAppDelete}
                    onAppUpdate={this.handleAppUpdate}
                    data={this.state.data} />
            </div>
        )
    }
}

export default AppBox;