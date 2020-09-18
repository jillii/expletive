{% assign sections = site.sections | sort: "weight" %}
<div id="primary-nav" class="flexbox">
	<p id="menu-toggle">Menu</p>
  {% for section in sections %}
    <a href="#{{ section.title }}">{{ section.title }}</a>
  {% endfor %}
</div>