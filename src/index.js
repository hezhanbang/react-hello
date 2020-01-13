import React from 'react';
import ReactDOM from 'react-dom';
import DemoPlayer from './App';
import HebPlayerPort from './hebPlayerLoader';
import './index.css';

HebPlayerPort.init('http://192.168.2.100:9004/player/hebPlayer.js', true);

ReactDOM.render(
  <div><DemoPlayer /><DemoPlayer /><DemoPlayer /></div>,
  document.getElementById('root')
);
