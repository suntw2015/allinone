<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.839af46f54db6ed60797847d2febbca0.2592000.1359262544.754976761-248414';
//应用目录名
$appName = '测试应用';
//应用根目录
$root_dir = '/apps' . '/' . $appName . '/';

//路径
$path = $root_dir . 'Lighthouse.jpg';
//待上传文件本地路径
$localPath = dirname(__FILE__). '/' . 'Lighthouse.jpg';
//待秒传文件长度
$contentLength = filesize($localPath);

if($contentLength < 256*1024){
	exit('秒传文件必须大于256KB！');
}

//待秒传文件MD5
$contentMd5 = md5_file($localPath);

$handle = fopen($localPath, 'rb');
//待秒传文件校验段的MD5
$sliceMd5= md5(fread($handle, 256*1024));
//文件crc32
$contentCrc32 = crc32($tmpFile);

$pcs = new BaiduPCS($access_token);
$result = $pcs->cloudMatch($path, $contentLength, $contentMd5, $sliceMd5, $contentCrc32);
fclose($handle);

echo $result;
?>