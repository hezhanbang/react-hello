import React, { Component } from 'react';
import HebPlayerPort from './hebPlayerLoader';
import './App.css';

class DemoPlayer extends Component {
  constructor(props) {
    super(props);
    this.gbID = React.createRef();
    this.muteBtn = React.createRef();
    this.talkbackBtn = React.createRef();
    this.videoDiv = React.createRef();
  }

  onPlay() {
    let ret = HebPlayerPort.playVideo2(this.gbID.current.value, this.videoDiv.current,  (type, a,b,c,d)=> {
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
    let ret = HebPlayerPort.stopVideo(this.gbID.current.value);
    console.log("stop return is %s", ret);
    if(false === HebPlayerPort.isErrorStr(ret)) {
      this.talkbackBtn.current.innerHTML = 'enable talkback';
      this.muteBtn.current.innerHTML = 'cancel muted';
    }
  }

  onMute() {
    if ('to muted' === this.muteBtn.current.innerHTML) {
      let ret = HebPlayerPort.setMuted(this.gbID.current.value, true);
      console.log("setMuted return is %s", ret);
   
      this.muteBtn.current.innerHTML = 'cancel muted';
    }else {
      let ret = HebPlayerPort.setMuted(this.gbID.current.value, false);
      console.log("setMuted return 2 is %s", ret);
    
      this.muteBtn.current.innerHTML = 'to muted';
    }
  }

  onTalkback() {
    if ('enable talkback' === this.talkbackBtn.current.innerHTML) {
      let ret = HebPlayerPort.setTalkback(this.gbID.current.value, true);
      console.log("setTalkback return is %s", ret);
   
      if(false === HebPlayerPort.isErrorStr(ret)) {
        this.muteBtn.current.innerHTML = 'to muted';
      }

      this.talkbackBtn.current.innerHTML = 'disable talkback';
    }else {
      let ret = HebPlayerPort.setTalkback(this.gbID.current.value, false);
      console.log("setTalkback return is %s", ret);
    
      this.talkbackBtn.current.innerHTML = 'enable talkback';
      this.muteBtn.current.innerHTML = 'cancel muted';
    }
  }

  render() {
    return (
      <div className="App-root">
        <input ref={this.gbID} className="App-gbID" type="text" defaultValue="3402000000132055000x" />
        <button type="button" onClick={this.onPlay.bind(this)} >play</button>
        <button type="button" onClick={this.onStop.bind(this)} >stop</button>
        <button ref={this.muteBtn} type="button" onClick={this.onMute.bind(this)} >cancel muted</button>
        <button ref={this.talkbackBtn} type="button" onClick={this.onTalkback.bind(this)} >enable talkback</button>
        <div ref={this.videoDiv} className="App-video" test2="123abcd" ></div>
      </div>
    );
  }

}

export default DemoPlayer;
