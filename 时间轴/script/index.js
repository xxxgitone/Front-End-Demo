//获取id
var g = function(id) {
		return document.getElementById(id);
	}
	//获取模板内容
var g_tpl = function(id) {
	return g('tpl_' + id).innerHTML;
}

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
		html_month.unshift(tpl_month.replace(/\{month\}/g, m)); //每次都从头插入
	}

	html_year = html_year.replace(/\{list\}/g, html_month.join(' '));

	html_scrubber_list.push(html_year);
}

g('scrubber').innerHTML = html_scrubber_list.join(' ');


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

		var isFirst_at_month=true;
		for (i in list[y][m]) { //替换日志内容
			var html_data = list[y][m][i];

			var itme_html = tpl_item
									.replace(/\{date\}/g, html_data.date)
									.replace(/\{lunar\}/g, html_data.lunar)
									.replace(/\{intro\}/g, html_data.intro)
									.replace(/\{media\}/g, html_data.media)
									.replace(/\{like\}/g, html_data.like)
									.replace(/\{comment\}/g, html_data.comment)
									.replace(/\{position\}/, i%2?'right':'left')
									.replace(/\{isFirst\}/, isFirst_at_month?'first':'')
									.replace(/\{like_format\}/g, html_data.like_format);
			html_item.push(itme_html);
			isFirst_at_month=false;
		}

		html_month.unshift(tpl_month.replace(/\{month\}/g, m).replace(/\{list\}/g,html_item.join(''))); //每次都从头插入
	}

	html_year = html_year.replace(/\{list\}/g, html_month.join(' '));

	html_content_list.push(html_year);
}

g('content').innerHTML = html_content_list.join(' ');



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