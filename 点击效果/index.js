$(function(){
	$('ul li a').click(function(e){
		var parent = $(this).parent();

		if(parent.find(".ink").length == 0)
			parent.prepend("<span class='ink'></span>");

		var ink = parent.find('.ink');
		ink.removeClass('animate');

		if (!ink.height()&&!ink.width()) {
			var d = Math.max(parent.outerWidth(),parent.outerHeight());
			ink.css({
				height:d,
				width:d
			});
		}

		var x = e.pageX - parent.offset().left - ink.width()/2;
		var y = e.pageY - parent.offset().top - ink.height()/2;

		ink.css({
			top: y + 'px',
			left: x +'px'
		}).addClass('animate');
	})


});