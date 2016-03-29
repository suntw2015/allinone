/**
 * Created by Administrator on 2015/6/29.
 */

(function(){
	var height = screen.availHeight;
	var width  = screen.availWidth;

	var abody = document.getElementById("main");
	abody.style.height = height + "px";
	//abody.style.backgroundColor = "#000000";
	//document.body.clientHeight ="2000 px";

	//test call function

	function print(){
		alert(this.type + " "+ this.value);
	}

	var aa = {
		type:"string",
		value: 1
	};

	var bb ={
		type: "int",
		value: 2
	};

	function testfunction(event){
		alert(event.type);
	}

	function addEvent(eventtype,functionname){
		if(this.addEventListener) {
			this.addEventListener(eventtype, functionname);
		}else{
			alert("not support addEventListener");
		}
	}


	var divplayer = document.getElementById("player");
	//addEvent.call(divplayer,"click",testfunction);

	obj = {
		name:"aa",
		age:12,
		getName:function(){return this.name;}
	};

	//li and tr single/double line's background-color
	$("table").css("border","1px solid black","width","500px");
	$("table tr").css("display","block");
	$("table tr:even").click(function(e){
		//var va=$(e.target);
		//content="";
		//for(key in e.target.attr){
		//	content += key + ":\n" ;
		//}
		//alert(content);
		if($(e.target).hide){
			$(e.target).show();
		}else{
			$(e.target).hide();
		}
	});
	$("table tr:even").css("background-color","gray");

	function dump(){
		var content="";
		for(key in this){
			content += key + ":" +this.key+"\n";
		}
		alert(content);
	}

	//tab标签
	$(".tab").click(function(event){
		$(event.target).addClass("tab-click");
		var index=0;
		var presiblings=$(event.target).prevAll().toArray();
		for(pre in presiblings){index++;}
		$(".tab .p").eq(index).show();

		$(event.target).siblings().removeClass("tab-click");
	});

	$(".pbox:first").show();
	$(".pbox:gt(0)").hide();

	//创建遮罩层
	$("#bttest").click(function(){
		var layer = document.createElement("div");
		layer.style.width= screen.availWidth+"px";
		layer.style.height = screen.availHeight+"px";
		layer.style.position = "fixed";
		layer.style.top = layer.style.left = 0;
		layer.style.background = "#0000ff";
		layer.style.zIndex= "999";
		layer.style.opacity = "0.5";
		var newele=document.body.appendChild(layer);

		var box = document.createElement("div");
		box.setAttribute("class","box");
		newele.appendChild(box);
	});

})();