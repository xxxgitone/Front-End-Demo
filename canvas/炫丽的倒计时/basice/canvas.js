

window.onload=function(){
	
	var canvas=document.getElementById('myCanvas');
	var context=canvas.getContext('2d');
	
	//ֱ��,�����
	context.moveTo(50,50);
	context.lineTo(800,500);
	context.lineTo(50,500);
	context.lineTo(50,50);
	
	
	//������ȣ���ʽ
	// context.lineWidth=5;
	// context.strokeStyle='#058';
	// context.stroke();
	
	
	//�����ɫ
	//context.fillStyle='rgb(2,100,30)';
	//context.fill();
	//���ʹ��
	context.lineWidth=5;
	context.strokeStyle='red';
	context.stroke();
	
	//���Ƶڶ���ͼ�Σ��ٵ���moveTo,��ɫ�Ḳ��,ʹ��·����ʼ�ر�
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





