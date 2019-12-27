import React, { Component } from 'react';
import HebPlayerPort from './hebPlayerLoader';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.videoDiv = React.createRef();
  }

  onPlay() {
    HebPlayerPort.playVideo2("34020000001320550001", this.videoDiv.current, null);
  }

  onStop() {
    HebPlayerPort.stopVideo("34020000001320550001");
  }

  render() {
    return (
      <div className="App-root">
        <input className="App-gbID" type="text" defaultValue="3402000000132055000x" /><br/>
        <button ref={this.play} type="button" onClick={this.onPlay.bind(this)} >play</button>
        <button ref={this.stop} type="button" onClick={this.onStop.bind(this)} >stop</button>
        <div ref={this.videoDiv} className="App-video" test2="123abcd" ></div>
      </div>
    );
  }

}

export default App;
