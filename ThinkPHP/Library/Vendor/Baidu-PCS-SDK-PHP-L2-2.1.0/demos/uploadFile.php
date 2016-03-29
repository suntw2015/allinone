<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.839af46f54db6ed60797847d2febbca0.2592000.1359262544.754976761-248414';
//应用目录名
$appName = '测试应用';
//应用根目录
$root_dir = '/apps' . '/' . $appName . '/';

//上传文件的目标保存路径，此处表示保存到应用根目录下
$targetPath = $root_dir;
//要上传的本地文件路径
$file = dirname(__FILE__) . '/' . 'yun.jpg';
//文件名称
$fileName = basename($file);
//新文件名，为空表示使用原有文件名
$newFileName = '';

$pcs = new BaiduPCS($access_token);

if (!file_exists($file)) {
	exit('文件不存在，请检查路径是否正确');
} else {
	$fileSize = filesize($file);
	$handle = fopen($file, 'rb');
	$fileContent = fread($handle, $fileSize);

	$result = $pcs->upload($fileContent, $targetPath, $fileName, $newFileName);
	fclose($handle);
	
	echo $result;
}
?>