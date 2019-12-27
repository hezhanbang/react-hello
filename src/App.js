import React, { Component } from 'react';
import HebPlayerPort from './hebPlayerLoader';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.playDiv = React.createRef();
  }

  componentDidMount() { 
    HebPlayerPort.init('http://172.21.4.114:9004/player/hebPlayer.safe.js', true);
    
    let fun = function() {
      HebPlayerPort.playVideo2("34020000001320550001", this.playDiv.current, null);
    };
    setTimeout(fun.bind(this), 1000*2);
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
        <video ref={this.playDiv} className="App-video" test2="123abcd" />
      </div>
    );
  }
}

export default App;
