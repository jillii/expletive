var mediaPlayer = $("#media-player"), 
    title       = $("#track-title"),
    dur_main    = $("#dur-main")[0],
    curr_main   = $("#curr-main"),
    players     = $("audio"),
    playing     = -1,
    played      = [],
    played_pointer = -1,
    repeat      = false;

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
      container       = player.parent();

  player.change(function(){
    current_time_el.html(audio[0].currentTime);
  });
  // handle end of track (stop and go to next)
  audio[0].addEventListener("ended", function(){
    container.removeClass("playing")
             .removeClass("active");
    
    if (player.eq(index++)) {
      autoplay(index++);
    } else {
      document.title = "!@#$%";
      playing = -1;
    }
    mediaPlayer.removeClass("paused");
  });
  // handle "play" event
  audio[0].addEventListener("play", function(){
    

    // console.log(playing);
    // console.log(prev);

    console.log(played);
    console.log(played_pointer);

    document.title = "Now playing: " + audio.data("title");
    title.html("Now playing: " + audio.data("title"));

    playing = $(this).parent().parent().index();
    // add current track to "played" array
    if (!repeat) {
      played.push(playing);
      played_pointer++;
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
  });
});
// play all
$("#playall").click(function(){
  // if a track is already playing
  $(".music.playing").each(function(){
    $(this).find("audio")[0].pause();
  });
  // if tag(s) selected
  if ($(".tag.active").length > 0){
    players = $(".match audio");
  }
  players.first()[0].play();
  // others will play automatically upon end of this track

});
function autoplay(index) {
  var curr      = players.eq(index),
      container = curr.parent().parent();
  
  container.addClass("playing active");

  curr[0].play();

  curr[0].addEventListener("ended", function(){
    autoplay(++index);
  });
  container.find(".close").click(function(){
    autoplay(++index);
  });
}
// pause music on explode
$(".music").click(function(e){
  if ($(e.target).hasClass("close")) {
    var music  = $(this),
        player = music.find("audio");
      
      player[0].pause();
      player[0].currentTime = 0;
      player.removeClass("active")
            .removeClass("paused")
            .removeClass("playing");

    // close media player
    mediaPlayer.removeClass("active");
  }
  // handle play next button
});
mediaPlayer.click(function(e){
  var target       = $(e.target),
      next_track   = -1;

  if(target.hasClass("next") || target.hasClass("prev")) {
    var curr      = players.eq(playing),
        container = curr.parent().parent();

    // if play next
    if (target.hasClass("next")) {
      // if playing previously played track
      if (played_pointer != -1 && played_pointer < played.length - 1) {
        played_pointer++;
        next_track = played[played_pointer];
        repeat = true;
      } else {
        // if next track exists
        if (players.eq(playing + 1).length > 0) {
          next_track = playing + 1;
        }
      }
    } else { // has class prev
      if (played_pointer > 0) {
        repeat = true;
        played_pointer--;
        next_track = played[played_pointer];
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