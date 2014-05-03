// Auto Wifi MMU login app
// Developed by Simeon Mugisha Rwegayura

chrome.app.runtime.addListener( function() {
  chrome.app.window.create('login.html', {
    'bounds': {
      'weight': 900,
      'height': 900,
    }
  });
});
