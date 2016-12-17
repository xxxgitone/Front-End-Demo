
window.onload=function(){
	
	var c=document.getElementById('myCanvas');
	
	//getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
	var ctx=c.getContext('2d');
	
	//设置fillStyle属性可以是CSS颜色，渐变，或图案。fillStyle默认设置是#000000（黑色）。
	//fillRect(x,y,width,height) 方法定义了矩形当前的填充方式。xy表示画布的起始坐标
	
	//ctx.fillStyle='#ff0000';
	//ctx.fillRect(0,0,150,75);
	
	//ctx.beginPath();
	//圆
	//ctx.arc(95,50,40,0,2*Math.PI);
	//ctx.stroke();
	
	//文本，实心
	//ctx.font="30px Arial";
	//ctx.fillText("Hello World",10,50);
	//空心
	//ctx.strokeText("Hello World",10,50);
	
	
	//渐变
	//1.createLinearGradient(x,y,x1,y1) - 创建线条渐变
	
	//var grd=ctx.createLinearGradient(0,0,200,0);
	
	//2.createRadialGradient(x,y,r,x1,y1,r1) - 创建一个径向/圆渐变
	
	// var grd=ctx.createRadialGradient(75,50,5,90,60,100);
	// grd.addColorStop(0,'red');
	// grd.addColorStop(1,'white');
	
	// ctx.fillStyle=grd;
	// ctx.fillRect(10,10,200,80);
	
	
	//将图片放在画布上
	//var img=document.getElementById("scream");
	//ctx.drawImage(img,10,10);
	
	
}






