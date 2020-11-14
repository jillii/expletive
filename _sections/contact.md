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

  	console.log("enter function");

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("contact-form");
    var button = document.getElementById("contact-form-button");
    var status = document.getElementById("contact-form-status");

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      status.innerHTML = "Thanks!";
      console.log("step 1");
    }

    function error() {
      status.innerHTML = "Fill out all fields!";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      console.log("step 2");
      var data = new FormData(form);
      console.log("step 3");
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
  	console.log("enter ajax function");
    var xhr = new XMLHttpRequest();
    console.log("step 4");
    xhr.open(method, url);
    console.log("step 5");
    xhr.setRequestHeader("Accept", "application/json");
    console.log('step 6');
    xhr.onreadystatechange = function() {
    	console.log("on ready function enter");
      if (xhr.readyState !== XMLHttpRequest.DONE) return;console.log("done");
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);console.log("error 200");console.log(xhr);
      } else {
      	console.log("step 7");
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    console.log("before send");
    xhr.send(data);
    console.log("after send");
  }
</script>