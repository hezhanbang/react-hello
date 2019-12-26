import React, { Component } from 'react';
import HebPlayerPort from './hebPlayerLoader';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    HebPlayerPort.init('http://172.21.4.114:9004/player/hebPlayer.safe.js');
    setTimeout(function() {
      HebPlayerPort.playVideo("div1", "34020000001320550001", null);
    }, 1000*5);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <video className="App-video" />
      </div>
    );
  }
}

export default App;
