/**
 * Created by Administrator on 2015/7/16.
 */

/* =================================================================
	test tooltip

   ================================================================= */

!function($,window,undefined){
	var tishi = function(ele,opt){
		return this.init("tishi",ele,opt);
	};

	tishi.prototype={
		construct:tishi,
		init:function(type,ele,opt){alert("construct");},
		show:function(){
			var that = this,
				e= $.Event("show");

			if(this.isShow || e.isDefaultPrevented()){
				return;
			}

			this.isShow = true;

		},
		mout:function(){
			$(this).css("color","black");
		},
		menter:function(){
			$(this).css("color","red");
		},
		mclick:function(){
			$(this).closest("[data-type=myTooltip]").find("[data-toggle=body]").toggleClass("color");
		}
	};

	$.fn.tishi = function(option){

		var obj = new tishi(this,option);
		obj.init();
		return this;
	};

	$.fn.tishi.Constructor = tishi;

	//默认配置
	$.fn.tishi.default = {
		placement : "under",
		selector : false,
		temp : '<div class="tishi">Test Tishi</div>',
		trigger: 'hover focus',
		title : '',
		html : false,
		container : false
	};

	$("[data-type=myTooltip]").find("[data-toggle=controller]").on("click",tishi.prototype.mclick);
	$("[data-type=myTooltip]").on("mouseenter",tishi.prototype.menter);
	$("[data-type=myTooltip]").on("mouseleave",tishi.prototype.mout);

}(window.jQuery,window);


!function($){
	$.fn.fun = function(options){
		//在外层中this是包装后的对应dom元素的jQuery对象
		var set = {
			"color"     : "red",
			"fontSize"  : "12px"
		};

		var setting = $.extend({},set,options);
		this.css({
			"color":setting.color,
			"fontSize":setting.fontSize
		});
		this.each(function(){
			//在each方法中this为对应的dom元素，如果需要使用对应的jQuery对象，应该使用$(this)
			$(this).text($(this).attr("data-content"));
		});
	};
}(window.jQuery);

!function($){

		var mytooltip = function(element,options){

			this.defaults={
				animation:true,
				placement:"top",
				template:"<div class='mytooltip'>test</div>"
			};

			this.$element =element;
			this.options = $.extend({},this.defaults,options);

			this.init(element,this.options);
		};

		mytooltip.defaults= {
			animation:true,
			placement:"right",
			template:"<div class='mytooltip'>test</div>"
		};

		mytooltip.prototype = {

			init:function(element,options){
				console.log("init");
				$element = $(element);
				$element.on("mouseenter", $.proxy(this.enter,this));
				$element.on("mouseleave", $.proxy(this.leave,this));
			},
			enter: function(){
				var $tip=$(this.defaults.template);
				var content = $(this.$element).data("mytooltip");

				pos = $(this.$element).offset();
				//actualwidth = $tip.offsetWidth;
				//actualheight = $tip.offsetHeight;

				switch (this.options.placement){
					//case "top":
					//	$tip.css("top",pos.top-actualheight);
					//	break;
					case "bottom":
						$tip.css({"top":pos.top+pos.height});
						break;
					//case "left":
					//	$tip.css("top",pos.top,"left",pos.left-autulwidth);
					//	break;
					case "right":
						$tip.css({"top":pos.top,"left":pos.right});
						break;
				};
				$tip.insertAfter(this).css("display","block").text(content);
			},
			leave: function(){
				$(this).next(".mytooltip").remove();
			}
		};


		$.fn.mytooltip = function(options){
			var mytoosltip = new mytooltip(this,options);
		};

		//自动入口
		$("[data-mytooltip]").each(function(){
			$(this).mytooltip();
		})

}(window.jQuery);

