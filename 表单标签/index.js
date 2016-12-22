$(".flp label").each(function(){
	var sop = '<span class="ch">'; 
	var scl = '</span>';

	$(this).html(sop + $(this).html().split("").join(scl+sop) + scl);
	// span中内容为空的
	$(".ch:contains(' ')").html("&nbsp;");
})

var d;

$(".flp input").focus(function(){
	var tm = $(this).outerHeight()/2 *-1 + "px";
	$(this).next().addClass("focussed").children().stop(true).each(function(i){
		d = i*50;//delay
		$(this).delay(d).animate({top: tm}, 200, 'easeOutBack');
	})
})
$(".flp input").blur(function(){
	if($(this).val() == "")
	{
		$(this).next().removeClass("focussed").children().stop(true).each(function(i){
			d = i*50;
			$(this).delay(d).animate({top: 0}, 500, 'easeInOutBack');
		})
	}
})