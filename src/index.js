//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Root from './Root';

ReactDOM.render(
    <Router>
        <Root/>
    </Router>,
    document.getElementById('root')
);