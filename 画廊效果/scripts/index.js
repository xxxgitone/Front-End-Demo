
//3.通用函数
function g(selector){
	var method=selector.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
	return document[method](selector.substr(1));
}

//生成一个随机数 random([min,max])
function random(range) {
	var max=Math.max(range[0],range[1]);
	var min=Math.min(range[0],range[1]);
	var diff=max-min;

	var number=Math.ceil((Math.random()*diff+min));

	return number;
}

//4.输出所有的海报
var data=data;

function addPhotos(){
	var template=g('#wrap').innerHTML;
	var html=[];

	var nav=[];
	for(s in data){
		var _html=template.replace(/{{index}}/,s)
							.replace(/{{img}}/,data[s].img)
							.replace(/{{caption}}/,data[s].caption)
							.replace(/{{desc}}/,data[s].desc);

		html.push(_html);

		nav.push('<span id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))" class="i"></span>');
	}

	html.push('<div class="nav">'+nav.join(' ')+"</div>");

	g('#wrap').innerHTML=html.join('');

	sort(random([0,data.length]));
}
addPhotos();

//6.计算左右分区的范围、{left:{x:[min.max],y:[]},right:{x:[min.max],y:[]}}
function range(){
	var range={left:{x:[],y:[]},right:{x:[],y:[]}}
	var wrap={
		w:g('#wrap').clientWidth,
		h:g('#wrap').clientHeight,
	}
	var photo={
		w:g('.photo')[0].clientWidth,
		h:g('.photo')[0].clientHeight,
	}

	range.wrap=wrap;
	range.photo=photo;

	range.left.x=[0-photo.w,wrap.w/2-photo.w/2];
	range.left.y=[0-photo.h,wrap.h];

	range.right.x=[wrap.w/2+photo.w/2,wrap.w+photo.w];
	range.right.y=range.left.y;

	return range;
}


//5.排序海报
function　sort(n){
	var _photo=g('.photo');
	var photos=[];

	for (var i = 0; i < _photo.length; i++) {
		_photo[i].className=_photo[i].className.replace(/\s*photo_center\s*/,' ');
		_photo[i].className=_photo[i].className.replace(/\s*photo_front\s*/,' ');
		_photo[i].className=_photo[i].className.replace(/\s*photo_back\s*/,' ');

		_photo[i].className+=' photo_front ';
		_photo[i].style.left='';
		_photo[i].style.top='';
		_photo[i].style['transform']='rotate(0deg) scale(1.3)';

		photos.push(_photo[i]);
	}


	var photo_center=g('#photo_'+n);
	photo_center.className+=' photo_center';
// 	splice() 方法用于插入、删除或替换数组的元素。
// 注意：这种方法会改变原始数组！。
	photo_center=photos.splice(n,1)[0];//从第n个开始，删除一个

	//把海报分为左右两个分区
	var photo_left=photos.splice(0,Math.ceil(photos.length/2));

	var photo_right=photos;
	var ranges=range();

	for(s in photo_left){
		var photo=photo_left[s];

		photo.style.left=random(ranges.left.x)+'px';
		photo.style.top=random(ranges.left.y)+'px';
		photo.style['transform']='rotate('+random([-150,150])+'deg) scale(1)';
	}

	for(s in photo_right){
		var photo=photo_right[s];

		photo.style.left=random(ranges.right.x)+'px';
		photo.style.top=random(ranges.right.y)+'px';
		photo.style['transform']='rotate('+random([-150,150])+'deg) scale(1)';
	}

	var navs=g('.i');
	for (var i = 0; i < navs.length; i++) {
		navs[i].className=navs[i].className.replace(/\s*i_current\s*/,' ');
		navs[i].className=navs[i].className.replace(/\s*i_back\s*/,' ');
	}

	g('#nav_'+n).className+=' i_current ';

	 //console.log(photo_left.length,photo_right.length);

}


//1.翻面控制
function turn(elem){
	var cls=elem.className;
	var n=elem.id.split('_')[1];

	if(!/photo_center/.test(cls)){
		return sort(n);
	}

	if (/photo_front/.test(cls)) {
		cls=cls.replace(/photo_front/,'photo_back');
		g('#nav_'+n).className+=' i_back ';
	}else{
		cls=cls.replace(/photo_back/,'photo_front');
		g('#nav_'+n).className=g('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
	}

	return elem.className=cls;
}