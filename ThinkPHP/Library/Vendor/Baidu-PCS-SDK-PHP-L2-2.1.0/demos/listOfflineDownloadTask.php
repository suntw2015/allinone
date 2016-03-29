<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.839af46f54db6ed60797847d2febbca0.2592000.1359262544.754976761-248414';
//应用目录名
$appName = '测试应用';
//应用根目录
$root_dir = '/apps' . '/' . $appName . '/';

//起始位置
$start = 0;
//返回多少个
$limit = 10;
//按开始时间升序 or 降序
$asc = 0;
//目标地址URL
$sourceURL = '';
//存放路径
$savePath = '';
//STARTTIMESTMAP, ENDTIMESTAMP, 如果不限制下限可写成"NULL, 1235", 不限制上线，可写成'1234,NULL'
$createTime = '';
//任务状态过滤
$status = 1;
//是否需要返回任务信息
$needTaskInfo = 1;

$pcs = new BaiduPCS($access_token);
$result = $pcs->listOfflineDownloadTask($start, $limit, $asc, $sourceURL, $savePath, $createTime, $status, $needTaskInfo);
echo $result;
?>