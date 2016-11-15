var eg = {};
eg.$ = function(id) {
	return document.getElementById(id);
};

//定义一个公共函数来解决事件监听
eg.addListener=function(target,type,handler){
	if(target.addEventListener){
		target.addEventListener(type,handler,false);
	}else if(target.attachEvent){
		target.attachEvent('on'+type,handler);
	}else{
		target['on'+type]=handler;
	}
}

eg.regCheck = function() {
	var uid = eg.$('userid');
	var upwd = eg.$('userpwd');
	var upwd2 = eg.$('userpwd2');
	if (uid.value == '') {
		alert('账户名不能为空！');
		eg.err();
		return false;
	}
	if (upwd.value == '') {
		alert('密码不能为空！');
		eg.err();
		return false;
	}
	if (upwd2.value != upwd.value) {
		alert('两次输入的密码不一样');
		eg.err();
		return false;
	}

	var about=eg.$('about');
	if(about.value.length>60){
		alert('简介过长');
		eg.err();
		return false;
	}

	var age=eg.$('age');
	if(age.value=='0'){
		alert('请选择年龄段');
		eg.err();
		return false;
	}

	var likes=document.getElementsByClassName('like');
	var likeNum=0;
	for (var i = 0; i < likes.length; i++) {
		if(likes[i].checked){
			likeNum++;
		}
	}
	if(likeNum==0){
		alert('请至少输入一个爱好');
		eg.err();
		return false;
	}

	//邮箱验证
	var email=eg.$('email');
	if(!/^[A-Za-z\d]+[A-Za-z\d\-\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/.test(email.value)){
		alert('请输入正确邮箱');
		email.focus();
		eg.err();
		return false;
	}

	return true;
}

//添加交互事件
eg.addEvent=function(){
	var pwd=eg.$('userpwd');
	eg.addListener(pwd,'keyup',function(){
		var lv=0;
		if(/^\d{4,}$/.test(pwd.value)){
			lv=10;
		}else if(/^\w{6,}$/.test(pwd.value)){
			lv=25;
		}else if(/^[\d\w]{10,}$/.test(pwd.value)){
			lv=50;
		}else if(/^[\d\w~!@#$%\^&*\(\)\-{\[\]}=<>,\.\?\/]{13,}$/.test(pwd.value)){
			lv=100;
		}

		eg.$('pwdLv').style.width=lv+'px';
	})
}

eg.addEvent();

//出错时记录次数
eg.err=function(){
	var el=eg.$('errnum');
	var old=el.value;
	el.value=parseInt(old)+1;
	eg.lock();  //用来检测是否应该锁定
}

//通过次数判断是否要锁定账户
eg.lock=function(){
	var err=eg.$('errnum');
	if(parseInt(err.value)>2){
		eg.$('regBtn').disabled=true;
		eg.$('regUnlock').style.display='block';
	}
}

eg.unlock=function(){
	eg.$('regBtn').disabled=false;
	eg.$('regUnlock').style.display='none';
}