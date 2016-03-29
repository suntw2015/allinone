<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Copy Xiami</title>
		<link href="/css/xiami.css" rel="stylesheet">
	</head>

	<body>
		<div class="player">
			<div class="player_top"></div>
			<div class="player_main">
				<div class="player_main_left">
					<div class="menu_out">
						<ul>
							<li><a><i class="menu_play"></i>正在播放</a></li>
							<li><a><i class="menu_history"></i>历史播放</a></li>
							<li><a><i class="menu_collect"></i>收藏的歌曲</a></li>
						</ul>
					</div>
				</div>
				<div class="player_main_middle">
					<div class="player_main_panel">
					<div class="list_header">
						<div class="list_header_body">
							<div class="list_column">歌曲</div>
							<div class="list_column">演唱者</div>
							<div class="list_column">专辑</div>
						</div>
					</div>

					<div class="list_body">
						<div class="scrollbar">
							<div class="scroll scroll-list"></div>
						</div>
						<div class="list_body_song">
							<?php if(is_array($songs)): foreach($songs as $key=>$song): ?><div class="list_detail" data-url=<?php echo ($song['url']); ?> data-albummid="<?php echo ($song['albummid']); ?>">
									<div class="list_checkbox">
										<input type="checkbox" />
									</div>
									<div class="list_index"><em>$key</em></div>
									<div class="list_detail_body">
										<div class="list_column songname"><?php echo ($song['songname']); ?></div>
										<div class="list_column singername"><?php echo ($song['singername']); ?></div>
										<div class="list_column albumname"><?php echo ($song['albumname']); ?></div>
										<div class="list_other"></div>
									</div>
									<div class="trace_control">
										<a class="trace_faved"></a>
										<a class="trace_more"></a>
										<a class="trace_delete"></a>
									</div>
								</div><?php endforeach; endif; ?>
							<!--<div class="list_detail">-->
								<!--<div class="list_checkbox">-->
									<!--<input type="checkbox" />-->
								<!--</div>-->
								<!--<div class="list_index"><em>1</em></div>-->
								<!--<div class="list_detail_body">-->
									<!--<div class="list_column">勇气</div>-->
									<!--<div class="list_column">梁静茹</div>-->
									<!--<div class="list_column">勇气</div>-->
									<!--<div class="list_other"></div>-->
								<!--</div>-->
								<!--<div class="trace_control">-->
									<!--<a class="trace_faved"></a>-->
									<!--<a class="trace_more"></a>-->
									<!--<a class="trace_delete"></a>-->
								<!--</div>-->
							<!--</div>-->

							<!--<div class="list_detail">-->
								<!--<div class="list_checkbox">-->
									<!--<input type="checkbox" />-->
								<!--</div>-->
								<!--<div class="list_index"><em>1</em></div>-->
								<!--<div class="list_detail_body">-->
									<!--<div class="list_column">勇气</div>-->
									<!--<div class="list_column">梁静茹</div>-->
									<!--<div class="list_column">勇气</div>-->
									<!--<div class="list_other"></div>-->
								<!--</div>-->
								<!--<div class="trace_control">-->
									<!--<a class="trace_faved"></a>-->
									<!--<a class="trace_more"></a>-->
									<!--<a class="trace_delete"></a>-->
								<!--</div>-->
							<!--</div>-->
						</div>
					</div>
					<div class="list_footer">
						<div class="list_checkbox">
							<input type="checkbox" />
						</div>
						<div class="list_footer_body">
							<div class="item_btn">
								<a class="icon_delete2">删除</a>
							</div>
							<div class="item_btn">
								<a class="icon_faved2">收藏</a>
							</div>
							<div class="item_btn">
								<a class="icon_add2">添加到精选集</a>
							</div>
							<div class="item_btn">
								<a class="icon_more2">更多</a>
							</div>
						</div>
					</div>
					</div>
				</div>
				<div class="player_main_right">
					<div class="album">
						<div class="album-cover">
							<a href="http://www.xiami.com/album/376041" target="_blank" title="옥탑라됴-옥상달빛"><img id="J_playerCoverImg" src="http://img.xiami.net/images/album/img75/73075/3760411270693708_2.jpg" alt="옥탑라됴-옥상달빛"></a>
						</div>
					</div>
					<div class="lyc">
						<div class="lyccontent"></div>
						<div class="scrollbar">
							<div class="scroll"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="player_bottom">
				<div class="player_control">
					<a class="pre_btn"></a>
					<a class="play_btn"></a>
					<a class="next_btn"></a>
					<a class="mode_btn"></a>
				</div>

				<div class="player_info">
					<div class="player_track">
						<div class="player_track_info">勇气-梁静茹</div>
						<div class="player_track_control">
							<a class="icon_faved" title="取消分享"></a>
							<a class="icon_share" title="分享"></a>
							<a class="icon_more" title="更多"></a>
						</div>
					</div>
					<div class="player_length">
						<div class="player_position">00:00</div>
						<div class="player_progress">
							<div class="progress_loading">
								<div class="progress_play"></div>
							</div>
						</div>
						<div class="player_duration">00:00</div>
					</div>
				</div>
				<div class="player_volume">
					<div class="keyHQ"></div>
					<div class="volumn">
						<div class="icon_volumn"></div>
						<div class="progress_volumn">
							<div class="progress_loading">
								<div class="progress_play"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<audio src="<?php echo ($audio['url']); ?>" loop="loop"></audio>

	<!--js container -->
	<script src="/js/jquery-2.1.4.min.js"></script>
	<script src="/js/xiami.js"></script>

	</body>

</html>