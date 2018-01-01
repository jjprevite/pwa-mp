//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppBox from './AppBox';

ReactDOM.render(
    <Router>
    <AppBox
        url='http://localhost:3001/api/apps'
        pollInterval={2000} />
    </Router>,
    document.getElementById('root')
);