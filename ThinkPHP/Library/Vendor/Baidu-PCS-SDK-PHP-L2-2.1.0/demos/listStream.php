<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.839af46f54db6ed60797847d2febbca0.2592000.1359262544.754976761-248414';

//取值为video，audio，image，doc四种
$type = 'image';
//返回条目控制起始值n1，缺省为0
$start = 0;
//返回条目控制长度n2，缺省为1000，可配置
$limit = 1000;
//需要过滤的前缀路径，如/apps/album
$filter_path = '';

$pcs = new BaiduPCS($access_token);
$result = $pcs->listStream($type, $start, $limit, $filter_path);

echo $result;
?>