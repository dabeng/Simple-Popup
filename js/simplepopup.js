
'use strict';

(function(){

  window.simplePopup = function(type, message, defaultText) {
    var promise = new Promise(function(resolve, reject) {
      var appendSimplePopup = function() {
        document.body.insertAdjacentHTML('beforeend',
          '<div id="popup-overlay">' +
            '<div class="simple-popup">' +
              '<span class="popup-icon"></span>' +
              '<p class="popup-message"></p>' +
              '<div class="popup-buttons"></div>' +
            '</div>' +
          '</div>');
      };
      var cleanupSimplePopup = function() {
        var overlay = document.querySelector('#popup-overlay');
        var btns = overlay.querySelector('.popup-buttons');
        while (btns.firstChild) {
          btns.removeChild(btns.firstChild);
        }
        var input = overlay.querySelector('.popup-input');
        if (input) {
          input.parentNode.removeChild(input);
        }
      };
      var appendPopupInput = function() {
        document.querySelector('#popup-overlay').querySelector('.popup-message')
          .insertAdjacentHTML('afterend', '<input type="text" class="popup-input"/>');
      };
      var appendPopupButtons = function(type) {
        var popupButtons = document.querySelector('#popup-overlay').querySelector('.popup-buttons');
        if (type === 0) {
          popupButtons.insertAdjacentHTML('beforeend', '<button type="button" class="btn-ok">OK</button>');
        } else {
          popupButtons.insertAdjacentHTML('beforeend', '<button type="button" class="btn-ok">OK</button>' +
            '<button type="button" class="btn-cancel">Cancel</button>');
        }
      };
      var appendDisableScrollbar = function() {
        var body = document.body;
        if (body.scrollHeight > window.screen.availHeight) {
          var topOffset = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
          body.classList.add('disable-scrollbar');
          body.style.top = -topOffset + 'px';
          body.dataset.scrolltop = topOffset;
        }
      };
      var recoverOriginalScrollbar = function() {
        var body = document.body;
        if (body.dataset.scrolltop) {
          body.classList.remove('disable-scrollbar');
          body.style.top = '';
          // if (body.scrollTop) {
            body.scrollTop = body.dataset.scrolltop;
            document.documentElement.scrollTop = body.dataset.scrolltop;
          // } else {
            // document.documentElement.scrollTop = body.dataset.scrolltop;
          // }
          body.dataset.scrolltop = '';
        }
      };
      var bindButtonHandler = function(type) {
        var overlay = document.querySelector('#popup-overlay');
        var btns = overlay.querySelector('.popup-buttons');
        if (type === 0) {
          btns.querySelector('.btn-ok').addEventListener('click', function() {
            recoverOriginalScrollbar();
            overlay.classList.remove('show-popup');
            resolve();
          }, false);
        } else if (type === 1) {
          btns.querySelector('.btn-ok').addEventListener('click', function() {
            recoverOriginalScrollbar();
            overlay.classList.remove('show-popup');
            resolve(true);
          }, false);
          btns.querySelector('.btn-cancel').addEventListener('click', function() {
            recoverOriginalScrollbar();
            overlay.classList.remove('show-popup');
            resolve(false);
          }, false);
        } else {
          overlay.querySelector('.popup-input').addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
              recoverOriginalScrollbar();
              var value = event.target.value.trim();
              overlay.classList.remove('show-popup');
              overlay.querySelector('.popup-input').value = defaultText;
              resolve(value);
            }
          });
          btns.querySelector('.btn-ok').addEventListener('click', function() {
            recoverOriginalScrollbar();
            var value = overlay.querySelector('.popup-input').value.trim();
            overlay.classList.remove('show-popup');
            overlay.querySelector('.popup-input').value = defaultText;
            resolve(value);
          }, false);
          btns.querySelector('.btn-cancel').addEventListener('click', function() {
            recoverOriginalScrollbar();
            overlay.classList.remove('show-popup');
            overlay.querySelector('.popup-input').value = defaultText;
            resolve('');
          }, false);
        }
      };

      // With the help of the following function, we enfore browser to repaint in order to
      // fire up the first time transition of alert icon.
      var startIconTransition = function() {
        var overlay = document.querySelector('#popup-overlay');
        overlay.style.offsetWidth = overlay.offsetWidth;
        overlay.classList.add('show-popup');
      };

      var overlay = null;
      if (type === 0) { // alert box
        if (!document.querySelector('.simple-popup')) {
          appendSimplePopup();
          appendPopupButtons(0);
          bindButtonHandler(0);
          startIconTransition();
        } else {
          cleanupSimplePopup();
          appendPopupButtons(0);
          bindButtonHandler(0);
        }
        overlay = document.querySelector('#popup-overlay');
        overlay.querySelector('.simple-popup').setAttribute('class', 'simple-popup alert-box');
        overlay.querySelector('.popup-icon').textContent = '!';
      } else if (type === 1) { // confirm box
        if (!document.querySelector('.simple-popup')) {
          appendSimplePopup();
          appendPopupButtons(1);
          bindButtonHandler(1);
          startIconTransition();
        } else {
          cleanupSimplePopup();
          appendPopupButtons(1);
          bindButtonHandler(1);
        }
        overlay = document.querySelector('#popup-overlay');
        overlay.querySelector('.simple-popup').setAttribute('class', 'simple-popup confirm-box');
        overlay.querySelector('.popup-icon').textContent = '?';
      } else { // prompt box
        if (!document.querySelector('.simple-popup')) {
          appendSimplePopup();
          appendPopupInput();
          appendPopupButtons(2);
          bindButtonHandler(2);
          startIconTransition();
        } else {
          cleanupSimplePopup();
          appendPopupInput();
          appendPopupButtons(2);
          bindButtonHandler(2);
        }
        overlay = document.querySelector('#popup-overlay');
        overlay.querySelector('.simple-popup').setAttribute('class', 'simple-popup prompt-box');
        overlay.querySelector('.popup-icon').textContent = ':)';
        overlay.querySelector('.popup-input').value = defaultText;
        overlay.querySelector('.popup-input').select();
      }
      appendDisableScrollbar();
      overlay.classList.add('show-popup');
      overlay.querySelector('.popup-message').textContent = message;
    });

    return promise;
  };

})();