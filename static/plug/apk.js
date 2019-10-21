let backnum = 1
document.addEventListener('plusready',function(){
  if (window.plus) {
    plus.key.addEventListener("backbutton", function (e) {
      if (/(index)|(login)|(welcome)$/.test(window.location.hash)) {
        if(backnum < 2){
          backnum++
          plus.nativeUI.toast('再按一次返回退出应用！')
          let timer = setTimeout(() => {
            backnum = 1
            clearTimeout(timer)
          }, 500)
          return false
        } else {
          var _self = plus.webview.currentWebview()
          _self.close()
        }
      } else {
        window.history.back()
      }
    }, false)
  }
})
