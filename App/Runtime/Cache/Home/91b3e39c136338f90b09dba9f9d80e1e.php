<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta property="wb:webmaster" content="7beb9c1c54cd593a" />
		<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
		<meta name="description" content="">
		<meta name="author" content="">

		<title>Group604</title>
		<!--<link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">-->
		<link href="/css/bootstrap.min.css" rel="stylesheet">
		<link href="/css/main.css" rel="stylesheet">
	</head>
	<body>
		<header class="navbar navbar-static-top">
			<div class="container">
				<ul class="nav navbar-nav">
					<li>
						<a href="#">导航1</a>
					</li>
					<li>
						<a href="#">导航1</a>
					</li>
					<li>
						<a href="#">导航1</a>
					</li>
					<li>
						<a href="#">导航1</a>
					</li>
					<li>
						<a href="#">导航1</a>
					</li>
					<li>
					</li>
				</ul>
				<form class="navbar-form navbar-right" role="search">
					<div class="input-group">
						<input type="search" class="form-control" placeholder="Search">
						<span class="input-group-btn">
							<button type="submit" class="btn btn-default">Go</button>
						</span>
					</div>
				</form>
			</div>
		</header>
		<div class="doc-head">
			<div class="container text-left">
				<div class="row">
					<div class="col-md-4 text-center">
						<h1>雨霖铃</h1>
					</div>
					<div class="col-md-8">
						<p>念去去 千里烟波 暮霭沉沉楚天阔</p>
						<p>多情自古伤离别 更那堪 冷落清秋节</p>
						<p>今宵酒醒何处 杨柳岸 晓风残月</p>
						<p>此去经年 应是良辰好景虚设</p>
						<p>便纵有千种风情 更与何人说</p>
					</div>
				</div>
			</div>
		</div>
		<div id="carouseltemp">
			<div class="container">
				<div class="carousel slide" id="carousel-generic" data-ride="carousel">
					<ol class="carousel-indicators">
						<li data-target="carousel-generic" data-slide-to="0" class="active" ></li>
						<li data-target="carousel-generic" data-slide-to="1"></li>
						<li data-target="carousel-generic" data-slide-to="2"></li>
					</ol>

					<div class="carousel-inner" role="listbox">
						<div class="item active">
							<img src="/images/2015-06-12 100054.jpg" alt="----">
						</div>
						<div class="item">
							<img src="/images/2015-06-12 100202.jpg" alt="----">
						</div>
						<div class="item">
							<img src="/images/2015-06-12 104523.jpg" alt="----">
						</div>
					</div>

					<a class="left carousel-control" href="#carousel-generic" role="button" data-slide="prev">
						<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						<span class="sr-only">Previous</span>
					</a>
					<a class="right carousel-control" href="#carousel-generic" role="button" data-slide="next">
						<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
						<span class="sr-only">Next</span>
					</a>
				</div>
			</div>
		</div>

		<div id="main">
			<div class="container">
				<h2>照片墙</h2>
				<div class="row image-wall">
					<?php if(is_array($imagelist['files'])): foreach($imagelist['files'] as $key=>$image): ?><div class="col-xs-6 col-md-3 image-wall-item">
							<div class="thumbnail">
								<img src="<?php echo ($image['smallurl']); ?>" alt="...." class="showpicture">
							</div>
						</div><?php endforeach; endif; ?>
				</div>
				<div class = "loadmore">
					<a role="button" class="btn btn-info abtn">加载更多...</a>
				</div>

				<h2>视频</h2>
					<embed src="http://player.youku.com/player.php/sid/XMzMwNDQzOTI4/v.swf" allowFullScreen="true" quality="high" width="100%" height ="600px" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
			    </div>
		</div>

		<footer class="doc-footer text-center">
			<div class="container">
				<p>
					The project is design by Tianwen.sun QQ:
					<a href="http://mail.qq.com" target="_blank">631884352@qq.com</a>
				</p>
				<p>
					You can find the source project in
					<a href="https://github.com/suntw2015/allinone" target="_blank">GitHub</a>
				</p>
				<ol class="text-mutid doc-footer-link">
					<li>链接1</li>
					<li>链接1</li>
					<li>链接1</li>
					<li>链接1</li>
					<li>链接1</li>
				</ol>
			</div>
		</footer>

		<!-- Mdoel Dialog -->
		<div class="modal fade" id="picturedialog">
			<div class="modal-dailog">
			<div class="modal-body">
				<div class="container">
					<img src="/images/test.jpg" height="800px" data-toggle="modal" data-target="#picturedialog">
				</div>
			</div>
			</div>
		</div>

		</div>

		<div id="backlayer">
			<div class="showdialog">
				<div class="image-bigshow">
					<img src="/images/2015-06-12 100054.jpg">
					<!--<div class="left-control"><span><</span></div>-->
					<!--<div class="right-control"><span>></span></div>-->
				</div>
				<!--load the small list view -->
				<!--<div class="image-smalllist">-->
					<!--<div class="image-smalllist-fram">-->
						<!--<div class="image-samlllist-item">-->
							<!--<img src="http://7xkkig.com1.z0.glb.clouddn.com/by2015IMG_1063.JPG?imageView2/1/w/240/h/160">-->
						<!--</div>-->
					<!--</div>-->
					<!--<div class="left-control"><span><</span></div>-->
					<!--<div class="right-control"><span>></span></div>-->
				<!--</div>-->
			</div>
		</div>

		<script src="/js/jquery.js"></script>
		<script src="/js/bootstrap.js"></script>

		<script type="text/javascript">
			$(".showpicture").click(function(){
				var srcurl = $(this).attr("src");
				srcurl = srcurl.substr(0,srcurl.indexOf("?"));
				$("#backlayer").css("height",window.screen.height);
				$(".image-bigshow").find("img").attr("src",srcurl);
				$("#backlayer").css("display","block");
				$("#backlayer").on("click.close",function(){$(this).css("display","none");$("body").css("overflow","scroll");});
// load the samll view list
//				$(".image-wall-item").find("img").each(function(){
//					var tmptpl = '<div class="image-samlllist-item"> <img src="http://7xkkig.com1.z0.glb.clouddn.com/by2015IMG_1063.JPG?imageView2/1/w/240/h/160"> </div>';
//					var temp = $(tmptpl).appendTo($(".image-smalllist-fram"));
//					$(temp).attr("src",$(this).attr("src"));
//				});

			});

			function createlayer(){
				$("#backlayer").css("height",window.screen.height);
				$("#backlayer").css("display","block");
				$("#backlayer").on("click.close",function(){$(this).css("display","none");$("body").css("overflow","scroll");});
				$(".image-wall-item").find("img").each(function(){
					var tmptpl = '<div class="image-samlllist-item"> <img src="http://7xkkig.com1.z0.glb.clouddn.com/by2015IMG_1063.JPG?imageView2/1/w/240/h/160"> </div>';
					var temp = $(tmptpl).appendTo($(".image-smalllist-fram"));
					$(temp).attr("src",$(this).attr("src"));
				});
			}

			var totalpage = <?php echo ($imagelist['pagecount']); ?>;
			var indexpage = <?php echo ($imagelist['pageindex']); ?>;

			if(indexpage==totalpage){
				$(".loadmore").attr("visibility","hidden");
			}

			$(".loadmore").find("a").click(function(e){
				if(indexpage<totalpage) {
					$.get(
							"/Api/Qiniu/imagelist/",
							{"pageindex": indexpage+1,"pagesize":10},
							function (res) {
								if (res.status == "success") {
									var fi = res.data;
									var length = res.data.files.length;

									totalpage = parseInt(res.data.pagecount);
									indexpage = parseInt(res.data.pageindex);console.log(indexpage,totalpage);

									if(indexpage==totalpage){
										$(".loadmore").css("visibility","hidden");
										console.log("hidden");
									}

									for(var i=0;i<length;i++) {
										var url = res.data.files[i].smallurl;
//										$item = $(".image-wall").append('<div class="col-xs-6 col-md-3 image-wall-item"><a href="#" class="thumbnail"><img src="" alt="...." class="showpicture"></a></div>').attr("src",url);
										var item = $('<div class="col-xs-6 col-md-3 image-wall-item"><div class="thumbnail"><img src="" alt="...." class="showpicture"></div></div>').appendTo($(".image-wall"));
										$(item).find("div").find("img").attr("src",url);
										$(item).find("div").find("img").on("click",function(){
											var srcurl = $(this).attr("src");
											srcurl = srcurl.substr(0,srcurl.indexOf("?"));
											$("#backlayer").css("height",window.screen.height);
											$(".image-bigshow").find("img").attr("src",srcurl);
											$("#backlayer").css("display","block");
											$("#backlayer").on("click.close",function(){$(this).css("display","none");$("body").css("overflow","scroll");});
// load the samll view list
//				$(".image-wall-item").find("img").each(function(){
//					var tmptpl = '<div class="image-samlllist-item"> <img src="http://7xkkig.com1.z0.glb.clouddn.com/by2015IMG_1063.JPG?imageView2/1/w/240/h/160"> </div>';
//					var temp = $(tmptpl).appendTo($(".image-smalllist-fram"));
//					$(temp).attr("src",$(this).attr("src"));
//				});
										})
									}
								}
								else {
									alert("加载失败");
								}
							})
				}
			});

		</script>
	</body>
</html>