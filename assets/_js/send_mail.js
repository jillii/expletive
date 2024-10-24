window.addEventListener("DOMContentLoaded", function() {
  // get the form elements defined in your form HTML above
  
  var forms = document.getElementsByClassName("contact-form");

  Array.from(forms).forEach(function(form) {
    var status = $(form).find(".contact-form-status")[0];

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      status.innerHTML = "Thanks!";
    }

    function error() {
      status.innerHTML = "Fill out all fields!";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data  = new FormData(form),
          honey = $(form).find('.honey'),
          bot   = false;
      // weed out the bots
      honey.each(function(){
        var input = $(this),
            type  = input.attr('type');

        if ('checkbox' === type) {
          if (input.is(':checked')) {
            bot = true;
          }
        }
        if ('text' === type || 'email' === type) {
          if (input.val() !== '') {
            bot = true;
          }
        }
      });

      if (bot) { return false; } // exit function upon finding a bot
      ajax(form.method, form.action, data, success, error);
    });
  });

  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        console.log(error);
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
});