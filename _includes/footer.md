<div id="stars-1" class="stars infinite">
	{% for i in (1..50) %}
		<div class="star"></div>
	{% endfor %}
</div>
<div id="stars-2" class="stars infinite">
	{% for i in (1..50) %}
		<div class="star"></div>
	{% endfor %}
</div>

<div class="signup"><a href="#" onclick="event.preventDefault();$(this).next().toggleClass('active');">Sign up</a> for !@#$%'s mailing list and stay updated about show's. Will talk about other things upon request.
	<div id="signup-popup" class="popup windows">
		<div class="top">
			<div class="close"></div>
		</div>
		Sign me up!<br><br>
		<form id="contact-form"
			  class="contact-form"
			  action="https://formspree.io/f/xqkgpllv"
			  method="POST">
			<input type="email" name="email" class="input" placeholder="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'email'" validate="email">
		    <input type="hidden" name="message" value="sign me up for emails">
		    <button type="submit" class="contact-form-button btn" value="-_-"></button>
		    <p class="contact-form-status"></p>
		</form>
	</div>
</div>

<p>Do you use<br>"social media?"</p>
<div data-aos="fade-up" data-aos-anchor="#contact" class="socials">
  <a class="fab icon-facebook" href="https://www.facebook.com/generalexpletive"></a>
  <a class="fab icon-instagram" href="https://www.instagram.com/____expletive/"></a>
  <a class="fab icon-soundcloud" href="https://soundcloud.com/generalexpletive"></a>
</div>