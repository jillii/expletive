$(function(){
	// var prev_slide = $('.slide.active'),
		// curr_slide   = prev_slide,
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