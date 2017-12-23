//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppBox from './AppBox';

ReactDOM.render(
    <AppBox
        url='http://localhost:3001/api/comments'
        pollInterval={2000} />,
    document.getElementById('root')
);