// this function handles the submission of the form

document.forms[0].onsubmit = function AJAXSubmit(event) {
  
  event.preventDefault();
  var form = event.target;
  var formDataString = "username="+form.username.value+"&"+"password="+form.password.value;
  formDataString+="&buttonClicked=4&err_flag=0&err_msg=&info_flag=0&info_msg=";
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action, true);

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function() {
    var infoFlag = (this.responseXML.forms[0].info_flag == "undefined") ?
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
    if (infoFlag==-1 && errFlag==0) {
      notify("success", "You are now logged in!");
      
      // save the username and password in an encrypted file
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
  if (node.childNodes[0]){
    node.removeChild(node.childNodes[0]);
  }
  console.log('onfocus');
}

