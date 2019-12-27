import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HebPlayerPort from './hebPlayerLoader';
import './index.css';

HebPlayerPort.init('http://172.21.4.114:9004/player/hebPlayer.safe.js', true);

ReactDOM.render(
  <div><App /><App /><App /></div>,
  document.getElementById('root')
);
