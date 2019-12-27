import React, { Component } from 'react';
import HebPlayerPort from './hebPlayerLoader';
import './App.css';

class HelloPlayer extends Component {
  constructor(props) {
    super(props);
    this.curruntID = '';
    this.gbID = React.createRef();
    this.videoDiv = React.createRef();
  }

  onPlay() {
    this.curruntID = this.gbID.current.value;
    HebPlayerPort.playVideo2(this.curruntID, this.videoDiv.current, null);
  }

  onStop() {
    HebPlayerPort.stopVideo(this.curruntID);
  }

  render() {
    return (
      <div className="App-root">
        <input ref={this.gbID} className="App-gbID" type="text" defaultValue="3402000000132055000x" />
        <button type="button" onClick={this.onPlay.bind(this)} >play</button>
        <button type="button" onClick={this.onStop.bind(this)} >stop</button>
        <div ref={this.videoDiv} className="App-video" test2="123abcd" ></div>
      </div>
    );
  }

}

export default HelloPlayer;
