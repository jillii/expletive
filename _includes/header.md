{% assign sections = site.sections | sort: "weight" %}
<div id="primary-nav" class="flexbox">
	<p id="menu-toggle" onclick="$('#primary-nav').toggleClass('active')"></p>
  {% for section in sections %}
    <a href="#" class="nav-link" data-value="{{ section.title }}" onclick="$('#primary-nav').removeClass('active')">
    	{{ section.title }}
    	<div class="clones">
    		{% for i in (0..4) %}
    			<div class="clone">{{ section.title }}</div>
    		{% endfor %}
    	</div>
	</a>
  {% endfor %}
</div>