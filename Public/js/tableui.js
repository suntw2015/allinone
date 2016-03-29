/**
 * Created by tianwen on 2015/7/27.
 */

!function($,window,undefine){
	$.fn.tableui = function(options){
		var defaults = {
			oddClass:"table-odd",
			evenClass:"table-even",
			activeClass:"table-active"
		};

		var option = $.extend({},defaults,options);

		this.each(function(){
			var that = this;
			$(that).find("tr:even").addClass(option.evenClass);
			$(that).find("tr:odd").addClass(option.oddClass);
			$(that).find("tr").on("mouseover",option.activeClass);
			$(that).find("tr").on("mouseout",function(){$(this).removeClass(option.activeClass)});
		});
	};
}(window.jQuery,window);