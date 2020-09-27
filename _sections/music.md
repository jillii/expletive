---
title: music
weight: 1
---
<div class="copy-area">
	<p>
		You're dealing with a wide range of stuff here. We're here to help you figure out what you're looking for. Start by entering a key phrase to help identify what you'd like to listen to.
	</p> 
	<input class="input" type="text" ><button class="btn" type="submit"></button>
</div>

<div class="music-container">
	{% for track in site.data.tracks %}
		<div class="music">
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
