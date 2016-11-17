//jquery别名
requirejs.config({
	paths:{
		jquery:'jquery-1.8.3.min'
	}
})

//引用jquery模块，validator
requirejs(['jquery','validate'],function($,validate){
	//$('body').css('background','red');
	console.log(validate.isEqual(1,2));
})