
;(function($) {
	var startX = 0;
	var endX = 0;
	var num = 0;
	
	var ImageSwitch = function(el, opt) {
		this.$element = el,
		this.default = {
            images: [],		//图片
			speed:500,		//速度
			theme:"#999"	//当前图片标识样式
		},
		this.options = $.extend({}, this.default, opt);

		this.init();//初始化
	}
	
	ImageSwitch.prototype = {
		constructor: ImageSwitch,

		init: function() {
            this.renderHtml();
            this.bindEvent();
		},

        renderHtml: function() {

            var $previewBoxEl = $('<div></div>'),
				$pictureEl = $('<div></div>'),
				$pageFlagEl = $('<div></div>'),
				$ulEl = $('<ul></ul>'),
				images = this.options.images,
				len = images && images.length;

            $previewBoxEl.attr('id', 'previewBox');
            $pictureEl.attr('id', 'picture');
            $pageFlagEl.attr('id', 'pageFlag');

            for (var i=0; i<len; i++) {
                var $liEl = $('<li></li>');
                var $imgEl = $('<img></img>');
                $imgEl.attr('src', images && images[i]);
                $ulEl.append($liEl);
                $pictureEl.append($imgEl);
			}

            $pageFlagEl.append($ulEl);
            $previewBoxEl.append($pictureEl)
            $previewBoxEl.append($pageFlagEl);
            this.$element.append($previewBoxEl);

            this._setPageFlag(0);

            return this;
		},


		bindEvent: function() {
			var that = this;
            var n = this.options.images.length;

            this.$element.on("touchend", function(event) {
                event.preventDefault();

                endX =event.originalEvent.changedTouches[0].pageX;
                var x = endX - startX;


                if (x > 0) {
                    num--;
                    if (-1 == num) {
                        num=0;
                    }

                }else if(x < 0) {
                    (num)++;
                    if (n == num) {
                        num=0;
                    }
                }

                that.moveTo(num);

                return this;
            });


            this.$element.on("touchstart", function(event) {
                event.preventDefault();
                startX =event.originalEvent.changedTouches[0].pageX;
            });
        },

		moveTo: function(n) {

			var len = this.options.images && this.options.images;
			if (n < 0 || n >= len) {
				num = 0;
			}else {
                num = n;
			}

            var w = document.getElementById('previewBox').offsetWidth,
                s = this.options.speed;

			console.log('w', w);
            $("#picture").animate({left:-w * num}, s);
            this._setPageFlag(num);

            return this;
		},

		/*当前图片标识切换*/
		_setPageFlag : function(num) {
			var liList = $("#pageFlag").find("li");
			liList.removeClass("currentPage")
				.css("background-color", "#eee");

			liList.eq(num).addClass("currentPage");
            $(".currentPage").css("background-color", this.options.theme);

            return this;
		},
	};
	
	
	$.fn.imageSwitch = function(options) {
		return new ImageSwitch(this, options);
	}
})(jQuery);