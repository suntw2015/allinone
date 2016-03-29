<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link href="/css/bootstrap.min.css" rel="stylesheet">
	<link href="/css/admin.css" rel="stylesheet">
	<title>Forerer3</title>
</head>
<body>
	<div class="content">
		<div class="wrap-head"></div>
		<div class="main">
			<div class="main-left">
				<!-- left menu collapse -->
				<div class="panel-group">
					<div class="panel panel-default">
						<div class="panel-heading" id="collapseListGroupHeading1">
							<h4 class="panel-title">
								<a class="collapsed" role="button" data-toggle="collapse" href="#collapseListGroup1">
									七牛存储
								</a>
							</h4>
						</div>
						<div id="collapseListGroup1" class="panel-collapse collapse">
							<ul class="list-group">
								<li class="list-group-item"><a href="#">查看所有</a></li>
								<li class="list-group-item"><a href="#">管理文件</a></li>
							</ul>
						</div>
					</div>
				</div>
				<!--left menu collapse end-->
			</div>
			<div class="main-right">
				<div clas="main-right-content">
				<div class="buckets btn-group">
					<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
						<?php echo ($buckets[0]); ?><span class="caret"></span>
					</button>
					<ul class="dropdown-menu">
						<?php if(is_array($buckets)): foreach($buckets as $key=>$bucket): ?><li ><a href="#"><?php echo ($bucket); ?></a></li><?php endforeach; endif; ?>
					</ul>
				</div>
				<table class="table table-hover table-bordered table-striped">
					<thead>
						<tr>
							<th>文件名</th>
							<th>类型</th>
							<th>大小</th>
							<th>链接</th>
							<th>创建时间</th>
						</tr>
					</thead>
					<tbody>
						<?php if(is_array($files)): foreach($files as $key=>$file): ?><tr>
								<th><?php echo ($file['key']); ?></th>
								<th><?php echo ($file['mimetype']); ?></th>
								<th><?php echo ($file['fsize']); ?></th>
								<th><?php echo ($file['url']); ?></th>
								<th><?php echo ($file['createon']); ?></th>
							</tr><?php endforeach; endif; ?>
					</tbody>
				</table>

				<ul class="pagination">
					<li>
						<a href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					<?php $__FOR_START_10575__=1;$__FOR_END_10575__=$filelist['pagecount'];for($i=$__FOR_START_10575__;$i < $__FOR_END_10575__;$i+=1){ if($filelist['pageindex'] == $i): ?><li class="active"><a href="#"><?php echo ($i); ?></a></li>
						<?php else: ?>
							<li><a href="#"><?php echo ($i); ?></a></li><?php endif; } ?>
					<li>
						<a href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
				</div>
			</div>
		</div>
		<!--<footer>-->
		<!--</footer>-->
	</div>
	<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
	<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		$(document).resize(function(){
			var maxheight = $(".main-right").css("height");
			$(".main-left").css("height",maxheight);
		});
		$(document).ready(function(){
			var maxheight = $(".main-right").css("height");
			$(".main-left").css("height",maxheight);
		});
		$(".pagination").find("a").each(function(){
			$(this).on("click",function(){
				var indexpage = $(this).text();console.log(indexpage);
				indexpage = parseInt(indexpage);
				$.get(
						"/Api/Qiniu/filelist/",
						{"pageindex": indexpage+1,"pagesize":20},
						function(res){
							if(res.status == "success") {
								filelist_blind(".tbody",res.data);
								console.log("index"+res.data.pageindex);
								console.log("total"+res.data.pagecount);
							}else{
								alert("加载失败");
							}
						}
				);
			});
		});

		function filelist_blind(select,data){
			var files  = data.files;
			var pageindex = data.pageindex;
			var pagecount = data.pagecount;
			var totalcount = data.totalcount;
			var length = files.length;
			$(select).find("tr").empty();
			for(var i = 0;i<length;i++){
				var str= "<tr><th>"+files[i].key+"</th><th>"+files[i].mimetype+"</th><th>"+files[i].fsize+"</th><th>"+files[i].url+"</th><th>"+files[i].createon+"</th></tr>";
				$(str).appendTo($("select"));
			}

			$(".pagination").find("li").empty();

			str = '<li> <a href="#" aria-label="Previous"> <span aria-hidden="true">&laquo;</span> </a> </li>';
			$(str).appendTo($(".pagination"));
			if(pageindex == 1){
				$(str).addClass("disabled");
			}

			for(i=1;i<=pagecount;i++){
				str = '<li> <a href="#">'+i+'</span> </a> </li>';
				$(str).appendTo($(".pagination"));
				if(pageindex == i){
					$(str).addClass("active");
				}
			}
			str = '<li> <a href="#" aria-label="Next"> <span aria-hidden="true">&raquo;</span> </a> </li>';
			$(str).appendTo($(".pagination"));
			if(pageindex == pagecount){
				$(str).addClass("disabled");
			}
		}
	</script>
</body>
</html>