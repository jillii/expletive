// handle music items
var musics = $('.music'),
	tags   = $('.tag');

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

function update_musics(input, reset, time = 5) {
	var active_tags = "";

	musics.each(function(){
		// hide musics with non-matching tags
		var music = $(this),
			title = music.find("label").html(),
		    tags  = music.data("value");

		if (reset) {
			music.removeClass("no-match")
				 .removeClass("match");
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
				}
				music.addClass("match")
					 .removeClass("no-match");

				// collect active tags
				active_tags += music.data("value");
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
				tag.show();
			} else {
				if (!active_tags.includes(id)) {
					tag.hide();
				} else {
					tag.show();
				}
			}
		}, time += 5);
	});
}