import React from 'react';
import ReactDOM from 'react-dom';
import HelloPlayer from './App';
import HebPlayerPort from './hebPlayerLoader';
import './index.css';

HebPlayerPort.init(null, true);

ReactDOM.render(
  <div><HelloPlayer /><HelloPlayer /><HelloPlayer /></div>,
  document.getElementById('root')
);
