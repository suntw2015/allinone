<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.839af46f54db6ed60797847d2febbca0.2592000.1359262544.754976761-248414';

//要查询的task_id列表，如：'1,2,3,4'
$taskIds = 2463;
//0：查任务信息，1：查进度信息
$opType = 1;

$pcs = new BaiduPCS($access_token);
$result = $pcs->queryOfflineDownloadTask($taskIds, $opType);
echo $result;
?>