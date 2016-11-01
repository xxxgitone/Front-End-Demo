window.onload = function() {
	if (!document.getElementsByClassName) {
		document.getElementsByClassName = function(cls) {
			var ret = [];
			var els = document.getElementsByTagName('*');
			for (var i = 0, len = els.length; i < len; i++) {
				if (els[i].className === cls || els[i].className.indexOf(cls + ' ') > 0 || els[i].className.indexOf(' ' + cls + ' ') > 0 || els[i].className.indexOf(cls + ' ') > 0) {
					ret.push(els[i]);
				}
			}
			return ret;
		}
	}

	var cartTable = document.getElementById('cartTable');
	var tr = cartTable.children[1].rows;
	var checkinputs = document.getElementsByClassName('check');
	var checkAllInputs = document.getElementsByClassName('check-all');
	var prices = document.getElementsByClassName('price');

	var selectedTotal = document.getElementById('selectedTotal');
	var priceTotal = document.getElementById('priceTotal');
	var selected = document.getElementById('selected');
	var foot = document.getElementById('foot');
	var selectedViewList = document.getElementById('selectedViewList');

	//计算总数
	function getTotal() {
		var selected = 0;
		var price = 0;
		var HTMLstring = '';
		for (var i = 0; i < tr.length; i++) {
			if (tr[i].getElementsByTagName('input')[0].checked) {
				tr[i].className = 'on';
				selected += parseInt(tr[i].getElementsByTagName('input')[1].value);
				price += parseFloat(prices[i].innerHTML);
				HTMLstring += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
			} else {
				tr[i].className = '';
			}
		}
		selectedTotal.innerHTML = selected;
		priceTotal.innerHTML = price.toFixed(2);
		selectedViewList.innerHTML = HTMLstring;

		if (selected == 0) {
			foot.className = 'foot';
		}
	}

	for (var i = 0; i < checkinputs.length; i++) {
		checkinputs[i].onclick = function() {
			if (this.className === 'check-all check') {
				for (var j = 0; j < checkinputs.length; j++) {
					checkinputs[j].checked = this.checked;
				}
			}

			if (this.checked == false) {
				for (var k = 0; k < checkAllInputs.length; k++) {
					checkAllInputs[k].checked = false;
				}
			}
			getTotal();
		}
	}

	selected.onclick = function() {
		if (foot.className == 'foot') {
			if (selectedTotal.innerHTML != 0) {
				foot.className = 'foot show';
			}
		} else {
			foot.className = 'foot';
		}
	}

	//事件代理，取消所选商品展示
	selectedViewList.onclick = function(event) {
		event = event || window.event;
		var el = event.target;//可以捕获当前事件作用的对象 w3c、IE
		if (el.className == 'del') { //span
			var index = el.getAttribute('index');
			var input = tr[index].getElementsByTagName('input')[0];
			input.checked = false;
			input.onclick();
		}
	}

}