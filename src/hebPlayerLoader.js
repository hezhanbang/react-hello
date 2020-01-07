
class HebPlayerPort {

  //网页生命周期内，只需要初始化一次。
  static init(streamMediaJsUrl, noCache) {
    if (false === HebPlayerPort.isNull(HebPlayerPort.corePlayer)) {
      return 0;
    }

    if (!HebPlayerPort.isNull(window.hebPlayer)){
      let temp = HebPlayerPort.getScriptFileUrl();
      HebPlayerPort.setApiUrl(temp);
      HebPlayerPort.on_load();
      return 0;
    }

    if (HebPlayerPort.isNull(streamMediaJsUrl) || '' === streamMediaJsUrl) {
      streamMediaJsUrl = 'http://172.21.4.114:9004/player/hebPlayer.safe.js';
    }
    if (streamMediaJsUrl.length < 11) {
      return -3;
    }
    HebPlayerPort.setApiUrl(streamMediaJsUrl);
    //alert(streamMediaJsUrl);

    let suffix = '';
    if (!HebPlayerPort.isNull(noCache) && true === noCache) {
      suffix = '?_r=' + Math.random();
    }

    let script = document.createElement('script');
    script.charset = 'UTF-8';
    script.onerror = HebPlayerPort.on_error;
    script.onload = HebPlayerPort.on_load;
    script.src = streamMediaJsUrl + suffix;
    document.head.appendChild(script);
    HebPlayerPort.script = script;
  
    return 0;
  }

  static on_error() {
    document.head.removeChild(HebPlayerPort.script);
    HebPlayerPort.script = null;

    console.error('>>>>>>>>>>> fail to load hebPlayer');
    //alert('>>>>>>>>>>> fail to load hebPlayer');
  }

  static on_load(){
    let ret = window.hebPlayer.init(HebPlayerPort.streamMediaApiUrl, HebPlayerPort.playerNotify);
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
      return '[fail] hebPlayer Not initialized yet!';
    }
    if(!HebPlayerPort.isGbID(gbID)) {
      return "[fail] 非法的gb28181设备编号";
    }

    return HebPlayerPort.corePlayer.play(gbID, divID, callback);
  }

  static playVideo2(gbID, divObj, callback) {
    if(!HebPlayerPort.isInited()) {
      return '[fail] hebPlayer Not initialized yet!';
    }

    if (HebPlayerPort.isNull(divObj.id) || divObj.id.length <= 0) {
      divObj.id = 'hebP_' + HebPlayerPort.nextDivID;
      HebPlayerPort.nextDivID++;
    }
    return HebPlayerPort.playVideo(gbID, divObj.id, callback);
  }

  static stopVideo(gbID) {
    if(!HebPlayerPort.isInited()) {
      return '[fail] hebPlayer Not initialized yet!';
    }
    if(!HebPlayerPort.isGbID(gbID)) {
      return "[fail] 非法的gb28181设备编号";
    }

    return HebPlayerPort.corePlayer.stop(gbID);
  }

  static setMuted(gbID, isTrue) {
    if(!HebPlayerPort.isInited()) {
      return '[fail] hebPlayer Not initialized yet!';
    }
    if(!HebPlayerPort.isGbID(gbID)) {
      return "[fail] 非法的gb28181设备编号";
    }

    return HebPlayerPort.corePlayer.setMuted(gbID, isTrue);
  }

  static getScriptFileUrl() {
    let sc = document.getElementsByTagName("script");
    let idx = 0;
    for (; idx < sc.length; idx++) {
      let s = sc.item(idx);
      if (s.src && s.src.match(/hebPlayer\.js$/)) {
        return s.src; 
      }
      if (s.src && s.src.match(/hebPlayer\.min\.js$/)) {
        return s.src; 
      }
      if (s.src && s.src.match(/hebPlayer\.safe\.js$/)) {
        return s.src; 
      }
    }
    return '';
  }

  static setApiUrl(scriptUrl) {
    let tmp = scriptUrl.substr(8);
    let end = tmp.indexOf('/');
    if (end < 0) {
      return;
    }
    HebPlayerPort.streamMediaApiUrl = scriptUrl.substr(0,8) + tmp.substr(0, end + 1) + 'api';
  }

  static isNull(obj) {
    return null === obj || undefined === obj;
  }

  static isGbID(gbID) {
    if (typeof gbID !== 'string' || gbID.length !== 20) {
        return false;
    }
    for (let i = 0; i < gbID.length; i++) {
        if (gbID[i] < '0' || gbID[i] > '9') {
            return false;
        }
    }
    return true;
}

}

export default HebPlayerPort;
