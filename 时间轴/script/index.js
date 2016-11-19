//获取id
var g = function(id) {
	return document.getElementById(id);
}
var g_class = function(className) {
		return document.getElementsByClassName(className);
	}
	//获取模板内容

var g_tpl = function(id) {
	return g('tpl_' + id).innerHTML;
}

//获取页面高度
var get_body_w=function(){return document.body.offsetWidth;}
var get_body_h=function(){return document.body.offsetHeight;}


//格式化数据
var list = {};
for (var i = 0; i < data.length; i++) {
	var date = new Date(data[i].date); //转化为时间对象
	var year = date.getFullYear();
	var month = date.getMonth() + 1;

	var lunar = GetLunarDateString(date); //农历

	if (!list[year]) {
		list[year] = {};
	}
	if (!list[year][month]) {
		list[year][month] = [];
	}

	var item = data[i];

	item.lunar = lunar[0] + '<br>&nbsp;&nbsp;&nbsp;' + lunar[1];
	item.year = year;
	item.month = month;
	item.like_format = item.like < 10000 ? item.like : (item.like / 10000).toFixed(1) + '万';

	list[year][month].push(item);

}

//时序菜单html生成
var html_scrubber_list = [];

var tpl_year = g_tpl('scrubber_year');
var tpl_month = g_tpl('scrubber_month');

for (y in list) {
	var html_year = tpl_year.replace(/\{year\}/g, y); //替换年份

	var html_month = [];
	for (m in list[y]) { //替换月份
		html_month.unshift(tpl_month.replace(/\{month\}/g, m).replace(/\{year\}/g, y)); //每次都从头插入
	}

	html_year = html_year.replace(/\{list\}/g, html_month.join(' '));

	html_scrubber_list.push(html_year);
}

g('scrubber').innerHTML = '<a href="javascript:;" onclick="scroll_top(0)">现在</a>'+html_scrubber_list.join(' ')+'<a href="javascript:;" onclick="scroll_top(get_body_h())">出生</a>';


//日志列表的生成
var html_content_list = [];

var tpl_year = g_tpl('content_year');
var tpl_month = g_tpl('content_month');
var tpl_item = g_tpl('content_item');

for (y in list) {
	var html_year = tpl_year.replace(/\{year\}/g, y); //替换年份

	var html_month = [];
	for (m in list[y]) { //替换月份
		var html_item = []; //保存日志

		var isFirst_at_month = true;
		for (i in list[y][m]) { //替换日志内容
			var html_data = list[y][m][i];

			var itme_html = tpl_item
				.replace(/\{date\}/g, html_data.date)
				.replace(/\{lunar\}/g, html_data.lunar)
				.replace(/\{intro\}/g, html_data.intro)
				.replace(/\{media\}/g, html_data.media)
				.replace(/\{like\}/g, html_data.like)
				.replace(/\{comment\}/g, html_data.comment)
				.replace(/\{position\}/, i % 2 ? 'right' : 'left')
				.replace(/\{isFirst\}/, isFirst_at_month ? 'first' : '')
				.replace(/\{like_format\}/g, html_data.like_format);
			html_item.push(itme_html);
			isFirst_at_month = false;
		}

		html_month.unshift(tpl_month.replace(/\{month\}/g, m).replace(/\{year\}/g, y).replace(/\{list\}/g, html_item.join(''))); //每次都从头插入
	}

	html_year = html_year.replace(/\{list\}/g, html_month.join(' '))+'<div class="content_year" id="content_month_0_0">0</div>';

	html_content_list.push(html_year);
}

g('content').innerHTML = html_content_list.join(' ');

//获得元素高度
var get_top = function(el) {
		return el.offsetTop + 170;
	}
	//滚动到指定位置
var scroll_top = function(to) {
	var start=document.documentElement.scrollTop || document.body.scrollTop;
	fx(function(now){
		window.scroll(0, now);
	},start,to);
	
}

//年份，月份点击处理
var show_year = function(year) {
	var c_year = g('content_year_' + year);
	var top = get_top(c_year);
	scroll_top(top);
	expend_year(year,g('scrubber_year_'+year));
}

var show_month = function(year, month) {
	var c_month = g('content_month_' + year + '_' + month);
	var top = get_top(c_month);
	scroll_top(top);
	highlight_month(g('scrubber_month_'+year+'_'+month));
}

//高亮处理月份
var highlight_month = function(element) {
	var months = g_class('scrubber_month');
	for (var i = 0; i < months.length; i++) {
		months[i].className=months[i].className.replace(/current/g,'');
	}
	element.className=element.className+' current';
}
//年份点击展开
var expend_year=function(year,element){
	var months=g_class('scrubber_month');
	var show_month=g_class('scrubber_month_in_'+year);
	var years=g_class('scrubber_year');
	for (var i = 0; i < months.length; i++) {//隐藏月份
		months[i].style.display='none';
	}
	for (var i = 0; i < show_month.length; i++) {
		show_month[i].style.display='block';
	}
	for (var i = 0; i < years.length; i++) {
		years[i].className=years[i].className.replace(/current/g,'');
	}
	element.className=element.className+' current';//高亮年份
}

//自动展开
var update_scrubber_year=function(top){
	var years=g('content').getElementsByClassName('content_year');
	var tops=[];
	for (var i = 0; i < years.length; i++) {
		tops.push(years[i].offsetTop);
	}
	for (var i = 1; i < tops.length; i++) {
		if(top>tops[i-1]&&top<tops[i]){
			var year=years[i-1].innerHTML;
			var s_year=g('scrubber_year_'+year);
			expend_year(year,s_year);
		}
	}
}

var update_scrubber_month=function(top){
	var months=g('content').getElementsByClassName('content_month');
	var tops=[];
	for (var i = 0; i < months.length; i++) {
		tops.push(months[i].offsetTop);
	}

	//定位top在窗口的哪个月份区间
	for (var i = 1; i < tops.length; i++) {
		if(top>tops[i-1]&&top<tops[i]){
			var id=months[i-1].id;
			highlight_month(g(id.replace('content','scrubber')));
		}
	}
}

//页面滚动处理，固定时序菜单、自动展开时序菜单
window.onscroll=function(){
	var top=document.documentElement.scrollTop || document.body.scrollTop;//火狐为前者，获取页面滚动高度
	var scrubber=g('scrubber');
	if(top>200){
		scrubber.style.position='fixed';
		scrubber.style.top='60px';
		scrubber.style.left=(get_body_w()-960)/2+'px';
	}else{
		scrubber.style.position='';
		scrubber.style.top='';
		scrubber.style.left='';
	}
	update_scrubber_year(top);
	update_scrubber_month(top);
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