<?php
/**
 * Date:        2015/6/18
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:function.php
 */

function post($url,$post_date){
    $ch=curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_date);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result=curl_exec($ch);
    curl_close($ch);
    return $result;
}

/**
 * 模拟get方法
 * @param string $url   请求地址
 * @return mixed    返回get结果
 */
function get($url,$cookie=""){

    $ch=curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch,CURLOPT_HTTPHEADER,0);
    curl_setopt($ch, CURLOPT_POST, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch,CURLOPT_COOKIE,$cookie);


    $result=curl_exec($ch);
    curl_close($ch);
    return $result;
}

function geturl($url){
    $trycount = 5;

    while($trycount--){
        $res = get($url);
        if(!empty($res)){
            return json_decode($res,true);
        }
    }

    return false;
}

function dosave($dirname,$images){
    $dirname = empty($dirname)? time() : $dirname;
    $dirname = APP_PATH."../bzpic/".$dirname;
    dump($dirname);
    if(!is_dir($dirname)){
        mkdir($dirname);
    }

    foreach($images as $key=>$value){
        echo $dirname."/".$value["id"].".jpg";exit;
        file_put_contents($dirname."/".$value["id"].".jpg", file_get_contents($value["url"]));
        dump($dirname."/".$value["id"]);
    }
}

function qcopy(&$des,$src,$copyitems){
	foreach($copyitems as $key){
		$des["$key"] = $src[$copyitems[$key]];
	}
	return $des;
}

	function encrypt($str,$algorithm=MCRYPT_RIJNDAEL_128,$mode=MCRYPT_MODE_ECB)
	{

//        print('str:'.$str."===>");
//        print('A:'.$algorithm);
//        print(",M:".$mode);

		$td = mcrypt_module_open($algorithm, '', $mode, '');
		$iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td));
		mcrypt_generic_init($td, $this->key,$iv);

		$block = mcrypt_get_block_size($algorithm, $mode);
		$pad = $block - (strlen($str) % $block);
		$str .= str_repeat(chr($pad), $pad);

		$encrypted = mcrypt_generic($td, $str);
		mcrypt_generic_deinit($td);
		mcrypt_module_close($td);

		//$encrypted = base64_encode($encrypted);
		//base_convert进行任意进制转换
		//$encrypted = bin2hex($encrypted);

		$t=bin2hex($encrypted);//bin2hex转16进制   bindec转10进制
		$t=strtoupper($t);
		return $t;
	}

    function doputTime($info){
        if(empty($info)){
            return false;
        }

        $time = (int)($info/pow(10,7));
        $time = date("Y-m-d H:i:s",$time);
        return $time;
    }

    //create the cookie of pgv_pvid
    function getUTCMilliseconds(){
        return round(rand(1,9)/10 * 2147483647) * rand(1,999) % 1E10;
    }

    function ext_json_decode_function($match){if(strpos("http",$match[0]) >= 0){return $match[0];}else{return '"'.substr($match[0],0,-1).'":';}}

    function ArrayToString($data,$usekey=0){
        $str ="";
        foreach($data as $key=>$value){
            if($usekey){
                $str.=sprintf("%s:%s,",$key,$value);
            }else{
                $str.=sprintf("%s,",$value);
            }
        }
        return substr($str,0,-1);
    }

    function getguid(){
        $timestamp = time();
        $hostname  = gethostname();
        $pid = getmypid();

    }

    /****************************************************************************************************
    //最大堆排序
     * 按照部分key对2维数组排序
     * arraysort 排序入口
     * @param array $order 排序规则 array("key1"=>"desc","key2"=>"asc")
     ****************************************************************************************************/

    function heapsort(&$arr,$order){
        $len = count($arr);
        $i = floor($len/2)-1;

        for(;$i>=0;$i--){
            build_head($arr,$len-1,$i,$order);
        }

        for($i=$len-1;$i>0;$i--){
            swap($arr,$i,0);
            build_head($arr,$i-1,0,$order);
        }
    }

    /****************************************************************************************************
     * build_head 堆排序
     ****************************************************************************************************/
    function build_head(&$arr,$maxindex,$index,$order){
        $relindex = $index+1;
        if(2*$relindex-1>$maxindex || $index > $maxindex){//leaf node or over the maxidnex
            return;
        }

        if(-1 == itemcompare($arr[$index],$arr[2*$relindex-1],$order)){//compare with left
            swap($arr,$index,2*$relindex-1);
            build_head($arr,$maxindex,2*$relindex-1,$order);
        }

        if(2*$relindex<=$maxindex && -1==itemcompare($arr[$index],$arr[2*$relindex],$order)){	//compare with right
            swap($arr,$index,2*$relindex);
            build_head($arr,$maxindex,2*$relindex,$order);
        }
    }

    /****************************************************************************************************
     * itemcompare item比较规则
     ****************************************************************************************************/
    function itemcompare($a,$b,$order){
        foreach($order as $key=>$value){
            if($value == "desc"){
                if($a[$key]<$b[$key]) {
                    return 1;
                }elseif($a[$key]>$b[$key]){
                    return -1;
                }else{
                    continue;
                }
            }elseif($value =="asc"){
                if($a[$key]<$b[$key]) {
                    return -1;
                }elseif($a[$key]>$b[$key]){
                    return 1;
                }else{
                    continue;
                }
            }
        }

        return 0;
    }

    /****************************************************************************************************
     * swap 交换值
     ****************************************************************************************************/
    function swap(&$arr,$i,$j){
        $temp = $arr[$i];
        $arr[$i] = $arr[$j];
        $arr[$j] = $temp;
    }

function timenow(){
    return date("Y-m-d H:i:s",time());
}

function charCodeAt($str, $index)
{
    $char = mb_substr($str, $index, 1, 'UTF-8');

    if (mb_check_encoding($char, 'UTF-8'))
    {
        $ret = mb_convert_encoding($char, 'UTF-32BE', 'UTF-8');
        return hexdec(bin2hex($ret));
    }
    else
    {
        return null;
    }
}