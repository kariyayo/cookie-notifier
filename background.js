var timerId = null;

function showNotification(obj) {
  if (window.webkitNotifications.checkPermission() == 0) {
    var icon = 'cookie.png';
    var title = "You have \"" + obj.my_cookies + "\" cookies.";
    var message = [];
    message.push("You can buy a \"" + obj.title + "\"!\n");
    message.push("price : " + obj.price + "\n");
    message.push("owned : " + obj.owned);
    var n = window.webkitNotifications.createNotification(icon, title, message.join(''));
    n.ondisplay = function() {
      var displayPeriod = localStorage["display_period_msec"];
      if (!displayPeriod) displayPeriod = 5000;
      setTimeout(function() { n.cancel(); }, displayPeriod);
    };
    n.show();
  } else {
    window.webkitNotifications.requestPermission();
  }
}

function check() {
  chrome.tabs.getAllInWindow(null, function(tabs){
    for(var i=0, l=tabs.length; i<l; i++){
      chrome.tabs.executeScript(tabs[i].id, { file: "cookie_notifier.js" });
    }
  });
}

function init(interval) {
  if (timerId) {
    clearInterval(timerId);
  }
  timerId = setInterval(check, interval);
}

chrome.extension.onRequest.addListener(function(request) {
  showNotification(request);
});
var intervalTime = localStorage["interval_msec"];
if (!intervalTime) intervalTime = 60000;
init(intervalTime);

