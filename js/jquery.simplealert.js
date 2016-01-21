
'use strict';

(function($){

  window.customAlert = function(type, message, defaultText) {
    var dtd = $.Deferred();
    var appendCustomAlert = function() {
      $('body').append(
        '<div id="alert-overlay">' +
          '<div class="custom-alert">' +
            '<span class="alert-icon"></span>' +
            '<p class="alert-message"></p>' +
            '<div class="alert-buttons"></div>' +
          '</div>' +
        '</div>');
    };
    var cleanupCustomAlert = function() {
      $('#alert-overlay').find('.alert-buttons').children().remove()
        .end().siblings('.alert-input').remove();
    };
    var appendAlertInput = function() {
      $('#alert-overlay').find('.alert-message')
        .after('<input type="text" class="alert-input"/>');
    };
    var appendAlertButtons = function(type) {
      var alertButtons = $('#alert-overlay').find('.alert-buttons');
      if (type === 0) {
        alertButtons.append('<button type="button" class="btn-ok">OK</button>');
      } else {
        alertButtons.append('<button type="button" class="btn-ok">OK</button>' +
          '<button type="button" class="btn-cancel">Cancel</button>');
      }
    };
    var bindButtonHandler = function(type) {
      var overlay = $('#alert-overlay');
      var btns = overlay.find('.alert-buttons').children();
      if (type === 0) {
        btns.on('click', function() {
          overlay.removeClass('show-alert')
            .find('.custom-alert').data('dtd').resolve();
        });
      } else if (type === 1) {
        btns.filter('.btn-ok').on('click', function() {
          overlay.removeClass('show-alert')
            .find('.custom-alert').data('dtd').resolve(true);
        })
        .siblings('.btn-cancel').on('click', function() {
          overlay.removeClass('show-alert')
            .find('.custom-alert').data('dtd').resolve(false);
        });
      } else {
        overlay.find('.alert-input').on('keyup', function(event) {
          if (event.which === 13) {
            var value = event.target.value.trim();
            overlay.removeClass('show-alert')
              .find('.alert-input').val(defaultText)
              .parent().data('dtd').resolve(value);
          }
        });
        btns.filter('.btn-ok').on('click', function() {
          var value = overlay.find('.alert-input').val().trim();
          overlay.removeClass('show-alert')
            .find('.alert-input').val(defaultText)
            .parent().data('dtd').resolve(value);
        })
        .siblings('.btn-cancel').on('click', function() {
          overlay.removeClass('show-alert')
            .find('.alert-input').val(defaultText)
            .parent().data('dtd').resolve('');
        });
      }
    };

    // With the help of the following function, we enfore browser to repaint in order to
    // fire up the first time transition of alert icon.
    var startIconTransition = function() {
      var overlay = $('#alert-overlay')[0];
      overlay.style.offsetWidth = overlay.offsetWidth;
      overlay.classList.add('show-alert');
    };

    if (type === 0) { // alert box
      if (!$('.custom-alert').length) {
        appendCustomAlert();
        appendAlertButtons(0);
        bindButtonHandler(0);
        startIconTransition();
      } else if (!$('.alert-box').length) {
        cleanupCustomAlert();
        appendAlertButtons(0);
        bindButtonHandler(0);
      }
      $('#alert-overlay').find('.custom-alert').attr('class', 'custom-alert alert-box')
        .find('.alert-icon').text('!');
    } else if (type === 1) { // confirm box
      if (!$('.custom-alert').length) {
        appendCustomAlert();
        appendAlertButtons(1);
        bindButtonHandler(1);
        startIconTransition();
      } else if (!$('.confirm-box').length) {
        cleanupCustomAlert();
        appendAlertButtons(1);
        bindButtonHandler(1);
      }
      $('#alert-overlay').find('.custom-alert').attr('class', 'custom-alert confirm-box')
        .find('.alert-icon').text('?');
    } else { // prompt box
      if (!$('.custom-alert').length) {
        appendCustomAlert();
        appendAlertInput();
        appendAlertButtons(2);
        bindButtonHandler(2);
        startIconTransition();
      } else if (!$('.prompt-box').length) {
        cleanupCustomAlert();
        appendAlertInput();
        appendAlertButtons(2);
        bindButtonHandler(2);
      }
      $('#alert-overlay').find('.custom-alert').attr('class', 'custom-alert prompt-box')
        .find('.alert-icon').text(':)')
        .siblings('.alert-input').val(defaultText).select();
    }

    $('#alert-overlay').addClass('show-alert')
      .find('.custom-alert').data('dtd', dtd)
      .find('.alert-message').text(message);

    return dtd;
  }

})(jQuery);