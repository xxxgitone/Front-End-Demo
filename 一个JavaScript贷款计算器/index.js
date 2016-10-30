'usr strict';

function calculate(){
	var amount=document.getElementById('amount');//总共贷款
	var apr=document.getElementById('apr');//年利息
	var years=document.getElementById('years');//偿还年限
	var zipcode=document.getElementById('zipcode');//邮政编码
	var payment=document.getElementById('payment');
	var total=document.getElementById('total');
	var totalinterest=document.getElementById('totalinterest');


	//从input中获取元素
	//将百分比格式转换为小数格式，并从年利率转换为月利率
	//将年度赔付转换为月度赔付
	var principal=parseFloat(amount.value);
	var interest=parseFloat(apr.value)/100/12;
	var payments=parseFloat(years.value)*12;

	//计算月度赔付的数据
	var x=Math.pow(1+interest,payments);  //math.pow()进行幂运算
	var monthly=(principal*x*interest)/(x-1);

	if(isFinite(monthly)){
		payment.innerHTML=monthly.toFixed(2);//四舍五入到小数点后两位数字
		total.innerHTML=(monthly*payments).toFixed(2);
		totalinterest.innerHTML=((monthly*payments)-principal).toFixed(2);

		//将用户输入的数据保存起来，这样下次访问时也能读到数据
		save(amount.value,apr.value,years.value,zipcode.value);

		//找到并展示本地放款人，但忽略网络错误
		try{
			getLenders(amount.value,apr.value,years.value,zipcode.value);
		}catch(e){
			//忽略异常
		}

		//最后，用图标展示贷款余额、利息和资产收益
		chart(principal,interest,monthly,payments);
	}else{
		//计算结果不是数字或者是无穷大，意味着输入数据是非法或不完整的
		//清空之前的输入数据
		payment.innerHTML='';
		total.innerHTML='';
		totalinterest.innerHTML='';
		chart();//不传入参数的话就是清除图标
	}
}

//将用户的输入保存至localStorage对象的属性中，这些属性在再次访问时还继续保持在原位置
//如果你在浏览器按照file：//URL的方式直接打开本地文件，在火狐的浏览器中无法使用存储功能
//通过http可以
function save(amount,apr,years,zipcode){
	if(window.localStorage){
		localStorage.loan_amount=amount;
		localStorage.loan_apr=apr;
		localStorage.loan_years=years;
		localStorage.loan_zipcode=zipcode;
	}
}


//在文档首次加载时，将会尝试还原输入字段
window.onload=function(){
	//如果浏览器支持本地存储并且上次保存的值是存在的
	if(window.localStorage&&localStorage.loan_amount){
		document.getElementById('amount')=localStorage.loan_amount;
		document.getElementById('apr')=localStorage.loan_apr;
		document.getElementById('years')=localStorage.loan_years;
		document.getElementById('zipcode')=localStorage.loan_zipcode;
	}
}


//将用户的输入发送至服务器端脚本（理论上）将返回一个本地放贷人的连接列表，在这里并没有实现
//但如果该服务存在，该函数会使用它

function getLenders(amount,apr,years,zipcode) {
	if(!window.XMLHttpRequest) return;

	//找到要显示放贷人列表的元素
	var ad=document.getElementById('lenders');
	if(!ad) return;

	//将用户的输入数据进行RURL编码，并作为查询参数附加在URl里
	var url='getLenders.php'+'?amt='+encodeURIComponent(amount)+
			'&apr='+encodeURIComponent(apr)+
			'&yrs='+encodeURIComponent(years)+
			'&zip='+encodeURIComponent(zipcode);

	var req=new XMLHttpRequest();
	req.open('GET',url);
	req.send(null);

	req.onreadystatechange=function(){
		if(req.readyState==4&&req.readyState==200){
			var response=req.responseText;
			var lenders=JSON.parse(response);

			//将数组中的放贷人对象转换为HTML字符串形式
			var list='';
			for (var i = 0; i < lenders.length; i++) {
				list+="<li><a href='"+lenders[i].url+"'>"+lenders[i].name+"</a></li>";
			}

			ad.innerHTML="<ul>"+list+"</ul>";
		}
	}
}



