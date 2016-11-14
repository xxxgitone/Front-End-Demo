window.onload=function(){
	waterFall('main','box');
	//模拟加载数据
	var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]}
	window.onscroll=function(){
		if (checkScrollSlide()) {
			//渲染
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				var main=document.getElementById('main');
				oBox.className='box';
				main.appendChild(oBox);
				var pic=document.createElement('div');
				pic.className='pic';
				oBox.appendChild(pic);
				var img=document.createElement('img');
				img.src="images/"+dataInt.data[i].src;
				pic.appendChild(img);
				console.log(oBox);
			}
			waterFall('main','box');
		}
	}
}

function waterFall(parent,box){
	//取出main下所有clas为box的元素
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);

	//计算整个页面显示的页数,每个宽度相同
	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);

	//设置main的宽度
	oParent.style.width=oBoxW*cols+'px';
	oParent.style.margin='0 auto';
	
	var hArr=[];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){//第一行的每个box高度
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			//oBoxs[i].style.left=oBoxW*index+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';

			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
}

//获取指定的className元素
function getByClass(parent,className){
	var boxArry=[],
		oElement=parent.getElementsByTagName('*');
	for(var i=0;i<oElement.length;i++){
		if(oElement[i].className==className){
			boxArry.push(oElement[i]);
		}
	}
	return boxArry;
}

//获取最小宽度的索引
function getMinhIndex(arr,value) {
	for(var i in arr){
		if(arr[i]==value){
			return i;
		}
	}
}

//检测是否具备了滚条加载数据块的条件
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	//最后一张图片中间距离整个文档的高度
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//滚动条向下滚动的距离
	var height=document.body.clientHeight||document.documentElement.clientHeight;//可视窗口的大小
	return (lastBoxH<scrollTop+height)?true:false;
}

