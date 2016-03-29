<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.839af46f54db6ed60797847d2febbca0.2592000.1359262544.754976761-248414';
//应用目录名
$appName = '测试应用';
//应用根目录
$root_dir = '/apps' . '/' . $appName . '/';

//图片路径
$path = $root_dir . 'yun.jpg';
//宽度
$width = 200;
//高度
$height = 200;
//质量
$quality = 10;

$pcs = new BaiduPCS($access_token);
$result = $pcs->thumbnail($path, $width, $height, $quality);
header('Content-type: image/jpeg');
echo $result;
?>