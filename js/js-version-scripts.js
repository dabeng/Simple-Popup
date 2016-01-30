
'use strict';

(function(){

  document.addEventListener('DOMContentLoaded', function() {
    var blocks = document.querySelectorAll('code');
    var index = 0;
    for( index = 0; index < blocks.length; index++ ) {
       hljs.highlightBlock(blocks[index]);
    }

    document.querySelector('#btn-alert').addEventListener('click', function (event) {
      /*
        alert('An exception occurred.');
        event.target.nextElementSibling.textContent = 'The application has just got an exception.';
      */
      simplePopup(0, 'An exception occurred.').then(function() {
        event.target.nextElementSibling.textContent = 'The application has just got an exception.';
      });
    }, false);

    document.querySelector('#btn-confirm').addEventListener('click', function (event) {
      /*
        var res = confirm('It\'s time to change. Do you agree with me?');
        if (res) {
          event.target.nextElementSibling.textContent = 'Yes, let\'s go for it.';
        } else {
          event.target.nextElementSibling.textContent = 'No, this is not the time.';
        }
      */
      simplePopup(1, 'It\'s time to change. Do you agree with me?').then(function(res) {
        if (res) {
          event.target.nextElementSibling.textContent = 'Yes, let\'s go for it.';
        } else {
          event.target.nextElementSibling.textContent = 'No, this is not the time.';
        }
      });
    }, false);

    document.querySelector('#btn-prompt').addEventListener('click', function (event) {
      /*
        var username=prompt('Please enter your username', 'Michael Jordan');
        if (username != null && username != '') {
          event.target.nextElementSibling.textContent = username + ', hey, welcome back.';
        }
      */
      simplePopup(2, 'Please enter your username', 'Michael Jordan').then(function(res) {
        if (res) {
          event.target.nextElementSibling.textContent = res + ', hey, welcome back.';
        } else {
          event.target.nextElementSibling.textContent = 'Anoymous user logs in.';
        }
      });
    });

  }, false);

})();