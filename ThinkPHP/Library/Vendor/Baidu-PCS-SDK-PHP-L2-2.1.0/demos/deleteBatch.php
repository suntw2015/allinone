<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.839af46f54db6ed60797847d2febbca0.2592000.1359262544.754976761-248414';
//应用目录名
$appName = '测试应用';
//应用根目录
$root_dir = '/apps' . '/' . $appName . '/';

//文件路径数组
$path = array($root_dir . 'yun3.jpg', $root_dir . 'yun4.jpg');

$pcs = new BaiduPCS($access_token);
$result = $pcs->deleteBatch($path);
echo $result;
?>