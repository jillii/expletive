{% assign sections = site.sections | sort: "weight" %}
<div id="primary-nav" class="flexbox">
	<p id="menu-toggle">Menu</p>
  {% for section in sections %}
    <a href="#" onclick="event.preventDefault();$('section.active').removeClass('active');$('#{{ section.title }}').addClass('active')">
    	{{ section.title }}
	</a>
  {% endfor %}
</div>