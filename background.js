// Auto Wifi MMU login app
// Developed by Simeon Mugisha Rwegayura

chrome.app.runtime.onLaunched.addListener( function() {
  chrome.app.window.create('login.html', {
    'bounds': {
      'width': 300,
      'height': 300
    }
  });
});
