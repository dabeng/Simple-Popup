
'use strict';

(function($){

  $(function() {

    $('#btn-alert').on('click', function () {
      /*
        alert('An exception occurred.');
        $('#response').text('The application has just got an exception.');
      */
      var alertBox = customAlert(0, 'An exception occurred.');
      $.when(alertBox).then(function() {
        $('#response').text('The application has just got an exception.');
      });
    });

    $('#btn-alert2').on('click', function () {
      var alertBox = customAlert(0, 'Another exception occurred.');
      $.when(alertBox).then(function() {
        $('#response').text('The application has just got another exception.');
      });
    });

    $('#btn-confirm').on('click', function () {
      /*
        var res = confirm('It\'s time to change. Do you agree with me?');
        if (res) {
          $('#response').text('Yes, let\'s go for it.');
        } else {
          $('#response').text('No, this is not the time.');
        }
      */
      var confirmBox = customAlert(1, 'It\'s time to change. Do you agree with me?');
      $.when(confirmBox).then(function(res) {
        if (res) {
          $('#response').text('Yes, let\'s go for it.');
        } else {
          $('#response').text('No, this is not the time.');
        }
      });
    });

    $('#btn-prompt').on('click', function () {
      /*
        var username=prompt('Please enter your username', 'Michael Jordan');
        if (username!=null && username!="") {
          $('#response').text(username + ', hey, welcome back.');
        }
      */
      var promptBox = customAlert(2, 'Please enter your username', 'Michael Jordan');
      $.when(promptBox).then(function(res) {
        if (res) {
          $('#response').text(res + ', hey, welcome back.');
        } else {
          $('#response').text('Anoymous user logs in.');
        }
      });
    });

  });

})(jQuery);