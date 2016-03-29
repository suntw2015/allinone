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
//注意：此处使用本地文件来模拟客户端将文件进行分片，
//PHP本身是直接操作客户端文件的，需要借助Flash等具有客户端文件操作权限的插件来完成。
$file = dirname(__FILE__) . '/' . 'yun.jpg';
//文件名称
$fileName = basename($file);
//新文件名，为空表示使用原有文件名
$newFileName = '';

$pcs = new BaiduPCS($access_token);

if (!file_exists($file)) {
	exit('文件不存在，请检查路径是否正确');
}  else {
	$fileSize = filesize($file);
	$handle = fopen($file, 'rb');
	//分片上传文件成功后返回的md5值数组集合
	$filesBlock = array();
	//设置分片上传文件块大小为20K
	$blockSize = 20480;

	if ($fileSize < $blockSize) {
		exit('请选择体积大于20480个字节的文件');
	}

	$isCreateSuperFile = TRUE;

	while (!feof($handle)) {
		$temp = $pcs->upload(fread($handle, $blockSize), $targetPath, $fileName, $newFileName, $isCreateSuperFile);
		if (!is_array($temp)) {
			$temp = json_decode($temp, true);
		}
		array_push($filesBlock, $temp);
	}

	fclose($handle);

	if (count($filesBlock) > 1) {
		$params = array();
		foreach ($filesBlock as $value) {
			array_push($params, $value['md5']);
		}
		$result = $pcs->createSuperFile($targetPath, $fileName, $params, $newFileName);
		echo $result;
	}
}
?>