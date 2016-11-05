$(function() {
	$('.link .button').hover(function() {
		var title = $(this).attr('data-title');
		$('.tip em').text(title);
		var pos=$(this).position().left;
		var dis = ($('.tip').outerWidth() - $(this).outerWidth()) / 2;
		var l = pos - dis;
		$('.tip').css({
			'left': l+ 'px',
		}).animate({
			'top': 133,
			'opacity': 1,
		}, 300);
	}, function() {
		if(!$('.tip').is(':animated')) {
			$('.tip').animate({
				'top': 100,
				'opacity': 0,
			}, 300);
		}
	})

})