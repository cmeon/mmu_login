// Auto Wifi MMU login app
// Developed by Simeon Mugisha Rwegayura

chrome.app.runtime.onLaunched.addListener( function() {

  var width = 300;
  var height = 300;

  chrome.app.window.create('login.html', {
    'bounds': {
      width: width,
      height: height,
      left: Math.round((screen.availWidth-width)/2),
      top: Math.round((screen.availHeight-height)/2)
    }
  });
});
