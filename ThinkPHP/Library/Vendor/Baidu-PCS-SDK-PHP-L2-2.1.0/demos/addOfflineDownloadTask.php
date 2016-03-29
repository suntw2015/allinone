<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.839af46f54db6ed60797847d2febbca0.2592000.1359262544.754976761-248414';
//应用目录名
$appName = '测试应用';
//应用根目录
$root_dir = '/apps' . '/' . $appName . '/';

//离线下载数据在PCS中存放的路径
$savePath = $root_dir . '';
//要下载数据的URL
$sourceUrl= 'http://i5.hunantv.com/p1/20121221/0943375277.jpg';
//下载速度， byte/s
$rateLimit=50;
//下载的超时时间
$timeout=3600;
//回调URL，回调过程不处理302跳转
$callback='';

$pcs = new BaiduPCS($access_token);
$result = $pcs->addOfflineDownloadTask($savePath, $sourceUrl, $rateLimit, $timeout, $callback);
echo $result;
?>