$(function(){
	if ( location.search && location.search === '?goto=signup' ) {
		$('html, body').animate({
	       scrollTop:   $(this).height(),
	    });

	    setTimeout($('section.active #signup-popup').addClass('active'), 8000);

	}
});