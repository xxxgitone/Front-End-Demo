//获取id
var g=function(id){
	return document.getElementById(id);
}
//获取模板内容
var g_tpl=function(id){
	return g('tpl_'+id).innerHTML;
}

//格式化数据
var list={};
fr(var i=0;i<data.length;i++){
	var date=new Date(data[i].date);//转化为时间对象
	var year=date.getFullYear();
	var month=date.getMonth()+1;

	var lunar=GetLunarDateString(date);//农历
}



// //格式化数据
// {
// 	2016:{
// 		2:[
// 			{
// 				date:'2016-11-17',
// 				year:'2014',
// 				month:'11',
// 				....
// 			}

// 			....//一个月内有多个日志
// 		]
// 		3:[
// 			{

// 			}
// 		]

// 		....//一个年内有多个月
// 	}

// 	2015：{}...//若干的年
// }