import React, { Component } from 'react';
import HebPlayerPort from './hebPlayerLoader';
import './App.css';

class DemoPlayer extends Component {
  constructor(props) {
    super(props);
    this.curruntID = '';
    this.gbID = React.createRef();
    this.muteBtn = React.createRef();
    this.videoDiv = React.createRef();
  }

  onPlay() {
    this.curruntID = this.gbID.current.value;
    HebPlayerPort.playVideo2(this.curruntID, this.videoDiv.current,  (type, a,b,c,d)=> {
      if ("resolution" === type) {
        console.log("resolution is %s", a);
      }else if('dynamicInfo' === type) {
        console.log("dynamicInfo is %skbps, received:%s, lost:%s %sfps", a, b, c, d);
      }
    });
  }

  onStop() {
    HebPlayerPort.stopVideo(this.curruntID);
  }

  onMute() {
    if ('to muted' === this.muteBtn.current.innerHTML) {
      HebPlayerPort.setMuted(this.curruntID, true);
      this.muteBtn.current.innerHTML = 'cancel muted';
    }else {
      HebPlayerPort.setMuted(this.curruntID, false);
      this.muteBtn.current.innerHTML = 'to muted';
    }
  }

  render() {
    return (
      <div className="App-root">
        <input ref={this.gbID} className="App-gbID" type="text" defaultValue="3402000000132055000x" />
        <button type="button" onClick={this.onPlay.bind(this)} >play</button>
        <button type="button" onClick={this.onStop.bind(this)} >stop</button>
        <button ref={this.muteBtn} type="button" onClick={this.onMute.bind(this)} >to mute</button>
        <div ref={this.videoDiv} className="App-video" test2="123abcd" ></div>
      </div>
    );
  }

}

export default DemoPlayer;
