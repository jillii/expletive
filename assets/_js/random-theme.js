$(function(){
	var select  = $('#choose-theme select'),
	    options = select.children(),
		rand    = $(options[Math.floor(Math.random() * options.length )]).html();
	
	select.val(rand);
	select.trigger('change');
});