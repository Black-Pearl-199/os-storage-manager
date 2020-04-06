import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import App from './App';

import './index.css';
import 'bootstrap/scss/bootstrap.scss';
import './assets/scss/main-itech.scss';
import "react-datepicker/dist/react-datepicker.css";
// import LogRocket from 'logrocket';
// import setupLogRocketReact from 'logrocket-react';

require('dotenv').config();

export const env = process.env;
if (env.REACT_APP_ENV !== 'production') {
    console.log(env);
} else {
}

// LogRocket.init('pqlpgl/itech-telerad');
// setupLogRocketReact(LogRocket);

const MY_APP =
    <BrowserRouter>
        <App/>
    </BrowserRouter>;

ReactDOM.render(MY_APP, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
