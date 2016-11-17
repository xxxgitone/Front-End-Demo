define(['jquery', 'scrollTo'], function($,scrollTo) {
	function BackTop(el, opts) {
		this.opts = $.extend({}, BackTop.DEFAULES, opts);
		this.$el = $(el);

		this.scroll = new scrollTo.ScrollTo({
			dest: 0,
			speed: this.opts.speed,
		})

		if(this.opts.mode=='move'){
			this.$el.on('click', $.proxy(this._move, this));
		}else{
			this.$el.on('click', $.proxy(this._go, this));
		}
		
		this._checkPosition();
		$(window).on('scroll', $.proxy(this._checkPosition, this));
	}

	BackTop.DEFAULES = {
		mode: 'move',
		pos: $(window).height(),
		speed: 300,
	}

	BackTop.prototype._move = function() {
		this.scroll.move();
	};

	BackTop.prototype._go = function() {
		this.scroll.go();
	};

	BackTop.prototype._checkPosition = function() {
		var el = this.$el;
		if ($(window).scrollTop() > this.opts.pos) {
			el.fadeIn();
		} else {
			el.fadeOut();
		}
	};

	//插件
	$.fn.extend({
		backTop:function(opts){
			this.each(function(){//遍历所取到的元素
				new BackTop(this,opts);
			})
		}
	})

	return {
		BackTop:BackTop
	}

})