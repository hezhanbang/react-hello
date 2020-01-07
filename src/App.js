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
    let ret = HebPlayerPort.playVideo2(this.curruntID, this.videoDiv.current,  (type, a,b,c,d)=> {
      if ("resolution" === type) {
        console.log("resolution is %s", a);
      }else if('dynamicInfo' === type) {
        console.log("dynamicInfo is %skbps, received:%s, lost:%s %sfps", a, b, c, d);
      }else if("offline" === type) {
        console.log("device is offline");
      }else if("playing" === type) {
        console.log("video now is playing");
      }else if("stopped" === type) {
        console.log("video now is stopped");
      }else if("broken" === type) {
        console.log("video now is broken, it will reconnect again soon");
      }
    });

    console.log("play return is %s", ret);
  }

  onStop() {
    let ret = HebPlayerPort.stopVideo(this.curruntID);
    console.log("stop return is %s", ret);
  }

  onMute() {
    if ('to muted' === this.muteBtn.current.innerHTML) {
      let ret = HebPlayerPort.setMuted(this.curruntID, true);
      console.log("stop return is %s", ret);
   
      this.muteBtn.current.innerHTML = 'cancel muted';
    }else {
      let ret = HebPlayerPort.setMuted(this.curruntID, false);
      console.log("stop return is %s", ret);
    
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
