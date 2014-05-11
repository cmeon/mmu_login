// autocomplete.js
// loads the username and password from the storage
// into the form adds

document.body.onload = function autocomplete() {
  console.log("loaded form");

  // Check if the user has already stored the username and password
  chrome.storage.local.get('cred', function(items) {
    if (items.cred) {
      document.getElementById("username").value = items.cred.u;
      document.getElementById("password").value = items.cred.p;
      console.log(items.cred);
      autologin();
    } else {
      console.log('nothing');
      document.getElementById("storage").value = "no data saved";
    }
  });
}

function autologin() {
  // submit event
  var event = new Event('submit');
  var form  = document.forms[0];
  form.dispatchEvent(event);
}
