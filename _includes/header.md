{% assign sections = site.sections | sort: "weight" %}
<div id="primary-nav" class="flexbox">
	<p id="menu-toggle">Menu</p>
  {% for section in sections %}
    <a href="#{{ section.title }}">
	    {% if section.name %}
	    	{{ section.name}}
	    {% else %}
	    	{{ section.title }}
	    {% endif %}
	</a>
  {% endfor %}
</div>