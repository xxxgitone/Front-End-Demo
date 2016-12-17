

window.onload=function(){
	
	var canvas=document.getElementById('myCanvas');
	var context=canvas.getContext('2d');
	
	//直线,多边形
	context.moveTo(50,50);
	context.lineTo(800,500);
	context.lineTo(50,500);
	context.lineTo(50,50);
	
	
	//线条宽度，样式
	// context.lineWidth=5;
	// context.strokeStyle='#058';
	// context.stroke();
	
	
	//填充颜色
	//context.fillStyle='rgb(2,100,30)';
	//context.fill();
	//混合使用
	context.lineWidth=5;
	context.strokeStyle='red';
	context.stroke();
	
	//绘制第二个图形，再调用moveTo,颜色会覆盖,使用路径开始关闭
	context.beginPath();	
	context.moveTo(50,50);
	context.lineTo(800,500);
	context.lineTo(50,500);
	context.lineTo(50,50);
	context.closePath();
	
	context.lineWidth=5;
	context.strokeStyle='#058';
	context.stroke();
	
	context.beginPath();
	context.moveTo(100,50);
	context.lineTo(900,500);
	context.closePath();
	context.strokeStyle='red';
	context.stroke();
	
}





