define(['jquery'], function($) {
	function ScrollTo(opts) {
		//如果传入参数就替代默认的参数
		this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
		this.$el = $('html,body');
	}

	ScrollTo.DEFAULTS = {
		dest: 0,
		speed: 300,
	}

	ScrollTo.prototype.move = function() {
		var opts = this.opts;

		if ($(window).height() != opts.dest) {
			if (!this.$el.is(':animated')) {
				this.$el.animate({ //滚动条的基于位置不一样
					scrollTop: opts.dest,
				}, opts.speed);
			}
		}
	};

	ScrollTo.prototype.go = function() {
		var opts=this.opts;
		if ($(window).height() != opts.dest) {
			this.$el.scrollTop(opts.dest);
		}
	}

	return {
		ScrollTo: ScrollTo
	}

})