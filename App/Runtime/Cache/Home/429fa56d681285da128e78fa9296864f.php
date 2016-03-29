<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
	<meta name="description" content="">
	<meta name="author" content="">

	<title>导航入口</title>
	<link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
	<link href="/css/main.css" rel="stylesheet">
</head>
<body>

	 <!--player_bar-->
	<div id="player_bar">
		<div class="container">
			<div class="player_control">
				<div class="player_control_pre btn btn-default"><span class=" glyphicon glyphicon-fast-backward"></span></div>
				<div class="player_control_play btn btn-default"><span class="glyphicon glyphicon-pause"></span></div>
				<div class="player_control_next btn btn-default"><span class="glyphicon glyphicon-fast-forward"></span></div>
			</div>
			<div class="player_info label">There is nothing can stop me.</div>

			<div class="dropdown navbar-right">
				<button class="btn btn-default dropdown-toggle" type="button" id="player_list" aria-haspopup="true" aria-expanded="true" data-toggle="dropdown">
					<span class="glyphicon glyphicon-list"></span>
				</button>
				<ul class="dropdown-menu" aria-labelledby="player_list">
				</ul>
			</div>

		</div>
	</div>
	<!-- main container -->
	<div class="container">
		<!--<?php if(is_array($songs)): foreach($songs as $key=>$song): ?>-->
				<!--<div class="panel panel-success">-->
					<!--<div class="panel-head"><?php echo ($song["song_name"]); ?>-<?php echo ($song["singer_name"]); ?></div>-->
						<!--<div class="panel-body">-->
							<!--<?php if(is_array($song['audiolist'])): foreach($song['audiolist'] as $key=>$audio): ?>-->
							<!--<audio src="<?php echo ($audio['url']); ?>" controls="controls"></audio><span><?php echo ($audio['type_description']); ?></span>-->
						<!--<?php endforeach; endif; ?>-->

							<!--<?php if(($song['videolist'])): ?>-->
								<!--<?php if(is_array($song['videolist'])): foreach($song['videolist'] as $key=>$video): ?>-->
									<!--<video src="<?php echo ($video['url']); ?>" controls="controls" class="block"><span><?php echo ($video['type_description']); ?></span></video>-->
								<!--<?php endforeach; endif; ?>-->
							<!--<?php endif; ?>-->
						<!--</div>-->
				<!--</div>-->
		<!--<?php endforeach; endif; ?>-->

		<div class="panel panel-info">
			<div class="panel-heading">Song</div>
			<div class="panel-body">
				<audio src="" controls="controls"></audio>
				<table class="table table-border table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Singer</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
					<?php if(is_array($songs)): foreach($songs as $key=>$song): ?><tr>
							<th><?php echo ($song['songname']); ?></th>
							<th><?php echo ($song['singername']); ?></th>
							<th>
								<div class="row col-md-9">
										<div class="col-md-3">
											<a role="button" class="btn btn-primary"  audiourl="<?php echo ($song['url']); ?>">Play</a>
										</div>
									<a role="button" id="btnadd" class="btn btn-default navbar-right" data-href="<?php echo ($audio['url']); ?>" data-name="<?php echo ($song['song_name']); ?> - <?php echo ($song['singer_name']); ?>">Add</a>
								</div>
							</th>
						</tr><?php endforeach; endif; ?>
					</tbody>
				</table>

				<video src="" controls="controls"></video>
				<table class="table table-boder table-hover">
					<thead>
						<tr>
						<td>Name</td>
						<td>Singer</td>
						<td>Type</td>
						</tr>
					</thead>
					<tbody>
					<?php if(is_array($songs)): foreach($songs as $key=>$song): if(($song['videolist'])): ?><tr>
							<th><?php echo ($song['song_name']); ?></th>
							<th><?php echo ($song['singer_name']); ?></th>
							<th>
								<div class="row">
									<?php if(is_array($song['videolist'])): foreach($song['videolist'] as $key=>$video): ?><div class="col-md-3">
											<a role="button" class="btn btn-primary"  videourl="<?php echo ($video['url']); ?>"><?php echo ($video['type_description']); ?></a>
										</div><?php endforeach; endif; ?>
								</div>
							</th>
						</tr><?php endif; endforeach; endif; ?>
					</tbody>
				</table>
			</div>
		</div>

		<ul class="pagination">
			<li>
				<a href="#" aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<?php $__FOR_START_18420__=1;$__FOR_END_18420__=$songs['count'];for($i=$__FOR_START_18420__;$i < $__FOR_END_18420__;$i+=1){ if(($songs[index] == $i)): ?><li class="active"><a href="#"><?php echo ($i); ?></a> </li>
				<?php else: ?>
					<li><a href="#"><?php echo ($i); ?></a> </li><?php endif; } ?>
			<li>
				<a href="#" aria-label="Next">
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>

	</div>


	<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
	<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<script src="/js/jQuery_1.js"></script>
	<script src="/js/entry.js"></script>

	<script type="text/javascript">
		$("a[audiourl]").click(function () {
			var url = $(this).attr("audiourl");
			$("audio").attr("src",url);
			var audio =$("audio")[0];
			audio.play();
		});

		$("a[videourl]").click(function () {
			var url = $(this).attr("videourl");
			$("video").attr("src",url);
			var audio =$("video")[0];
			audio.play();
		});

		$("a#btnadd").click(function(){
			var mhref = $(this).data("href");
			var mname = $(this).data("name");
			$("#player_bar").player_bar("add",{"href":mhref,"name":mname});
		});

//		$("ul.dropdown-menu").on("click", "[data-stopPropagation]", function(e) {
//			e.stopPropagation();
//		});

		$("dropdown-menu").click(function(){
			console.log("a");
		});

	</script>
</body>
</html>