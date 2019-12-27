
class HebPlayerPort {

  //网页生命周期内，只需要初始化一次。
  static init(streamMediaJsPath, noCache) {
    if (false === HebPlayerPort.isNull(HebPlayerPort.corePlayer)) {
      return;
    }

    if (!HebPlayerPort.isNull(window.hebPlayer)){
      HebPlayerPort.on_load();
      return
    }

    if (HebPlayerPort.isNull(streamMediaJsPath)) {
      streamMediaJsPath = 'http://172.21.4.114:9004/player/hebPlayer.safe.js';
    }
    //alert(streamMediaJsPath);
    let suffix = '';
    if (!HebPlayerPort.isNull(noCache) && true === noCache) {
      suffix = '?_r=' + Math.random();
    }

    let script = document.createElement('script');
    script.charset = 'UTF-8';
    script.onerror = HebPlayerPort.on_error;
    script.onload = HebPlayerPort.on_load;
    script.src = streamMediaJsPath + suffix;
    document.head.appendChild(script);
    HebPlayerPort.script = script;
  }

  static on_error() {
    document.head.removeChild(HebPlayerPort.script);
    HebPlayerPort.script = null;

    console.error('>>>>>>>>>>> fail to load hebPlayer');
    //alert('>>>>>>>>>>> fail to load hebPlayer');
  }

  static on_load(){
    let ret = window.hebPlayer.init(HebPlayerPort.playerNotify);
    if (window.hebPlayer.isFailStr(ret)) {
      document.head.removeChild(HebPlayerPort.script);
      HebPlayerPort.script = null;

      console.error('>>>>>>>>>>> fail to init hebPlayer : ' + ret);
      //alert('fail to init hebPlayer : ' + ret);
      return;
    }

    HebPlayerPort.nextDivID = 0;
    HebPlayerPort.corePlayer = window.hebPlayer;
    console.log('!!! done to initialize hebPlayer !!!');
  }

  static isInited() {
    return !HebPlayerPort.isNull(HebPlayerPort.corePlayer);
  }

  static playerNotify(token, taskID, containerID, result, detail) {
    console.log('hebPlayer notify: ' + token + ' ' + taskID + ' ' + containerID + ' ' + result + ' ' + detail);
  }

  static playVideo(gbID, divID, callback) {
    if(!HebPlayerPort.isInited()) {
      console.error('hebPlayer Not initialized yet!');
    }

    HebPlayerPort.corePlayer.play(divID, gbID, callback);
    console.log('done to do heb playVideo [' + gbID + ']');
  }

  static playVideo2(gbID, divObj, callback) {
    if(!HebPlayerPort.isInited()) {
      console.error('hebPlayer Not initialized yet!');
    }

    divObj.id = 'hebP_' + HebPlayerPort.nextDivID;
    HebPlayerPort.nextDivID++;
    HebPlayerPort.playVideo(gbID, divObj.id, callback);
    console.log('done to do heb playVideo2');
  }

  static stopVideo(gbID) {
    if(!HebPlayerPort.isInited()) {
      console.error('hebPlayer Not initialized yet!');
    }

    HebPlayerPort.corePlayer.stop(gbID);
    console.log('done to do heb stopVideo [' + gbID + ']');
  }

  static isNull(obj) {
    return null === obj || undefined === obj;
  }
}

export default HebPlayerPort;
