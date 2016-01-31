
'use strict';

(function($){

  $(function() {

    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });  

    $('#btn-alert').on('click', function (event) {
      /*
        alert('An exception occurred.');
        event.target.nextElementSibling.textContent = 'The application has just got an exception.';
      */
      var alertBox = simplePopup(0, 'An exception occurred.');
      $.when(alertBox).then(function() {
        $(event.target).next().text('The application has just got an exception.');
      });
    });

    $('#btn-confirm').on('click', function (event) {
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
          $(event.target).next().text('Yes, let\'s go for it.');
        } else {
          $(event.target).next().text('No, this is not the time.');
        }
      });
    });

    $('#btn-prompt').on('click', function (event) {
      /*
        var username=prompt('Please enter your username', 'Michael Jordan');
        if (username != null && username != '') {
          event.target.nextElementSibling.textContent = username + ', hey, welcome back.';
        }
      */
      var promptBox = simplePopup(2, 'Please enter your username', 'Michael Jordan');
      $.when(promptBox).then(function(res) {
        if (res) {
          $(event.target).next('.response').text(res + ', hey, welcome back.');
        } else {
          $(event.target).next('.response').text('Anoymous user logs in.');
        }
      });
    });

  });

})(jQuery);