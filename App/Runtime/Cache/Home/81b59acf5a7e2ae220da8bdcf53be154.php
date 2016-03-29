<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
	<meta name="description" content="">
	<meta name="author" content="">

	<title>Starter Template for Bootstrap</title>
	<link href="/css/bootstrap.min.css" rel="stylesheet">
	<link href="/css/main.css" rel="stylesheet">

	<style type="text/css">
	.divfram{
		position: relative;
		width:100%;
		height:600px;
		background-color: #ccc;
	}

	.heng{
		position: absolute;
		bottom: 0;
		height: 10px;
		/*background-color: #5bc0de;*/
	}

	.scrollh{
		position: absolute;
		bottom: 1px;
		left: 0;
		height: 8px;
		background-color: #660000;
		border-radius: 5px;
	}
	.scrollh:hover{
		background-color: #aa0000;
	}

	.shu{
		position: absolute;
		width: 10px;
		right: 0;
		/*background-color: #d0e9c6;*/
	}

	.scrolls{
		position: absolute;
		width: 8px;
		right: 1px;
		top: 0;
		background-color: #660000;
		border-radius: 5px;
	}

	.scrolls:hover{
		background-color: #aa0000;
	}
	</style>
</head>
<body>
	<div class="container">
		<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" data-title="Tooltip on left" data-content="aaaaa">Test</button>
		<p class="ppp">1</p>

		<div class="divfram">

		</div>
	</div>

	<!--<script src="/js/jquery-2.1.4.min.js"></script>-->
	<script src="/js/jquery.js"></script>
	<!--<script src="/js/bootstrap.min.js"></script>-->
	<!--<script src="/js/jQuery_1.js"></script>-->
	<!--<script src="/js/group604.js"></script>-->

<script type="text/javascript">

		var divframs = document.getElementsByClassName("divfram");
		for(var i=0;i<divframs.length;i++) {
			ele =divframs[i];

			var divheight = ele.offsetHeight;
			var divwidth = ele.offsetWidth;

			var scrollh = document.createElement("div");
			scrollh.className = 'heng';
			scrollh.style.width = divwidth-10 + 'px';
			var scrolls = document.createElement("div");
			scrolls.className = 'shu';
			scrolls.style.height = divheight-10 + 'px';

			var scrollhbar = document.createElement("div");
			scrollhbar.className ='scrollh';
			scrollhbar.style.width = 1/10*divwidth + 'px';

			var scrollsbar = document.createElement("div");
			scrollsbar.className = 'scrolls';
			scrollsbar.style.height = 1/10*divheight + 'px';

			ele.appendChild(scrollh);
			scrollh.appendChild(scrollhbar);
			ele.appendChild(scrolls);
			scrolls.appendChild(scrollsbar);

			scrollhbar.addEventListener("mousedown",function(e){
				var flag = true;
				var x = e.clientX;
				var that = this;
				document.onmousemove = function(e){
					if(!flag)
						return;
					var xx = e.clientX;

					var disx = xx - x;console.log("disx"+disx);

					var maxleft = that.offsetLeft;
					var parentwidth =that.parentNode.offsetWidth;
					if(isNaN(parentwidth) || parseInt(parentwidth)<0){
						parentwidth = 0;
					}
					var maxright= parentwidth - that.offsetWidth - that.offsetLeft;

					if(disx>0){
						disx = Math.min(disx,maxright);
					}else{
						disx = -Math.min(Math.abs(disx),maxleft);
					}

					var left = parseInt(that.style.left);console.log(left);

					if(isNaN(left) || left <=0){
						left =0;
					}

					that.style.left = maxleft + disx + 'px';
					x=xx;
					e.preventDefault();

				};

				document.onmouseup = function(e){
					flag =false;
				}
			});

			scrollsbar.addEventListener("mousedown",function(e){
				var flag = true;
				var y = e.clientY;
				var that = this;
				document.onmousemove = function(e){
					if(!flag)
						return;
					var yy = e.clientY;

					var disx = yy - y;console.log("disx"+disx);

					var maxtop = that.offsetTop;
					var parentheight =that.parentNode.offsetHeight;
					if(isNaN(parentheight) || parseInt(parentheight)<0){
						parentheight = 0;
					}
					var maxbottom= parentheight - that.offsetTop - that.offsetHeight;

					if(disx>0){ 
						disx = Math.min(maxbottom,disx);
					}else{
						disx = -Math.min(Math.abs(disx),maxtop);
					}

					var top = parseInt(that.style.top);console.log(top);

					if(isNaN(top) || top <=0){
						top =0;
					}

					that.style.top = maxtop + disx + 'px';
					y=yy;
					e.preventDefault();

				};

				document.onmouseup = function(e){
					flag =false;
				}
			})
		}


</script>
</body>
</html>