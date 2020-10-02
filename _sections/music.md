---
title: music
weight: 1
---
<div class="copy-area">
	<p>
		You're dealing with a wide range of stuff here. We're here to help you figure out what you're looking for. Start by entering a key phrase to help identify what you'd like to listen to.
	</p> 
	<input class="input" type="text" id="search"><button id="search-by-tag" class="btn" type="submit"></button>
</div>
<div id="tags">
	{% assign tags  = site.data.tracks | map: "tags" | join: ',' | split: ',' | sort %}
	{% assign count = 1 %}
	{% for tag in tags %}
		{% if prev %}
			{% if tag == prev %}
				{% assign count = count | plus: 1 %}
			{% else %}
				<button class="tag" id="{{ prev }}">{{ prev }}<span class="num">{{ count }}</span></button>
				{% assign count = 1 %}
			{% endif %}
		{% endif %}

		{% assign prev = tag %}

	{% endfor %}
</div>

<div class="music-container">
	{% for track in site.data.tracks %}
		<div class="music" data-value="{{ track.tags | join: ' ' }}" data-aos="zoom-out" data-aos-anchor="tags" data-aos-delay="{{ forloop.index0 | times: 100 }}">
			<label>{{ track.title }}</label>
			<div class="close"></div>
			<div class="player">
				<audio id="player-{{ forloop.index0 }}" src="{{ track.mp3 }}"></audio>
				<div> 
				  <button onclick="document.getElementById('player-{{ loop.index0 }}').play()">&#x23f5;</button> 
				  <button onclick="document.getElementById('player-{{ loop.index0 }}').pause()">&#x23f8;</button> 
				  <button onclick="document.getElementById('player-{{ loop.index0 }}').volume += 0.1">+</button> 
				  <button onclick="document.getElementById('player-{{ loop.index0 }}').volume -= 0.1">-</button> 
				</div>
			</div>
		</div>
	{% endfor %}
</div>
