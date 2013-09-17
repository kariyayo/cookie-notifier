function showNotification(obj) {
  if (window.webkitNotifications.checkPermission() == 0) {
    var icon = 'http://orteil.dashnet.org/cookieclicker/img/perfectCookie.png';
    var title = "You have \"" + obj.my_cookies + "\" cookies.";
    var message = [];
    message.push("You can buy a time \"" + obj.title + "\"!\n");
    message.push("price : " + obj.price + "\n");
    message.push("owned : " + obj.owned);
    var n = window.webkitNotifications.createNotification(icon, title, message.join(''));
    n.ondisplay = function() {
      setTimeout(function() { n.cancel(); }, 5000);
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

chrome.extension.onRequest.addListener(function(request) {
  showNotification(request);
});

setInterval(check, 60000);

