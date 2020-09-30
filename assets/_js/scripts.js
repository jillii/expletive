$(function(){

	var slider     = $(".slider"),
	    len        = slider.children().length,
	    margin     = parseInt(slider.css("margin-left").replace(/[^-\d\.]/g, '')),
		counter    = $("#slide-number"),
		curr_index = 1;


	$(".dir").click(function(){
		var dir = $(this).attr("id");

		if (dir == "right") {
			if (curr_index < len) {
				margin -= 100;
				curr_index++;
			} else {
				margin = 0;
				curr_index = 1;
			}
		} else { // dir == left
			if (curr_index > 1) {
				margin += 100;
				curr_index--;
			} else {
				margin = (len - 1) * -100;
				curr_index = len;
			}
		}
		slider.css("margin-left", margin + '%');
		counter.text(curr_index);
	});
});
// detect when user has reached bottom of page
// and add fallen class to stars div
window.onscroll = function() {
  var d = document.documentElement;
  var offset = d.scrollTop + window.innerHeight;
  var height = d.offsetHeight;

  if (offset >= height) {
    $("#stars").addClass("fallen");
  }
};
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
	update_tags(input, reset);
});
$(".tag").click(function(){
	var btn   = $(this),
			id    = btn.attr("id");
			reset = false;

	if (btn.hasClass("active")) {
		reset = true;
	}
	update_musics(id, reset);
	update_tags(id, reset);
	btn.toggleClass("active");

});

function update_musics(input, reset, time = 5) {
	musics.each(function(){
		// hide musics with non-matching tags
		var item = $(this);

		setTimeout( function() {

			if (reset) {
				item.removeClass("no-match")
						.removeClass("match");
			} else {

				if (!item.data("value").includes(input)) {
					item.addClass("no-match")
							.removeClass("match");
				} else {
					item.addClass("match")
						.removeClass("no-match");
				}
			}
		}, time += 5);
	});
}
function update_tags(input, reset, time = 5) {
		tags.each(function(){
			var tag = $(this),
			 		id  = tag.attr("id");

			setTimeout( function(){
				if (reset) {
					tag.show();
				} else {
					if (!id.includes(input)) {
						tag.hide();
					}
				}
			}, time += 5);
		});
}