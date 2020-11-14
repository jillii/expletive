{% assign sections = site.sections | sort: "weight" %}
<div id="primary-nav" class="flexbox">
	<p id="menu-toggle"></p>
  {% for section in sections %}
    <a href="#" onclick="event.preventDefault();$('section.active').removeClass('active');$('#{{ section.title }}').addClass('active')">
    	{{ section.title }}
    	<div class="clones">
    		{% for i in (0..4) %}
    			<div class="clone">{{ section.title }}</div>
    		{% endfor %}
    	</div>
	</a>
  {% endfor %}
</div>