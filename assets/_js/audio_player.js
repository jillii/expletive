$(".player").on("click", function(e){
	var target    = $(e.target),
      controls  = target.parent(),
      audio     = controls.prev(),
      container = controls.parent().parent();

	if (target.hasClass("play")) {
    container.addClass("playing")
             .removeClass("paused");

		target.hide()
		      .next().show();
    }
	if (target.hasClass("pause")) {
    container.removeClass("playing")
             .addClass("paused");

		target.hide()
		      .prev().show();
	}
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
      slider          = $("#dur-" + audio.attr("id").split("-")[1]);

  player.change(function(){
    current_time_el.html(audio[0].currentTime);
  });
  player[0].addEventListener("ended", function(){
    player.parent().removeClass("playing");
  });
});
