var window_width=1024; //画布宽
var window_height=560;
var radius=8;  //半径
var margin_top=60; //第一个距离画布的上面距离
var margin_left=30;//第一个距离画布左边的距离

// const endTime=new Date(2016,8,24,18,22,22);
var endTime=new Date();
endTime.setTime(endTime.getTime()+3600*1000);

var curShowTimeSeconds=0;

var balls=[];
var colors=['#0d6ad2','#ff0074','#ff8a00','#26ff9c','#00ff8b','#8a00ff','#7bff00','#ff8300','#7cff00','#57b100'];
window.onload=function(){
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');
	
	canvas.width=window_width;
	canvas.height=window_height;
	
	curShowTimeSeconds=getCurrentShowTimeSecondes();
	
	setInterval(function(){
		render(context);
		update();
	},50);
	
	
	
}
function update(){
	
	var nextShowTimeSeconds=getCurrentShowTimeSecondes();
	
	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextShowTimeSeconds%60;
	
	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds=curShowTimeSeconds%60;
	
	if(curSeconds!=nextSeconds){//判断时间不一样
		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
			addBalls(margin_left+0,margin_top,parseInt(curHours/10));
		}
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
			addBalls(margin_left+15*(radius+1),margin_top,parseInt(curHours%10));
		}
		
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
			addBalls(margin_left+39*(radius+1),margin_top,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
			addBalls(margin_left+54*(radius+1),margin_top,parseInt(curMinutes%10));
		}
		
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
			addBalls(margin_left+78*(radius+1),margin_top,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
			addBalls(margin_left+93*(radius+1),margin_top,parseInt(curSeconds%10));
		}
	
	
		curShowTimeSeconds=nextShowTimeSeconds;
		
		
	}
	updateBalls();
	
	console.log(balls.length);
};
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].y>=window_height-radius){
			balls[i].y=window_height-radius;
			balls[i].vy=-balls[i].vy*0.6;
		}
	}
	
	//解决小球积压问题
	var count=0;
	for(var i=0;i<balls.length;i++)
		if(balls[i].x+radius>0&&balls[i].x-radius<window_width){
			//把符合的小球找出来
			balls[count++]=balls[i];
		}
			//将不符合的删除,长度取300和count中最小的一个
			
		while(balls.length>Math.min(300,count)){
			balls.pop();
		}
}

function addBalls(x,y,num){
		for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){  
				var oBall={
					x:x+(radius+1)+2*j*(radius+1),
					y:y+(radius+1)+2*i*(radius+1),
					g:1.5+Math.random(),
					//   pow -1的多少次方，取正1或者负1，最后为-4或者4
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)],
				}
				balls.push(oBall);	
			}
}

function getCurrentShowTimeSecondes(){
	var curTime=new Date();
	//倒计时
	// var ret=endTime.getTime()-curTime.getTime();
	// ret=Math.round(ret/1000);
	
	// return ret>=0?ret:0;
	
	//时钟
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	
	return ret;
};

function render(ctx){
	//对画布进行刷新
	ctx.clearRect(0,0,window_width,window_height);
	
	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds=curShowTimeSeconds%60;
	
	renderDigit(margin_left,margin_top,parseInt(hours/10),ctx);
	//margin_left+14*(radius+1)+(radius+1) 空有间距
	renderDigit(margin_left+15*(radius+1),margin_top,parseInt(hours%10),ctx);
	renderDigit(margin_left+30*(radius+1),margin_top,10,ctx);

	renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),ctx);
	renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),ctx);
	renderDigit(margin_left+69*(radius+1),margin_top,10,ctx);
	
	renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),ctx);
	renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),ctx);

	for(var i=0;i<balls.length;i++){
		ctx.fillStyle=balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI,true);
		ctx.closePath();
		ctx.fill();
	}
}

function renderDigit(x,y,num,ctx){
	
	ctx.fillStyle='rgb(0,102,153)';
	
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){  
				ctx.beginPath();
				//第（i，j）个圆的圆心X：x+(r+1)+2*j*(r+1);y:y+(r+1)+2*i*(r+1);
				ctx.arc(x+(radius+1)+2*j*(radius+1),y+(radius+1)+2*i*(radius+1),radius,0,2*Math.PI);
				
				ctx.closePath();
				
				ctx.fill();
			}
}



