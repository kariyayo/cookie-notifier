function reflectOptions() {
  var inputInterval = document.getElementById("interval").value;
  var interval = parseInt(inputInterval) * 1000;
  localStorage["interval_msec"] = interval;

  var inputDisplayPeriod = document.getElementById("display_period").value;
  var displayPeriod = parseInt(inputDisplayPeriod) * 1000;
  localStorage["display_period_msec"] = displayPeriod;

  chrome.extension.getBackgroundPage().init(interval);
}

function restoreOptions() {
  var interval = localStorage["interval_msec"];
  if (interval) {
    var intervalInputElm = document.getElementById("interval");
    intervalInputElm.value = interval / 1000;
  }
  var displayPeriod = localStorage["display_period_msec"];
  if (displayPeriod) {
    var displayPeriodInputElm = document.getElementById("display_period");
    displayPeriodInputElm.value = displayPeriod / 1000;
  }
}

document.getElementById('save_button').addEventListener('click', reflectOptions, false);
window.addEventListener('load', restoreOptions, false);

