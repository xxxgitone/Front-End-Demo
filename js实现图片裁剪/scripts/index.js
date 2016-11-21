var rightDiv = document.getElementById('right');
var mainDiv = document.getElementById('main');
var isKeyDown = false;
//鼠标按下事件
rightDiv.onmousedown = function(e) {
		isKeyDown = true;
	}
	//鼠标松开事件
window.onmouseup = function() {
		isKeyDown = false;
	}
	//鼠标移动事件
window.onmousemove = function(e) {
	if (isKeyDown) {
		var x = e.clientX; //鼠标x坐标
		var addWidth = ''; //鼠标移动后选取框增加的宽度
		//offsetWidth返回元素实际大小，包含边框、内边距和滚动条
		//clientWidth元素可视区的大小，可以得到元素内容及内边距所占据的空间大小
		var widthBefore = mainDiv.offsetWidth - 2; //选取框变化之前的宽度，
		addWidth = x - getPosition(mainDiv).left - widthBefore; //鼠标移动后增加后的宽度
		mainDiv.style.width = addWidth + widthBefore + 'px';
	}

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