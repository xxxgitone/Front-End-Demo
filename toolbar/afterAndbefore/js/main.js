//jquery别名
requirejs.config({
	paths:{
		jquery:'jquery-1.8.3.min'
	}
})

requirejs(['jquery','backTop'],function($,backTop){

	//模块方式
	// new backTop.BackTop($('#backTop'),{
	// 	mode:'go',
	// 	// pos:200,
	// 	// speed:2000,
	// })

	// 插件方式
	$('#backTop').backTop({
		mode:'move',
	})



	// var scroll=new scrollTo.ScrollTo({
	// 	// dest:500,
	// 	speed:2000,
	// });

	// $('#backTop').on('click',$.proxy(scroll.move,scroll));

	// $(window).on('scroll',function(){
	// 	checkPosition($(window).height());

	// });

	// checkPosition($(window).height());

	// // function move(){
	// // 	$('html,body').animate({//滚动条的基于位置不一样
	// // 		scrollTop:0
	// // 	},300);
	// // }

	// // 直接上去
	// // function go(){
	// // 	$('html,body').scrollTop(0);
	// // }

	// function checkPosition(pos){
	// 	if($(window).scrollTop()>pos){
	// 		$('#backTop').fadeIn();
	// 	}else{
	// 		$('#backTop').fadeOut();
	// 	}
	// }

})