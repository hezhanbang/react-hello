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
      <div className="App-root">
        <input className="App-gbID" type="text" value="3402000000132055000x" /><br/>
        <button type="button">play</button>
        <button type="button">stop</button>
        <div ref={this.playDiv} className="App-video" test2="123abcd" ></div>
      </div>
    );
  }
}

export default App;
