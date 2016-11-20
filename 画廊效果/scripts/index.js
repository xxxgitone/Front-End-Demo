
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
	for(s in data){
		var _html=template.replace(/{{index}}/,s)
							.replace(/{{img}}/,data[s].img)
							.replace(/{{caption}}/,data[s].caption)
							.replace(/{{desc}}/,data[s].desc);

		html.push(_html);
	}
	g('#wrap').innerHTML=html.join('');

	sort(random([0,data.length]));
}
addPhotos();

//排序海报
function　sort(n){
	var photo_center=g('#photo_'+n);
	photo_center.className+=' photo_center';
}

console.log(data);
//1.翻面控制
function turn(elem){
	var cls=elem.className;
	if (/photo_front/.test(cls)) {
		cls=cls.replace(/photo_front/,'photo_back');
	}else{
		cls=cls.replace(/photo_back/,'photo_front');
	}

	return elem.className=cls;
}