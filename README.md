# Simple Popup
Hope this small jquery snippet to help you replace all primitive popup boxes of native javascript including alert box, confirm box, prompt box.

## [Demo](http://dabeng.github.io/Simple-Popup/)
![screen record](http://dabeng.github.io/Simple-Popup/screen-record.gif)

## Usage

1. Firstly, introduce jQuery(1.5+) into your page.
2. Then, introduce assets(js + css) of Simple Popup into your page.
3. Finally, replace any alert, confirm and prompt method in page with simplePopup method in page.

### Alert box of native js
```javascript
alert('An exception occurred.');
event.target.nextElementSibling.textContent = 'The application has just got an exception.';
```
### Simple Popup alternative
```javascript
var alertBox = simplePopup(0, 'An exception occurred.');
$.when(alertBox).then(function() {
  $(event.target).next().text('The application has just got an exception.');
});
```
### Prompt box of native js
```javascript
var res = confirm('It\'s time to change. Do you agree with me?');
if (res) {
  event.target.nextElementSibling.textContent = 'Yes, let\'s go for it.';
} else {
  event.target.nextElementSibling.textContent = 'No, this is not the time.';
}
```
### Simple Popup alternative
```javascript
var confirmBox = simplePopup(1, 'It\'s time to change. Do you agree with me?');
$.when(confirmBox).then(function(res) {
  if (res) {
    $(event.target).next().text('Yes, let\'s go for it.');
  } else {
    $(event.target).next().text('No, this is not the time.');
  }
});
```
### Prompt box of native js
```javascript
var username = prompt('Please enter your username', 'Michael Jordan');
if (username != null && username != '') {
  event.target.nextElementSibling.textContent = username + ', hey, welcome back.';
}
```
### Simple Popup alternative
```javascript
var promptBox = simplePopup(2, 'Please enter your username', 'Michael Jordan');
$.when(promptBox).then(function(res) {
  if (res) {
    $(event.target).next().text(res + ', hey, welcome back.');
  } else {
    $(event.target).next().text('Anoymous user logs in.');
  }
});
```
