var mediaPlayer = $("#media-player"), 
    title       = $("#track-title"),
    dur_main    = $("#dur-main")[0],
    curr_main   = $("#curr-main"),
    players     = $("audio"),
    playing     = -1,
    played      = [],
    pointer     = -1,
    repeat      = false,
    footer      = $("footer"),
    stopping    = false;

// handle all player related clicks
$(".player").on("click", function(e){
	var target    = $(e.target),
      controls  = target.parent(),
      audio     = controls.prev();

  if (target.hasClass("vol")) {
  var volume   = (audio[0].volume).toFixed(1),
    vol_inc  = $(".vol-incr"),
    vol_dec  = $(".vol-decr");

    if (volume == 1.0) {
      vol_inc.css("opacity", .75);
    } else if (volume == 0.0) {
      vol_dec.css("opacity", 0.75);
    } else {
      $(".vol").css("opacity", 1);
    }
    controls.find(".volume span").html(volume);
  }
});

$(".player").each(function(){
  var player          = $(this),
      index           = player.index(),
      audio           = player.find("audio"),
      curr_time       = audio[0].currentTime,
      dur             = audio[0].duration,
      current_time_el = $("#curr-" + audio.attr("id").split("-")[1]),
      slider          = $("#dur-" + audio.attr("id").split("-")[1]),
      container       = player.closest('.music');

  player.change(function(){
    current_time_el.html(audio[0].currentTime);
  });

  // handle end of track (stop and go to next)
  audio[0].addEventListener("ended", function(){

    container.removeClass("playing")
             .removeClass("paused")
             .removeClass("active");

    if (player.eq(index++) && !stopping) {
      autoplay(index++);
    } else {
      stop();
    }
    mediaPlayer.removeClass("paused");
  });
  // handle "play" event
  audio[0].addEventListener("play", function(){

    stopping = false;
    // update document title

    document.title = "Now playing: " + audio.data("title");
    title.html("Now playing: " + audio.data("title"));
    speak('Now playing ' + audio.data("title"));
    // start stars
    footer.addClass("active");
    
    playing = players.index($(this));

    // add current track to "played" array
    if (!repeat) {
      played.push(playing);
      pointer++;
    } else {
      repeat = false;
    }

    mediaPlayer.addClass("active")
               .removeClass("paused")
               .addClass("playing");

    container.addClass("playing")
             .addClass("active")
             .removeClass("paused");
  });
  // handle "pause" event
  audio[0].addEventListener("pause", function(){
    document.title = "!@#$%";
    mediaPlayer.removeClass("playing")
               .addClass("paused");

    container.removeClass("playing")
             .addClass("paused");

    footer.removeClass("active");
  });
});
// shuffle
$("#shuffle").click(function(){
  $(".music.playing").each(function(){
    $(this).find("audio")[0].pause();
  });
  // if tag(s) selected
  // otherwise reset player list, in case it had been updated previously
  if ($(".tag.active").length > 0){
    players = $(".match audio");
  } else {
    players = $("audio");
  }
  // shuffle tracks
  players.sort(function() { return 0.5 - Math.random() });
  
  $(".music-container").toggleClass("shuffle");
  // reset everything
  played = [];
  pointer = -1;
  playing = -1;
  repeat = false;

  players.first()[0].play();
});
// play all
$("#playall").click(function(){
  // if a track is already playing
  $(".music.playing").each(function(){
    $(this).find("audio")[0].pause();
  });
  // if tag(s) selected
  // otherwise reset player list, in case it had been updated previously
  if ($(".tag.active").length > 0){
    players = $(".match audio");
  } else {
    players = $("audio");
  }
  players.first()[0].play();
  // others will play automatically upon end of this track
});

function autoplay(index) {
  var curr      = players.eq(index),
      container = curr.closest('.music');

  // reset played array
  played = [];
  pointer = -1;
  
  container.addClass("playing active");

  curr[0].play();

  curr[0].addEventListener("ended", function(){
    autoplay(++index);
  });
}
// pause music on explode
$(".music").click(function(e){
  if ($(e.target).hasClass("close")) {
    var music  = $(this),
        player = music.find("audio");
    
    if (music.hasClass("playing")) {
      
      player[0].pause();
      player[0].currentTime = 0;
      player.removeClass("active")
            .removeClass("paused")
            .removeClass("playing");

      // close media player
      mediaPlayerSpinOut();
    }
  }
  // handle play next button
});
mediaPlayer.click(function(e){
  var target       = $(e.target),
      next_track   = -1;

  if(target.hasClass("next") || target.hasClass("prev")) {
    var curr      = players.eq(playing),
        container = curr.closest('.music');

    
    // if play next
    if (target.hasClass("next")) {
      // if playing previously played track
      if (pointer != -1 && pointer < played.length - 1) {
        pointer++;
        next_track = played[pointer];
        repeat = true;
      } else {
        // if next track exists
        if (players.eq(playing + 1).length > 0) {
          next_track = playing + 1;
        } else {
          next_track = 0;
        }
      }
    } else { // has class prev
      if (pointer > 0) {
        repeat = true;
        pointer--;
        next_track = played[pointer];
      }
    }
    if (next_track != -1) {
      container.removeClass("active");
      if (container.hasClass("playing")) {
        curr[0].pause();
      }
      // stop current track
      curr[0].currentTime = 0;
      // play next track
      players.eq(next_track)[0].play();
    }
  }
});

function stop(audio) {
  var audio = $(".music.playing").find('audio')[0];
  
  document.title = "!@#$%";
  stopping = true;
  playing = -1;
  
  audio.pause();
  audio.currentTime = 0;

  $(audio).closest(".music").removeClass("active")
                           .removeClass("playing")
                           .removeClass("paused");

  footer.removeClass("active");
  mediaPlayerSpinOut();
}

function mediaPlayerSpinOut() {
  mediaPlayer.addClass("spin-out");
  mediaPlayer[0].addEventListener('animationend', (e) => {
    mediaPlayer.removeClass("active")
               .removeClass("paused")
               .removeClass("playing")
               .removeClass("spin-out");
  });
  footer.removeClass("active");
}

function mDur(id) {
  var aud = document.getElementById("player-" + id),
      dur = document.getElementById("dur-" + id);

  dur.max = aud.duration;
  dur_main.max = aud.duration;

}
function mPlay(id) {
  var aud  = document.getElementById("player-" + id),
      dur  = document.getElementById("dur-" + id),
      curr = $("#curr-" + id);

  dur.value = aud.currentTime;
  curr.html(aud.currentTime);

  dur_main.value = aud.currentTime;
  curr_main.html(aud.currentTime);
}
function mSet(id, target) {
  var aud  = document.getElementById(id),
      dur  = target,
      curr = target.parent().prev().find('.current-time');

  aud.currentTime = dur.val();
  curr.html(aud.currentTime);
}

function speak (message) {
  var msg = new SpeechSynthesisUtterance(message);
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[0];
  window.speechSynthesis.speak(msg)
}