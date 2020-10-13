// $(function(){

// 	var slider     = $(".slider"),
// 	    len        = slider.children().length,
// 	    margin     = parseInt(slider.css("margin-left").replace(/[^-\d\.]/g, '')),
// 		counter    = $("#slide-number"),
// 		curr_index = 1;


// 	$(".dir").click(function(){
// 		var dir = $(this).attr("id");

// 		if (dir == "right") {
// 			if (curr_index < len) {
// 				margin -= 100;
// 				curr_index++;
// 			} else {
// 				margin = 0;
// 				curr_index = 1;
// 			}
// 		} else { // dir == left
// 			if (curr_index > 1) {
// 				margin += 100;
// 				curr_index--;
// 			} else {
// 				margin = (len - 1) * -100;
// 				curr_index = len;
// 			}
// 		}
// 		slider.css("margin-left", margin + '%');
// 		counter.text(curr_index);
// 	});
// });
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
		var music = $(this);

		if (reset) {
			music.removeClass("no-match")
					.removeClass("match");
		} else {

			if (!music.data("value").includes(input)) {
				music.addClass("no-match")
						.removeClass("match");
			} else {
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
				if (!active_tags.includes(tag.attr("id"))) {
					tag.hide();
				} else {
					tag.show();
				}
			}
		}, time += 5);
	});
}