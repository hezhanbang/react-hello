
class HebPlayerPort {

  //网页生命周期内，只需要初始化一次。
  static init(streamMediaJsPath) {
    if (false === HebPlayerPort.isNull(HebPlayerPort.corePlayer)) {
      return;
    }

    if (HebPlayerPort.isNull(streamMediaJsPath)) {
      streamMediaJsPath = 'http://172.21.4.114:9004/player/hebPlayer.safe.js';
    }
    //alert(streamMediaJsPath);

    let script = document.createElement('script');
    script.charset = 'UTF-8';
    script.onerror = HebPlayerPort.on_error;
    script.onload = HebPlayerPort.on_load;
    script.src = streamMediaJsPath + '?_r=' + Math.random();
    document.head.appendChild(script);
  }

  static on_error() {
    console.error('>>>>>>>>>>> fail to load hebPlayer');
    //alert('>>>>>>>>>>> fail to load hebPlayer');
  }

  static on_load(){
    let ret = window.hebPlayer.init(HebPlayerPort.playerNotify);
    if (window.hebPlayer.isFailStr(ret)) {
      console.error('>>>>>>>>>>> fail to init hebPlayer : ' + ret);
      //alert('fail to init hebPlayer : ' + ret);
      return;
    }

    HebPlayerPort.corePlayer = window.hebPlayer;
    console.log('!!! done to initialize hebPlayer !!!');
  }

  static isInited() {
    return !HebPlayerPort.isNull(HebPlayerPort.corePlayer);
  }

  static playerNotify(token, taskID, containerID, result, detail) {
    console.log('hebPlayer notify: ' + token + ' ' + taskID + ' ' + containerID + ' ' + result + ' ' + detail);
  }

  static playVideo(divID, gbID, callback) {
    if(HebPlayerPort.isInited()) {
      console.error('hebPlayer Not initialized yet!');
    }

    HebPlayerPort.corePlayer.play(divID, gbID, callback);
  }

  static stopVideo(gbID) {
    if(HebPlayerPort.isInited()) {
      console.error('hebPlayer Not initialized yet!');
    }

    HebPlayerPort.corePlayer.stop(gbID);
  }

  static isNull(obj) {
    return null === obj || undefined === obj;
  }
}

export default HebPlayerPort;
