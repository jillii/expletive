---
title: contact
weight: 3
---
Questions? Comments? Concerns?

<form id="contact-form"
  action="https://formspree.io/f/xqkgpllv"
  method="POST"
>
    <input type="text" class="input" name="name" placeholder="name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'name'">
	<input type="email" name="email" class="input" placeholder="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'email'">
    <textarea type="textarea" rows="5" name="message" class="input" placeholder="message" onfocus="this.placeholder = ''" onblur="this.placeholder = 'message'"></textarea>
    <button type="submit" id="contact-form-button" value="-_-" class="btn"></button>
    <p id="contact-form-status"></p>
</form>

<!-- Place this script at the end of the body tag -->

<script>
  window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("contact-form");
    var button = document.getElementById("contact-form-button");
    var status = document.getElementById("contact-form-status");

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
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
</script>