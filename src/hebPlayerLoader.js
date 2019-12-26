
class HebPlayerPort {

  //网页生命周期内，只需要初始化一次。
  static init(streamMediaJsPath) {
    //alert(streamMediaJsPath);
    HebPlayerPort.corePlayer = null;

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
    var ret = window.hebPlayer.init(HebPlayerPort.playerNotify);
		if (window.hebPlayer.isFailStr(ret)) {
			console.error('>>>>>>>>>>> fail to init hebPlayer : ' + ret);
			//alert('fail to init hebPlayer : ' + ret);
			return;
    }

    HebPlayerPort.corePlayer = window.hebPlayer;
    console.log('!!! done to initialize hebPlayer !!!');
  }

  static isInited() {
    return HebPlayerPort.corePlayer != null;
  }

  static playerNotify(token, taskID, containerID, result, detail) {
    console.log('hebPlayer notify: ' + token + ' ' + taskID + ' ' + containerID + ' ' + result + ' ' + detail);
  }

  static playVideo(divID, gbID, callback) {
    if(null === HebPlayerPort.corePlayer || undefined === HebPlayerPort.corePlayer) {
      console.error('hebPlayer Not initialized yet!');
    }

    HebPlayerPort.corePlayer.play(divID, gbID, callback);
  }

  static stopVideo(gbID) {
    if(null === HebPlayerPort.corePlayer || undefined === HebPlayerPort.corePlayer) {
      console.error('hebPlayer Not initialized yet!');
    }

    HebPlayerPort.corePlayer.stop(gbID);
  }

}

export default HebPlayerPort;
