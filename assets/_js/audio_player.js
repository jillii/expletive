var mediaPlayer = $("#media-player"),
    title       = $("#track-title"),
    progress    = $("#track-progress");

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
      audio           = player.find("audio"),
      curr_time       = audio[0].currentTime,
      dur             = audio[0].duration,
      current_time_el = $("#curr-" + audio.attr("id").split("-")[1]),
      slider          = $("#dur-" + audio.attr("id").split("-")[1]),
      container       = player.parent();

  player.change(function(){
    current_time_el.html(audio[0].currentTime);
  });

  audio[0].addEventListener("ended", function(){
    container.removeClass("playing");
    
    document.title = "!@#$%";
    
    title.html("");
    
    mediaPlayer.removeClass("active")
               .removeClass("playing")
               .removeClass("paused");
  });
  audio[0].addEventListener("play", function(){
    document.title = "Now playing: " + audio.data("title");
    title.html("Now playing: " + audio.data("title"));

    mediaPlayer.addClass("active")
               .removeClass("paused")
               .addClass("playing");

    container.addClass("playing")
         .removeClass("paused");
  });
  audio[0].addEventListener("pause", function(){
    document.title = "!@#$%";
    mediaPlayer.removeClass("playing")
               .addClass("paused");

    container.removeClass("playing")
         .addClass("paused");
  });
});
// pause music on explode
$(".music .close").click(function(){
  var music  = $(this).parent(),
      player = music.find("audio")[0];

  if (music.hasClass("playing")) {
    player.pause();
  }
});
// play all
$("#playall").click(function(){
  var players = $("audio"),
      curr    = players.first(),
      count   = 0;

  autoplay(curr);

  function autoplay(curr) {
    if (curr != false) {
      var container = curr.parent().parent();
      container.addClass("playing");

      curr[0].play();

      curr[0].addEventListener("ended", function(){
        container.removeClass("playing");
        autoplay(players.eq(++count));
      });
      container.find(".close").click(function(){
        autoplay(players.eq(++count));
      });
    }
  }
});
var mediaPlayerCurr = $("#track-progress");

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
  mediaPlayerCurr.html(aud.currentTime);
}
