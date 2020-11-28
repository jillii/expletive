---
title: music
weight: 1
---
<div class="copy-area">
	<p>
		Please enter a key phrase to help identify what you'd like to listen to.
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

<div class="music-container" id="draggy">
	{% for track in site.data.tracks %}
    {% assign id = forloop.index0 %}
		<div class="music" data-value="{{ track.tags | join: ' ' }}">
			<label class="draggable">{{ track.title }}</label>
			<div class="close"></div>
			<div class="player">
				<audio id="player-{{ id }}" preload="metadata" onloadedmetadata="mDur('{{ id }}')" ontimeupdate="mPlay('{{ id }}')">
					<source src="{{ track.mp3 }}" type="audio/wav">
				</audio>
				<div class="controls"> 
				  <button class="play" onclick="document.getElementById('player-{{ id }}').play();">&#x23f5;</button> 
				  <button class="pause" onclick="document.getElementById('player-{{ id }}').pause();">&#x23f8;</button> 
				  <button class="vol vol-incr" onclick="document.getElementById('player-{{ id }}').volume += 0.1">+</button> 
				  <button class="vol vol-decr" onclick="document.getElementById('player-{{ id }}').volume -= 0.1">-</button> 
				  <button class="volume"><span>1.0</span></button>
          <button>
            <span id="curr-{{ id }}" class="current-time"></span>
          </button>
				</div>
        <div class="range-container">
  				<input id="dur-{{ id }}" type="range" name="rng" min="0" value="0" onchange="mSet('{{ id }}')">
        </div>
			</div>
		</div>
	{% endfor %}
</div>

<script type="text/javascript">
	function mDur(id) {
  var aud = document.getElementById("player-" + id),
      dur = document.getElementById("dur-" + id);

  dur.max = aud.duration;
}
function mPlay(id) {
  var aud  = document.getElementById("player-" + id),
      dur  = document.getElementById("dur-" + id),
      curr = $("#curr-" + id);

  dur.value = aud.currentTime;

  curr.html(aud.currentTime);
}
function mSet(id) {
  var aud  = document.getElementById("player-" + id),
    dur  = document.getElementById("dur-" + id),
    curr = $("#curr-" + id);

  aud.currentTime = dur.value;

  curr.html(aud.currentTime);
}

</script>