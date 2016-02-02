# Simple Popup
Hope this small jquery snippet to help you replace all primitive popup boxes of native javascript including alert box, confirm box, prompt box.

## Demo
- **[jQuery version](http://dabeng.github.io/Simple-Popup/jq-version.html)**
- **[navtive JS version](http://dabeng.github.io/Simple-Popup/js-version.html)**

![screen record](http://dabeng.github.io/Simple-Popup/screen-record.gif)

## Usage
- **jQuery version**
  1. Firstly, introduce jQuery(1.5+) into your page.
  2. Then, introduce assets(js + css) of Simple Popup into your page.
  3. Finally, replace any alert(), confirm() and prompt() method in page with simplePopup() method on page.

- **native javascript version**
  1. First, introduce assets(js + css, obviously, both of the two version use the same css file) of Simple Popup into your page.
  2. Then, replace any alert(), confirm() and prompt() method in page with simplePopup() 


### built-in alert box
```javascript
alert('An exception occurred.');
event.target.nextElementSibling.textContent = 'The application has just got an exception.';
```
### Simple Popup alternative of jquery version
```javascript
var alertBox = simplePopup(0, 'An exception occurred.');
$.when(alertBox).then(function() {
  $(event.target).next().text('The application has just got an exception.');
});
```
### Simple Popup alternative of javascript version
```javascript
simplePopup(0, 'An exception occurred.').then(function() {
  event.target.nextElementSibling.textContent = 'The application has just got an exception.';
});
```

### built-in prompt box
```javascript
var res = confirm('It\'s time to change. Do you agree with me?');
if (res) {
  event.target.nextElementSibling.textContent = 'Yes, let\'s go for it.';
} else {
  event.target.nextElementSibling.textContent = 'No, this is not the time.';
}
```
### Simple Popup alternative of jquery version
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
### Simple Popup alternative of javascript version
```javascript
simplePopup(1, 'It\'s time to change. Do you agree with me?').then(function(res) {
  if (res) {
    event.target.nextElementSibling.textContent = 'Yes, let\'s go for it.';
  } else {
    event.target.nextElementSibling.textContent = 'No, this is not the time.';
  }
});
```

### built-in prompt box
```javascript
var username = prompt('Please enter your username', 'Michael Jordan');
if (username != null && username != '') {
  event.target.nextElementSibling.textContent = username + ', hey, welcome back.';
}
```
### Simple Popup alternative of jquery version
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
### Simple Popup alternative of javascript version
```javascript
simplePopup(2, 'Please enter your username', 'Michael Jordan').then(function(res) {
  if (res) {
    event.target.nextElementSibling.textContent = res + ', hey, welcome back.';
  } else {
    event.target.nextElementSibling.textContent = 'Anoymous user logs in.';
  }
});
```
## killer Feature
1. When you toggle the popup boxes with simpelPopup() method, the overlayed background keeps its position just where it was.
2. As you can see above, this plugin help you rewrite the current code With the least code modifications.

## Browser Support
**1. Simple Popup of jquery version**
  - Chrome 8.0+
  - Firefox 3.6+
  - Safari 3.1.2+
  - Opera 9.64+

**2. Simple Popup of javascript version**
  - Chrome 32.0+
  - Firefox 29.0+
  - Safari 7.1+
  - Opera 19+
