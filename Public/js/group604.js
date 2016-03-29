/**
 * Created by tianwen on 2015/7/29.
 */
+ function($){
	'use strict';

	//TOOLTIP PUBLIC CLASS DEFINTION
	//==============================

	var Tooltip = function(element,options){
		this.type       = null;
		this.options    = null;
		this.enabled    = null;
		this.timeout    = null;
		this.hoverState = null;
		this.$element   = null;
		this.inStatus   = null;

		this.init('tooltip',element,options);
	};

	Tooltip.version = '1.0.0';

	Tooltip.transition_duration = 100;

	Tooltip.prototype.default = {
		animation   : true,
		placement   : 'bottom',
		selector    : false,
		template    : '<div class="tooltip"><div class="tooltip-tile"></div><div class="tooltip-content"></div></div>',
		trigger     : '',
		title       : '',
		content     : '',
		delay       : Tooltip.transition_duration,
		html        : false,
		container   : false
	};

	Tooltip.prototype.init = function(type,element,options){
		this.enabled    = true;
		this.type       = type;
		this.$element   = $(element);
		this.options    = $.extend({},options,this.default);

		//todo focus,leave

		this.$element.on("mouseenter.show", $.proxy(this.show,this));
		this.$element.on("mouseenter.show2",function(){console.log("enter");});
		this.$element.on("mouseleave",$.proxy(this.hide,this));
		this.$element.on("mouseleave",function(){console.log("leave")});
		this.$element.on("click",function(e){console.log("dddd");e.preventDefault();});
		var tt = this.$element;
	};

	Tooltip.prototype.setContent = function(content){
		content = content || '';
		this.contetn = content || this.$element.data("content");
	};

	Tooltip.prototype.setTitle = function(title){
		title = title || '';
		this.title = title || this.$element.data("title");
	};

	Tooltip.prototype.setPlacement = function (placement) {
		placement = placement || '';
		this.placement = placement || this.$element.data("palcement");
	};

	Tooltip.prototype.hide = function(){
		console.log("hidden");
		var $el = this.$element;
		var $tip = $el.find('.tooltip');
		if($tip.css('visibility') != 'hidden'){
			$tip.css('visibility','hidden');
		}
	};

	Tooltip.prototype.show = function(){
		var val = $(".ppp").text();
		$(".ppp").text(parseInt(val)+1);

		var title       = this.title,
			content     = this.content,
			template    = this.template,
			placement   = this.placement,
			animation   = this.animation,
			delay       = this.delay,
			$el         = this.$element,
			$tip;

		if($tip = $el.find('.tooltip')) {
			$tip = $(template).insertAfter($el);
		}
		$tip.find(".tooltip-title").text(title);
		$tip.find(".tooltip-content").text(content);

		var tipHeight       = $tip.offsetHeight,
			tipWidth        = $tip.offsetWidth,
			parentHeight    = $el.offsetHeight,
			parentWidth     = $el.offsetWidh,
			parentX         = $el.offset().top,
			parentY         = $el.offset().left;

		switch (placement){
			case 'top':
				$tip.css({'left':parentX,'top':parentY-tipHeight});
				break;
			case 'bottom':
				$tip.css({'left':parentX,'top':parentY+parentHeight});
				break;
			case 'left':
				$tip.css({'left':parentX-tipWidth,'top':parentY});
				break;
			case 'right':
				$tip.css({'left':parentX+parentWidth,'top':parentY});
				break;
			default:
				break;
		}

		$tip.css('visibility','visible');
	};

	function Plugin(options){
		return $(this).each(function(){
			var $this = $(this);
			var data  = $this.data('itooltip');

			if(!data){
				$this.data('itooltip',(data =new Tooltip(this,options)));
			}
		});
	}

	$.fn.tooltip = Plugin;
	$.fn.tooltip.Constructor = Tooltip;


	$(document).on('click.tooltip','[data-toggle="tooltip"]',function(){
		console.log("sss");
		var $this =$(this);
		var options;
		Plugin.call(this,options);
	});


}(window.jQuery);

+ function($){
	'use strict';

	var superdiv = function(el,options){
		this.$element = $(el);
		this.options  = $.extend({},superdiv.defaults,options);

		this.init(this.$element,this.options);
	};

	superdiv.defaults = {
		'showhorizontal'    : true,
		'showvertical'      : true,
		'horizontalclass'   : 'superdiv-horizontal',
		'horizontalactive'  : 'superdiv-horizontalactive',
		'verticalclass'     : 'superdiv-horizontal',
		'verticalactive'    : 'superdiv-horizontalactive'
	};

	superdiv.prototype.init = function($el,$options){
		$el.css('overflow-y','hidden').css('overflow-x','hidden');
	};

	superdiv.prototype.getSize = function($el){
		var height = $el.offsetHeight,
			width  = $el.offsetWidth,
			x      = $el.offset().top,
			y      = $el.offset().left;

		return {'x':x,'y':y,'height':height,'width':width}
	};

	superdiv.prototype.getTotalSize = function($el){
		var height = 0,
			width  = 0;

		$el.children().each(function (){
			height = height + $(this).offsetHeight;
		})
	};
}();