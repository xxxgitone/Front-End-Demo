//定义模块，可以引用别的模块
define(['jquery'],function($){
	function isEmpty(){

	}
	function isEqual(str1,str2){
		return str1===str2;
	}

	return {
		isEmpty:isEmpty,
		isEqual:isEqual,
	}

});