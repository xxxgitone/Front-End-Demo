
window.onload=function(){
	
	var c=document.getElementById('myCanvas');
	
	//getContext("2d") �������ڽ��� HTML5 ����ӵ�ж��ֻ���·�������Ρ�Բ�Ρ��ַ��Լ����ͼ��ķ�����
	var ctx=c.getContext('2d');
	
	//����fillStyle���Կ�����CSS��ɫ�����䣬��ͼ����fillStyleĬ��������#000000����ɫ����
	//fillRect(x,y,width,height) ���������˾��ε�ǰ����䷽ʽ��xy��ʾ��������ʼ����
	
	//ctx.fillStyle='#ff0000';
	//ctx.fillRect(0,0,150,75);
	
	//ctx.beginPath();
	//Բ
	//ctx.arc(95,50,40,0,2*Math.PI);
	//ctx.stroke();
	
	//�ı���ʵ��
	//ctx.font="30px Arial";
	//ctx.fillText("Hello World",10,50);
	//����
	//ctx.strokeText("Hello World",10,50);
	
	
	//����
	//1.createLinearGradient(x,y,x1,y1) - ������������
	
	//var grd=ctx.createLinearGradient(0,0,200,0);
	
	//2.createRadialGradient(x,y,r,x1,y1,r1) - ����һ������/Բ����
	
	// var grd=ctx.createRadialGradient(75,50,5,90,60,100);
	// grd.addColorStop(0,'red');
	// grd.addColorStop(1,'white');
	
	// ctx.fillStyle=grd;
	// ctx.fillRect(10,10,200,80);
	
	
	//��ͼƬ���ڻ�����
	//var img=document.getElementById("scream");
	//ctx.drawImage(img,10,10);
	
	
}






