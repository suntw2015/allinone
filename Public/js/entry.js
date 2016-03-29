/**
 * Created by Administrator on 2015/7/20.
 */

//!function ($) {
//	var player_bar = function(element,options){
//
//
//		var $element =$(element);
//		this.options = $.extend({},this.defaults,options);
//		this.$pre = $element.find(".player_control_pre").find(".glyphicon");
//		this.$play = $element.find(".player_control_play").find(".glyphicon");
//		this.$next = $element.find(".player_control_next").find(".glyphicon");
//		this.$info = $element.find(".player_info");
//		//this.$list = $element.find("#player_list").find(".glyphicon");
//
//		this.$list = $element.find("#player_list").next("ul");
//
//		this.init(element,this.options);
//	};
//
//	player_bar.prototype = {
//
//		init:function(element,options){
//
//			this.$play.on("click", $.proxy(this.play,this));
//			this.$pre.on("click", $.proxy(this.pre,this));
//			this.$next.on("click", $.proxy(this.nex,this));
//
//			//this.$list.on("click", $.proxy(this.list,this));
//		},
//
//		play:function(){
//			this.status = this.status || "pause";
//
//			if(this.status == "pause"){
//				this.status = "play";
//				this.$play.removeClass("glyphicon-pause").addClass("glyphicon-play");
//			}else{
//				this.status = "pause";
//				this.$play.removeClass(" glyphicon-play").addClass("glyphicon-pause");
//			}
//		},
//
//		list:function(){
//			var list = list || "close";
//			var template="<div class='player_list_box'></div>";
//
//			if(this.list == "close"){
//				this.list = "open";
//				console.log("open");
//				$(template).insertAfter(this.$list).css("display","block");
//			}else{
//				this.list = "close";
//				console.log("close");
//				this.$list.next(".player_list_box").remove();
//			}
//		},
//		addli:function(str){
//			var listtemplate = '<li><a href="#">1</a></li>';
//			$(listtemplate).find("a").attr("href",str.href).text(str.name).insertChildAfter(this.$list) ;
//			$(listtemplate).insertChildAfter(this.$list);
//		}
//	};
//
//
//
//	$.fn.player_bar = function(options){
//		var playerbar = new player_bar(this,options);
//	};
//
//	//自动入口
//	$("#player_bar").each(function(){
//		$(this).player_bar();
//	})
//}(window.jQuery);


/**
 * Created by Administrator on 2015/7/20.
 */

!function ($) {

	var methods = {

		init:function(element,options){

			var $element =$(element);
			this.options = $.extend({},this.defaults,options);
			this.$pre = $element.find(".player_control_pre").find(".glyphicon");
			this.$play = $element.find(".player_control_play").find(".glyphicon");
			this.$next = $element.find(".player_control_next").find(".glyphicon");
			this.$info = $element.find(".player_info");

			this.$list = $element.find("#player_list").next("ul");

			this.$play.on("click", $.proxy(this.play,this));
			this.$pre.on("click", $.proxy(this.pre,this));
			this.$next.on("click", $.proxy(this.nex,this));

		},

		play:function(){
			this.status = this.status || "pause";

			if(this.status == "pause"){
				this.status = "play";
				this.$play.removeClass("glyphicon-pause").addClass("glyphicon-play");
			}else{
				this.status = "pause";
				this.$play.removeClass(" glyphicon-play").addClass("glyphicon-pause");
			}
		},

		list:function(){
			var list = list || "close";
			var template="<div class='player_list_box'></div>";

			if(this.list == "close"){
				this.list = "open";
				console.log("open");
				$(template).insertAfter(this.$list).css("display","block");
			}else{
				this.list = "close";
				console.log("close");
				this.$list.next(".player_list_box").remove();
			}
		},
		add:function(str){
			var listtemplate = '<li><a data-stopPropagation="true" data-href=' + str.href +'>' + str.name +'</a></li>';
			var ul=$(this).find("#player_list").next("ul").append(listtemplate);
		}
	};



	$.fn.player_bar = function(){
		var method =arguments[0];

		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		}else if(typeof method == "object" || !method){
			method = methods.init;
		}else{
			return this;
		}

		return method.apply(this,arguments);
	};

	//自动初始化组件
	$("#player_bar").each(function(){
		methods.init(this);
	})
}(window.jQuery);