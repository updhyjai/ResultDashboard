import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
//import Chart from './components/TrendChart';
//import chartData from './models/data.json';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    
<BrowserRouter>
<App/>

</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
