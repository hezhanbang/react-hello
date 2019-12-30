import React from 'react';
import ReactDOM from 'react-dom';
import DemoPlayer from './App';
import HebPlayerPort from './hebPlayerLoader';
import './index.css';

HebPlayerPort.init('http://172.21.4.114:9004/player/hebPlayer.safe.js', true);

ReactDOM.render(
  <div><DemoPlayer /><DemoPlayer /><DemoPlayer /></div>,
  document.getElementById('root')
);
