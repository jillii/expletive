$(function(){
	// navigation
	var hash = location.hash;

	$(".aos-animate").removeClass("aos-animate");
	if (hash != "") {
		$("section.active").removeClass("active");

		$(hash).addClass("active")
			   .find(".aos-init").addClass("aos-animate");
	}
	if (hash == '#about') {
		$("section.active").find(".typing-init").addClass("typing");
	}
	$("#primary-nav").on("click", ".nav-link", function(e){
		e.preventDefault();
		var active = $("section.active");

		active.removeClass("active");
	    

		var id = $(e.target).data("value");

		$('#' + id).addClass("active")
				   .find(".aos-init").addClass("aos-animate")
		    	   .find(".typing-init").addClass("typing");

		location.hash = id;
	});
});
// handle music items
var musics = $('.music'),
	tags   = $('.tag');
// play track on window load, if specified in query
$(function(){
  var search = location.search;

  if (search) {
    var track_title = decodeURIComponent(search.split('=')[1]),
    	is_play     = decodeURIComponent(search.split('=')[0]);

    if ( is_play.indexOf('play') != -1 ) {
	    update_musics(track_title, false, 5, true);
	}

  }
});
$("#search").keyup(function(){
	var input = $(this).val(),
		reset = false;

	if (input == "") {
		reset = true;
	}
	update_musics(input, reset);
});
$(".tag").click(function(){
	var btn   = $(this),
		id    = btn.attr("id");
		reset = false;

	if (btn.hasClass("active")) {
		reset = true;
	}

	update_musics(id, reset);
	btn.toggleClass("active");

});

function update_musics(input, reset, time = 5, exact_match = false) {
	var active_tags = "";

	musics.each(function(){
		// hide musics with non-matching tags
		var music = $(this),
			title = music.find("label").html(),
		    tags  = music.data("value");

		if (reset) {
			music.removeClass("no-match")
				 .removeClass("match")
				 .removeClass("exact-match");
		} else {

			if (!tags.includes(input)) {
				music.addClass("no-match")
					 .removeClass("match");
			    if (music.hasClass("exact-match")) {
			    	music.removeClass("exact-match");
			    }
			} else {
				if (title == input) { // if exact match
					music.addClass("exact-match");
				} else {
					if (exact_match) {
						music.addClass("no-match");
					}
				}

				if (!exact_match || title == input) {
					music.addClass("match");
					// collect active tags
					active_tags += music.data("value");
				}
			}
		}
	});
  
	update_tags(active_tags, reset);
}
function update_tags(active_tags, reset, time = 5) {
	tags.each(function(){
		var tag = $(this),
		 	id  = tag.attr("id");

		setTimeout( function(){
			if (reset) {
				tag.removeClass("active").show();
			} else {
				if (!active_tags.includes(id)) {
					tag.hide();
				}
			}
		}, time += 5);
	});
}
$(function(){
	var collages = $(".collage"),
		btn      = $(".collage button");

	btn.click(function(e){
		var target = $(e.target).data("value");

		if ($('#' + target).hasClass("active")) {
			collages.each(function(){
				$(this).show();
			});
			$(".collage.active").removeClass("active");
		} else {
			window.scrollTo(0, 0);
			collages.each(function(){
				var collage = $(this);

				if (collage.attr("id") != target) {
					collage.hide();
				} else {
					collage.addClass("active");
				}
			});
		}
	});
});