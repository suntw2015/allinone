<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.839af46f54db6ed60797847d2febbca0.2592000.1359262544.754976761-248414';
//应用目录名
$appName = '测试应用';
//应用根目录
$root_dir = '/apps' . '/' . $appName . '/';

$fileName = 'pic_list.jpg';

//文件路径
$path = $root_dir . $fileName;

$pcs = new BaiduPCS($access_token);

header('Content-Disposition:attachment;filename="' . $fileName . '"');
header('Content-Type:application/octet-stream');
$result = $pcs->download($path);
echo $result;
?>