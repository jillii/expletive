$(function(){
	var prev_slide = $('.slide.active'),
		curr_slide   = prev_slide,
		len          = $(".slider").children().length,
		counter      = $("#slide-number");

	$(".dir").click(function(){
		var dir = $(this).attr("id");

		prev_slide = curr_slide;

		if (dir == "right") {
			if (curr_slide.next().length > 0) {
				curr_slide = curr_slide.next();
				prev_slide.addClass("post");
				curr_slide.removeClass("pre");
			} else {// go to beginning
				curr_slide = $(".slide:first-of-type");

				for (var i = 1; i < len; i++) {
					$(".slide").eq(i).removeClass("post").addClass("pre");
				}
				curr_slide.removeClass("post");
			}

		} else { // dir == left
			if (curr_slide.prev().length > 0) {
				curr_slide = curr_slide.prev();
				prev_slide.addClass("pre");
				curr_slide.removeClass("post");
			} else { // go back to end
				curr_slide = $(".slide:last-of-type");
				for (var i = curr_slide.index() - 1; i >= 0; i--) {
					$(".slide").eq(i).removeClass("pre").addClass("post");
				}
				curr_slide.removeClass("pre");
			}
		}
		prev_slide.removeClass("active");
		curr_slide.addClass("active");
		counter.text(curr_slide.index() + 1);
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