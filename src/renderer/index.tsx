import React from 'react';
import { render } from 'react-dom';
import App from './App';

import './index.css';

require('dotenv').config();

render(<App />, document.getElementById('app'));
