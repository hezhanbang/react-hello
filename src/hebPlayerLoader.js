
class HebPlayerPort {

  static init(streamMediaJsPath) {
    //alert(streamMediaJsPath);
    let script = document.createElement('script');
    script.charset = 'UTF-8';
    script.onerror = HebPlayerPort.on_error;
    script.onload = HebPlayerPort.on_load;
    script.src = streamMediaJsPath + '?_r=' + Math.random();
    document.head.appendChild(script);
  }

  static on_error() {
    console.log('>>>>>>>>>>> fail to load hebPlayer');
    //alert('>>>>>>>>>>> fail to load hebPlayer');
  }

  static on_load(){
    var ret = window.hebPlayer.init(HebPlayerPort.playerNotify);
		if (window.hebPlayer.isFailStr(ret)) {
			console.log('>>>>>>>>>>> fail to init hebPlayer : ' + ret);
			//alert('fail to init hebPlayer : ' + ret);
			return;
    }
    console.log('!!! done to initialize hebPlayer !!!');
  }

  static playerNotify(token, taskID, containerID, result, detail) {
    console.log('hebPlayer notify: ' + token + ' ' + taskID + ' ' + containerID + ' ' + result + ' ' + detail);
  }

  static playVideo(divID, gbID, callback) {

  }

  static stopVideo(gbID) {

  }
}

export default HebPlayerPort;
