//如果是在node环境中，通过require引入需要的类库，这里不需要引入
if(typeof module !=='undefined' && typeof exports ==='object'){
    // require('http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js');
}else{

}


;(function() {
	var startX = 0;
	var endX = 0;
	var num = 0;
	
	var ImageSwitch = function(opt) {
        var id = opt.id;
		this.element = id && document.querySelector('#'+id),
		this.default = {
            images: [],		//图片
			width:"320",	//图片宽度
			height:"190",	//图片高度
			speed:500,		//速度
			theme:"#999"	//当前图片标识样式
		},
		// this.options = $.extend({}, this.default, opt);
		this.options = this._extend(this.default, opt, true);

		this.init();//初始化
	}
	
	ImageSwitch.prototype = {
		constructor: ImageSwitch,

		init: function() {
            this.renderHtml();
            this.bindEvent();
		},

        renderHtml: function() {

            var frag = document.createDocumentFragment(),
            	previewBoxEl = document.createElement('div'),
				pictureEl = document.createElement('div'),
				pageFlagEl = document.createElement('div'),
				ulEl = document.createElement('ul'),
				images = this.options.images,
				len = images && images.length;

            previewBoxEl.setAttribute('id', 'previewBox');
            pictureEl.setAttribute('id', 'picture');
            pageFlagEl.setAttribute('id', 'pageFlag');

            for (var i=0; i<len; i++) {
                var liEl = document.createElement('li');
                var imgEl = document.createElement('img');
                imgEl.setAttribute('src', images && images[i]);
                ulEl.appendChild(liEl);
                pictureEl.appendChild(imgEl);
			}

            pageFlagEl.appendChild(ulEl);
            previewBoxEl.appendChild(pictureEl)
            previewBoxEl.appendChild(pageFlagEl);

            this.element.appendChild(previewBoxEl);
            this._setPageFlag(0);

            return this;
		},


		bindEvent: function() {
            var that = this,
            	w = this.options.width,
            	s = this.options.speed,
            	n = this.options.images.length,
            	theme = this.options.theme;

            this.element.addEventListener('touchend', function(event) {
                event.preventDefault();

                endX =event.changedTouches[0].pageX;
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
            }, false)


            this.element.addEventListener('touchstart', function(event) {
                event.preventDefault();
                startX =event.changedTouches[0].pageX;
                return this;
            }, false)
        },

		/*当前图片标识切换*/
		_setPageFlag : function(num) {
		    var liList = document.querySelectorAll('#pageFlag li');

            liList && liList.forEach(function(item, i) {
                liList[i].classList.remove('currentPage');
                liList[i].style.backgroundColor = '#eee';
            })

            liList[num].classList.add("currentPage");
            document.querySelector('.currentPage').style.backgroundColor = this.options.theme;

            return this;
		},

        _extend : function(def, options, override) {
            for (var key in options){
                if (options.hasOwnProperty(key) && (!def.hasOwnProperty(key) || override)) {
                    def[key]=options[key];
                }
            }

            return def;
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

            document.querySelector('#picture').style.left = -w * num+'px';
            // $("#picture").css({'left': -w * num});
            this._setPageFlag(num);

            return this;
        },
	};


    //兼容模块
    if(typeof module !=='undefined' && typeof exports ==='object'){
        module.exports=ImageSwitch;
    }else if(typeof define ==='function' && (define.amd || define.cmd)){
        define(function(){
            return ImageSwitch;
        })
    }else{
        var _global = (function(){ return this || (0, eval)('this'); }());
        !('imageSwitch' in _global) && (_global.ImageSwitch=ImageSwitch);
    }

})();
