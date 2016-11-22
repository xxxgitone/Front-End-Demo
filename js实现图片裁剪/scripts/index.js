document.onselectstart = new Function('event.returnValue=false;');
$('#main').draggable({
	containment: 'parent',
	drag: setChioce,
});
var rightDiv = document.getElementById('right');
var upDiv = document.getElementById('up');
var leftDiv = document.getElementById('left');
var downDiv = document.getElementById('down');
var leftUpDiv = document.getElementById('left_up');
var rightUpDiv = document.getElementById('right_up');
var rightDownDiv = document.getElementById('right_down');
var leftDownDiv = document.getElementById('left_down');

var mainDiv = document.getElementById('main');
var isKeyDown = false;
var contact = ''; //按下哪个触电
//鼠标按下事件
rightDiv.onmousedown = function(e) {
	e.stopPropagation();
	isKeyDown = true;
	contact = 'right';
}
upDiv.onmousedown = function(e) {
	e.stopPropagation();
	isKeyDown = true;
	contact = 'up';
}
leftDiv.onmousedown = function(e) {
	e.stopPropagation();
	isKeyDown = true;
	contact = 'left';
}
downDiv.onmousedown = function(e) {
	e.stopPropagation();
	isKeyDown = true;
	contact = 'down';
}
leftUpDiv.onmousedown = function(e) {
	e.stopPropagation();
	isKeyDown = true;
	contact = 'left_up';
}
rightUpDiv.onmousedown = function(e) {
	e.stopPropagation();
	isKeyDown = true;
	contact = 'right_up';
}
rightDownDiv.onmousedown = function(e) {
	e.stopPropagation();
	isKeyDown = true;
	contact = 'right_down';
}
leftDownDiv.onmousedown = function(e) {
		e.stopPropagation();
		isKeyDown = true;
		contact = 'left_down';
	}
	//鼠标松开事件
window.onmouseup = function() {
		isKeyDown = false;
	}
	//鼠标移动事件
window.onmousemove = function(e) {
		if (isKeyDown) {
			switch (contact) {
				case 'right':
					rightMove(e);
					break;
				case 'up':
					upMove(e);
					break;
				case 'left':
					leftMove(e);
					break;
				case 'down':
					downMove(e);
					break;
				case 'left_up':
					leftMove(e);
					upMove(e);
					break;
				case 'right_up':
					rightMove(e);
					upMove(e);
					break;
				case 'right_down':
					rightMove(e);
					downMove(e);
					break;
				case 'left_down':
					leftMove(e);
					downMove(e);
					break;
			}
		}
		setChioce();
		setPreview();

	}
	//右边移动
function rightMove(e) {
	var x = e.clientX; //鼠标x坐标
	var addWidth = ''; //鼠标移动后选取框增加的宽度
	//offsetWidth返回元素实际大小，包含边框、内边距和滚动条
	//clientWidth元素可视区的大小，可以得到元素内容及内边距所占据的空间大小
	var widthBefore = mainDiv.offsetWidth - 2; //选取框变化之前的宽度，
	addWidth = x - getPosition(mainDiv).left - widthBefore; //鼠标移动后增加后的宽度
	mainDiv.style.width = addWidth + widthBefore + 'px';
}
//上边移动
function upMove(e) {
	var y = e.clientY;
	var mainY = getPosition(mainDiv).top;
	var addHeight = mainY - y; //增加的高度
	var heightBefore = mainDiv.offsetHeight - 2; //选取框原来的高度
	mainDiv.style.height = addHeight + heightBefore + 'px';
	mainDiv.style.top = mainDiv.offsetTop - addHeight + 'px'; //这里需要设置top的值，是因为增加宽度默认是往正方向
}
// 下边移动
function downMove(e) {
	var y = e.clientY;
	var heightBefore = mainDiv.offsetHeight - 2;
	var mainY = getPosition(mainDiv).top;
	var addHeight = y - heightBefore - mainY;
	mainDiv.style.height = mainDiv.offsetHeight + addHeight + 'px';
}
// 左边移动
function leftMove(e) {
	var x = e.clientX;
	var mainX = getPosition(mainDiv).left;
	var addWidth = mainX - x;
	var widthBefore = mainDiv.offsetWidth - 2;
	mainDiv.style.width = widthBefore + addWidth + 'px';
	mainDiv.style.left = mainDiv.offsetLeft - addWidth + 'px';
}
//设置选取区域高亮可见
function setChioce() {
	var top = mainDiv.offsetTop;
	var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
	var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
	var left = mainDiv.offsetLeft;
	var img2 = document.getElementById('img2');
	img2.style.clip = 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px)';
}
//图片预览
function setPreview() {
	var top = mainDiv.offsetTop;
	var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
	var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
	var left = mainDiv.offsetLeft;
	var img3 = document.getElementById('img3');
	img3.style.top=-top+'px';
	img3.style.left=-left+'px';
	//要设置图片定位
	img3.style.clip = 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px)';
}
//获取元素距离屏幕左边和上边的位置，利用offsetLeft
function getPosition(node) {
	var left = node.offsetLeft;
	var top = node.offsetTop;
	var parent = node.offsetParent;
	while (parent != null) {
		left += parent.offsetLeft;
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {
		'left': left,
		'top': top,
	}

}