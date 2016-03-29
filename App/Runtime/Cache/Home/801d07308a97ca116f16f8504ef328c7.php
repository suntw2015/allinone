<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link href="/css/bootstrap.min.css" rel="stylesheet">

	<title>All In One</title>

</head>
<body>

	<div class="page-header"><h1>All Things Are Here</h1></div>
	<div class="main">
		<div class="container">
			<ul class="nav nav-tabs">
				<li class="active">
					<a href="#music" data-toggle="tab">Music</a>
				</li>
				<li><a href="#video" data-toggle="tab">Video</a></li>
				<li><a href="#douyu" data-toggle="tab">douyu</a></li>
			</ul>

			<div class="tab-content">
				<div class="tab-pane fade in active" id="music">
					<table class="table table-bordered table-striped table-hover">
						<thead>
							<tr>
								<td>歌曲</td>
								<td>歌手</td>
								<td>专辑</td>
							</tr>
						</thead>
						<tbody>
							<?php if(is_array($xiamisongs)): foreach($xiamisongs as $key=>$song): ?><tr>
									<td><?php echo ($song['song_name']); ?></td>
									<td><?php echo ($song['singers'][0]['name']); ?></td>
									<td><?php echo ($song['album_name']); ?></td>
								</tr><?php endforeach; endif; ?>
						</tbody>
					</table>
				</div>

				<div class="tab-pane fade" id="video">
					<p>Here are videos.</p>
				</div>

				<div class="tab-content fade" id="douyu">
					<embed width="600" height="360" allownetworking="all" allowscriptaccess="always" src="http://staticlive.douyutv.com/common/share/play.swf?room_id=319721" quality="high" bgcolor="#000" wmode="window" allowfullscreen="true" allowFullScreenInteractive="true" type="application/x-shockwave-flash">
					</embed>
				</div>
		</div>
	</div>

<script type="text/javascript" src="/js/jquery-2.1.4.min.js"></script>
<!--<script src="//code.jquery.com/jquery-1.10.2.js"></script>-->
<script src="/js/bootstrap.min.js"></script>
</body>
</html>

	<script type="text/javascript">
		$(document).ready(function(){

		})
	</script>