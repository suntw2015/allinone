<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="UTF-8">
	<title></title>->
	<link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">


	<style type="text/css">
		ul.nav-pills{
			width: 200px;
		}
		ul.nav-pills.affix{
			top: 30px; /* Set the top position of pinned element */
		}
		#lists ul li{
			padding: 5px;
		}
	</style>
</head>
<body>
<div class="container">
	<div class="jumbotron">
		<h1>Bootstrap Affix（data属性版）</h1>
	</div>
	<div class="row">
		<div class="col-xs-3" id="myScrollspy">
			<ul class="nav nav-pills nav-stacked" data-spy="affix" data-offset-top="125">
				<li class="active"><a href="#html">HTML</a></li>
				<li><a href="#php">PHP</a></li>
				<li><a href="#dede">织梦/DEDE</a></li>
				<li><a href="#wordpress">Wordpress</a></li>
				<li><a href="#more">更多</a></li>
			</ul>
		</div>
		<div class="col-xs-9" id="lists">
			<h2 id="html"><a href="http://9iphp.com/web/html">HTML</a></h2>
			<ul>
				<li><a href="http://9iphp.com/web/html/967.html">如何测试一个手机站点</a></li>
				<li><a href="http://9iphp.com/web/html/932.html">20款免费的 Bootstrap 后台管理模版</a></li>
				<li><a href="http://9iphp.com/web/html/925.html">比bootstrap更懂IE6的中文CSS框架–让Bootstrap支持IE6</a></li>
				<li><a href="http://9iphp.com/web/html/749.html">一种让超大banner图片不拉伸、全屏宽、居中显示的方法</a></li>
				<li><a href="http://9iphp.com/web/html/717.html">[译]WEB开发者最好用的Chrome扩展程序</a></li>
				<li><a href="http://9iphp.com/web/php/380.html">php文件上传的原理及实现</a></li>
				<li><a href="http://9iphp.com/web/javascript/371.html">HTML表单中不同单选按钮表单提交到不同页面</a></li>
			</ul>
			<hr>
			<h2 id="php"><a href="http://9iphp.com/web/php">PHP</a></h2>
			<ul>
				<li><a href="http://9iphp.com/web/php/1006.html">PHP去除换行符及PHP_EOL常量的使用</a></li>
				<li><a href="http://9iphp.com/web/php/899.html">PHP 如何阻止用户上传成人照片或者裸照</a></li>
				<li><a href="http://9iphp.com/web/php/874.html">PHP获取汉字拼音首字母的方法</a></li>
				<li><a href="http://9iphp.com/web/php/762.html">微信公众号开发之用户地理位置坐标转百度坐标(搜狗、google地图坐标转百度地图坐标)</a></li>
				<li><a href="http://9iphp.com/web/php/761.html">介绍一种PHP中数组转json编码而不转义中文字符和 \ / 的方法</a></li>
				<li><a href="http://9iphp.com/web/php/684.html">PHP根据两个地点的经纬度计算距离</a></li>
				<li><a href="http://9iphp.com/web/php/657.html">PHP判断网站访问者浏览器类型</a></li>
				<li><a href="http://9iphp.com/web/php/499.html">php合成或者创建gif动画</a></li>
			</ul>
			<hr>
			<h2 id="dede"><a href="http://9iphp.com/opensystem/dede">织梦内容管理系统/DEDE</a></h2>
			<ul>
				<li><a href="http://9iphp.com/opensystem/dede/884.html">使用DEDE织梦自带的邮件功能实现自定义表单邮件通知</a></li>
				<li><a href="http://9iphp.com/opensystem/dede/871.html">使用DEDE织梦自带的邮件功能发送邮件</a></li>
				<li><a href="http://9iphp.com/opensystem/dede/820.html">DEDE图集上传图片显示不清楚的解决办法</a></li>
				<li><a href="http://9iphp.com/opensystem/dede/803.html">DEDE图集中的3种图片表现方式</a></li>
				<li><a href="http://9iphp.com/opensystem/dede/785.html">[转]dede首页,列表页,内容页调用某篇文章的内容</a></li>
				<li><a href="http://9iphp.com/opensystem/dede/773.html">给DEDE的栏目增加栏目图片后怎么在当前栏目样式中调用</a></li>
				<li><a href="http://9iphp.com/opensystem/dede/765.html">织梦图片集上传图片不能上传 弹出提示“302”的解决办法</a></li>
				<li><a href="http://9iphp.com/opensystem/dede/756.html">织梦系统DedeCMS网站通过数据库备份、还原实现网站整站搬家移植</a></li>
			</ul>
			<hr>
			<h2 id="wordpress"><a href="http://9iphp.com/opensystem/wordpress">Wordpress</a></h2>
			<ul>
				<li><a href="http://9iphp.com/opensystem/wordpress/1020.html">制作一个按标签首字母分类的WordPress标签页(升级版)</a></li>
				<li><a href="http://9iphp.com/opensystem/wordpress/991.html">comment_form()函数实现willin的评论表情插入</a></li>
				<li><a href="http://9iphp.com/opensystem/wordpress/990.html">终于找到一款目前比较适合的防垃圾评论插件–WP Anti Spam</a></li>
				<li><a href="http://9iphp.com/opensystem/wordpress/987.html">自制WordPress主题9IPHP终于加上了AJAX评论</a></li>
				<li><a href="http://9iphp.com/opensystem/wordpress/986.html">WordPress上一篇下一篇文章链接增加 Title 属性（支持只显示当前分类）</a></li>
				<li><a href="http://9iphp.com/opensystem/wordpress/858.html">如何修改多说评论的背景</a></li>
				<li><a href="http://9iphp.com/opensystem/wordpress/846.html">WordPress获取最近某段时间内评论最多的热点文章</a></li>
				<li><a href="http://9iphp.com/opensystem/wordpress/828.html">自制WordPress响应式主题-9IPHP 上线了~~</a></li>
				<li><a href="http://9iphp.com/opensystem/wordpress/769.html">[转]wordpress非插件为后台文章增加自定义字段</a></li>
				<li><a href="http://9iphp.com/opensystem/wordpress/706.html">非插件实现WordPress博客侧边栏广告跟随固定浮动效果的方法</a></li>
			</ul>
			<hr>
			<h2 id="more"><a href="http://9iphp.com/archives">更多</a></h2>
			<ul>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
				<li><a href="http://9iphp.com/archives">更多</a></li>
			</ul>
		</div>
	</div>
</div>
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>

<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</body>
</html>