// this function handles the submission of the form



document.forms[0].onsubmit = function AJAXSubmit(event) {
  
  event.preventDefault();
  var form = event.target;
  var formDataString = "username="+form.username.value+"&"+"password="+form.password.value;
  formDataString+="&buttonClicked=4&err_flag=0&err_msg=&info_flag=0&info_msg=";
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action, true);

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  // save username and password
  save();

  // spin show spin dialog
  spin('on');

  xhr.onload = function() {
    var infoFlag = (typeof(this.responseXML.forms[0].info_flag) == "undefined") ?
      -1 : this.responseXML.forms[0].info_flag.value;
    // -1 for the case when login is successful... I know, I have to change it all yeah!
    var infoMsg  = this.responseXML.forms[0].info_msg.value;
    var errFlag  = this.responseXML.forms[0].err_flag.value;
    var errMsg   = this.responseXML.forms[0].err_msg.value;
    console.log(infoFlag);
    console.log(infoMsg);
    console.log(errMsg);
    console.log(errFlag);
    // Already logged in
    if (infoFlag==1)
      notify("success", "You are already logged in!");
    // Incorrect Username or Password
    if (errFlag==1)
      notify("fail", "Incorrect username or password");

    // Logged in
    // save the successfull username and password
    if (infoFlag==-1) {
      // save the username and password in an encrypted file
      var storage = document.getElementById('storage');
      if (storage == 'no data saved') {
	save();
      }
    }
  }

  xhr.responseType = "document";
  xhr.send(encodeURI(formDataString));

}

document.getElementById("username").onfocus = clearNotifications;
document.getElementById("password").onfocus = clearNotifications;



function notify(type, message) {

  clearNotifications();
  var notification = document.getElementById("notification");
  var msg = document.createTextNode(message);
  notification.appendChild(msg);
  var style = { "fail": "red", "success": "green" };
  notification.style.color = style[type];
  return notification;

}



function onFocus(){
  clearNotifications();
}



function clearNotifications() {

  var node = document.getElementById("notification");
  while (node.childNodes.length > 0){
    node.removeChild(node.firstChild);
  }
  console.log('onfocus');

}



function save() {
  console.log("save");
  var cred = {
    'u' : document.getElementById("username").value,
    'p' : document.getElementById("password").value
  };

  chrome.storage.local.set({'cred': cred}), function() {
    console.log('saved');
  }
}




function spin(s) {
  // turn on the spin
  if (s=='on'){
    var opts = {
      lines: 5, // The number of lines to draw
      length: 6, // The length of each line
      width: 5, // The line thickness
      radius: 0, // The radius of the inner circle
      corners: 0, // Corner roundness (0..1)
      rotate: 50, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1.7, // Rounds per second
      trail: 56, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: true, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '', // Top position relative to parent
      left: '50%' // Left position relative to parent
    };
    var target = document.getElementById('notification');
    var spinner = new Spinner(opts).spin(target);
    console.log('spin');
  }
}
